import { DynamodbService } from '@api/dynamodb/dynamodb.service';
import {
  JOBPOST_PROCESS_RETRY_LOCKER,
  regionToCurrencyMap,
} from '@api/jobPost/constants/jobPost.constants';
import { CreateJobPostDto } from '@api/jobPost/dtos/CreateJobPost.dto';
import { UpdateJobPostDto } from '@api/jobPost/dtos/UpdateJobPost.dto';
import {
  ContractType,
  Currency,
  ExperienceLevel,
  FindPaginateResponse,
  IndustryRepository,
  JobPostEntity,
  JobPostRepository,
  JobRepository,
  RegionEntity,
  RegionRepository,
} from '@app/database';
import { CompanyRepository } from '@app/database/repositories/Company.repository';
import { RecruiterFirmRepository } from '@app/database/repositories/RecruiterFirm.repository';
import { LoggerService } from '@app/logger';
import { RedisService } from '@app/redis';
import { TIME_1_HOUR_MLS, ValidationException } from '@app/shared';
import {
  CreateRequestContext,
  EntityManager,
  MikroORM,
  QueryOrder,
} from '@mikro-orm/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
@Injectable()
export class JobPostService {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(
    private readonly jobPostRepository: JobPostRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly recruiterFirmRepository: RecruiterFirmRepository,
    private readonly locationRepository: RegionRepository,
    private readonly jobRepository: JobRepository,
    private readonly industryRepository: IndustryRepository,
    private readonly redis: RedisService,
    private readonly dynamodbService: DynamodbService,
    private readonly em: EntityManager,
    private readonly orm: MikroORM,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Synchronize job posts between DynamoDB and PostgreSQL
   * @returns The total count of job posts
   */
  @CreateRequestContext()
  async synchronizeJobPosts(): Promise<number> {
    const em = this.orm.em.fork();
    const tableName = 'job_data';
    const limit = 50;
    let lastEvaluatedKey: Record<string, any> | undefined;
    const allDynamoUrls = new Set<string>();
    const errors: any[] = [];

    const regions = await this.locationRepository.findAll();
    const regionDict = regions.reduce(
      (dict, region) => {
        dict[region.id] = region;
        return dict;
      },
      {} as Record<string, RegionEntity>,
    );

    do {
      try {
        const { dynamoItems, newLastEvaluatedKey } = await this.fetchDynamoItems(
          tableName,
          limit,
          lastEvaluatedKey,
        );
        lastEvaluatedKey = newLastEvaluatedKey;

        await this.processDynamoItems(dynamoItems, em, allDynamoUrls, regionDict, errors);
      } catch (error) {
        this.logger.error('Error fetching Dynamo items:', error.message, error.stack);
      }
    } while (lastEvaluatedKey);

    try {
      await this.deleteOldJobPosts(em, allDynamoUrls);
    } catch (error) {
      this.logger.error('Error deleting old job posts:', error.message, error.stack);
    }

    if (errors.length > 0) {
      this.logger.warn(`Encountered ${errors.length} errors during synchronization`);
    }

    this.logger.log('Job posts synchronized successfully');
    return this.countTotalJobPosts();
  }

  /**
   * Count the total number of items in the JobPost table
   * @returns The total count of job posts
   */
  public async countTotalJobPosts(): Promise<number> {
    return this.jobPostRepository.count();
  }

  /**
   * Fetch items from DynamoDB
   * @param tableName - The DynamoDB table name
   * @param limit - The number of items to fetch
   * @param lastEvaluatedKey - The last evaluated key for pagination
   * @returns The fetched items and the new last evaluated key
   */
  private async fetchDynamoItems(
    tableName: string,
    limit: number,
    lastEvaluatedKey?: Record<string, any>,
  ): Promise<{ dynamoItems: any[]; newLastEvaluatedKey?: Record<string, any> }> {
    const { items: dynamoItems, lastEvaluatedKey: newLastEvaluatedKey } =
      await this.dynamodbService.scanItems(tableName, limit, lastEvaluatedKey);

    // Log fetched items for debugging
    // console.log('Fetched DynamoDB items:', dynamoItems);
    return { dynamoItems, newLastEvaluatedKey };
  }
  /**
   * Process DynamoDB items
   * @param dynamoItems - The items to process
   * @param em - The entity manager
   * @param allDynamoUrls - A set of all DynamoDB URLs
   * @param regionDict - The dictionary of regions
   * @param errors - errors occuring during process
   */
  private async processDynamoItems(
    dynamoItems: any[],
    em: EntityManager,
    allDynamoUrls: Set<string>,
    regionDict: Record<string, RegionEntity>,
    errors: any[],
  ) {
    const existingJobPosts = await em.find(JobPostEntity, { dynamoUrl: { $ne: null } });

    for (const dynamoItem of dynamoItems) {
      try {
        const jobPostDto = plainToClass(
          CreateJobPostDto,
          await this.transformDynamoItemToJobPostDto(dynamoItem, regionDict),
        );

        const validationErrors = await validate(jobPostDto);
        if (validationErrors.length > 0) {
          this.logger.warn('Validation failed for DTO:', validationErrors);
          errors.push(validationErrors);
          continue;
        }

        const existingJobPost = existingJobPosts.find(
          post => post.dynamoUrl === jobPostDto.dynamoUrl,
        );

        if (existingJobPost) {
          const updateJobPostDto = this.createToUpdateJobPostDto(
            jobPostDto,
            existingJobPost.id,
          );
          await this.updateJobPost(updateJobPostDto);
        } else {
          await this.createJobPost(jobPostDto);
        }

        allDynamoUrls.add(dynamoItem.url?.S || '');
      } catch (error) {
        this.logger.error(
          `Error processing item with URL: ${dynamoItem.url?.S}`,
          error.message,
          error.stack,
        );
        errors.push(error);
      }
    }
  }

  /**
   * Delete job posts that no longer exist in DynamoDB
   * @param em - The entity manager
   * @param allDynamoUrls - A set of all DynamoDB URLs
   */
  private async deleteOldJobPosts(em: EntityManager, allDynamoUrls: Set<string>) {
    const existingJobPosts = await em.find(JobPostEntity, { dynamoUrl: { $ne: null } });

    // console.log('Existing job posts in PostgreSQL:', existingJobPosts.map(post => post.dynamoUrl));

    // console.log('All DynamoDB URLs:', Array.from(allDynamoUrls));

    for (const existingJobPost of existingJobPosts) {
      // console.log(`Checking JobPost with URL: ${existingJobPost.dynamoUrl}`);
      if (existingJobPost.dynamoUrl && !allDynamoUrls.has(existingJobPost.dynamoUrl)) {
        // console.log(`Deleting JobPost with ID: ${existingJobPost.id}`);
        await em.nativeDelete(JobPostEntity, { id: existingJobPost.id });
      } else {
        // console.log(`JobPost with ID: ${existingJobPost.id} exists in DynamoDB`);
      }
    }
  }

  /**
   * Transform a DynamoDB item to a CreateJobPostDto
   * @param dynamoItem - The DynamoDB item
   * @param regionDict - The dictionary of regions
   * @returns The transformed CreateJobPostDto
   */
  private async transformDynamoItemToJobPostDto(
    dynamoItem: any,
    regionDict: Record<string, RegionEntity>,
  ): Promise<CreateJobPostDto> {
    const company = dynamoItem.company_id;
    const recruiterFirm = dynamoItem.recruiterFirmId;

    const role = dynamoItem.role_ids?.L
      ? await this.jobRepository.find({
          id: { $in: dynamoItem.role_ids.L.map((item: { S: any }) => item.S) },
        })
      : null;

    const industry = dynamoItem.industry_ids?.L
      ? await this.industryRepository.find({
          id: { $in: dynamoItem.industry_ids.L.map((item: { S: any }) => item.S) },
        })
      : null;

    const regionIds = dynamoItem.region_ids?.L.map((item: { S: string }) => item.S);
    const jobRegions = regionIds
      ? regionIds
          .map((regionId: string) => regionDict[regionId])
          .filter((region: string) => !!region)
      : [];
    const experienceLevels = dynamoItem.experience_levels?.L
      ? dynamoItem.experience_levels.L.map(
          (item: { S: ExperienceLevel }) => item.S as ExperienceLevel,
        )
      : [];

    // Determine the currency based on the region
    let currency: Currency | undefined;
    if (jobRegions.length > 0) {
      const regionName = jobRegions[0]?.name;
      currency = regionToCurrencyMap[regionName] as Currency;
    } else {
      currency = dynamoItem.currency?.S as Currency;
    }
    // Check if the currency is valid
    if (!currency || !Object.values(Currency).includes(currency)) {
      this.logger.error(
        `Invalid or missing currency for job post with URL: ${dynamoItem.url?.S}`,
      );
      throw new ValidationException('Invalid or missing currency value');
    }

    const minSalary = dynamoItem.min_salary
      ? parseInt(dynamoItem.min_salary.S || dynamoItem.min_salary.N, 10)
      : undefined;
    const maxSalary = dynamoItem.max_salary
      ? parseInt(dynamoItem.max_salary.S || dynamoItem.max_salary.N, 10)
      : undefined;

    if (minSalary !== undefined && isNaN(minSalary)) {
      throw new ValidationException('Invalid min salary value');
    }
    if (maxSalary !== undefined && isNaN(maxSalary)) {
      throw new ValidationException('Invalid max salary value');
    }

    return {
      companyId: dynamoItem.company_id?.S,
      recruiterFirmId: dynamoItem.recruiterFirmId?.S,
      title: dynamoItem.title?.S,
      url: dynamoItem.url?.S,
      dynamoUrl: dynamoItem.url?.S,
      contractType:
        (dynamoItem.contractType?.S as ContractType) || ContractType.PERMANENT,
      experienceLevel: experienceLevels[0],
      roleFocus: dynamoItem.role_focus?.S,
      location: dynamoItem.location?.S,
      dateRange: dynamoItem.start_date?.S,
      currency: currency,
      minSalary: minSalary,
      maxSalary: maxSalary,
      companyOneLineOverview: dynamoItem.companyOneLineOverview?.S,
      workEnvironment: dynamoItem.work_environment?.S,
      serviceSpecialisms: dynamoItem.serviceSpecialisms?.SS || [],
      sectorSpecialisms: dynamoItem.sectorSpecialisms?.SS || [],
      nbOfEmployees: dynamoItem.nbOfEmployees?.S,
      whatYouBring: dynamoItem.what_you_bring?.S,
      tasks: dynamoItem.tasks?.S,
      benefits: dynamoItem.benefits?.S,
      trainingDevelopment: dynamoItem.trainingDevelopment?.S,
      interviewProcess: dynamoItem.interview_process?.S,
      visaSponsorchip: dynamoItem.visa_sponsorship?.S,
      securityClearance: dynamoItem.security_clearance?.S,
      companyOverview: dynamoItem.companyOverview?.S,
      cultureValues: dynamoItem.cultureValues?.S,
      environmentSustainability: dynamoItem.environment_sustainability?.S,
      inclusionDiversity: dynamoItem.inclusionDiversity?.S,
      recruiterOverview: dynamoItem.recruiterOverview?.S,
      expirationDays: dynamoItem.expiration_days?.N
        ? parseInt(dynamoItem.expiration_days.N, 10)
        : undefined,
      recruiterSocialMedia: dynamoItem.recruiterSocialMedia
        ? JSON.parse(dynamoItem.recruiterSocialMedia.S)
        : undefined,
      recruiterFirmSocialMedia: dynamoItem.recruiterFirmSocialMedia
        ? JSON.parse(dynamoItem.recruiterFirmSocialMedia.S)
        : undefined,
      roleIds: dynamoItem.role_ids?.L.map((item: { S: any }) => item.S),
      companySize: dynamoItem.companySize?.SS,
      industryIds: dynamoItem.industry_ids.L.map((item: { S: any }) => item.S),
      regionIds: dynamoItem.region_ids?.L.map((item: { S: any }) => item.S),
      company,
      recruiterFirm,
      role,
      industry,
      region: jobRegions,
    };
  }

  /**
   * Create a new job post
   * @param dto - Data Transfer Object for creating a job post
   * @returns The created job post entity
   */
  public async createJobPost(dto: CreateJobPostDto): Promise<JobPostEntity> {
    this._checkOwnership(dto);
    return this.jobPostRepository.save({
      ...dto,
      company: dto.companyId ? this.companyRepository.getReference(dto.companyId) : null,
      recruiterFirm: dto.recruiterFirmId
        ? this.recruiterFirmRepository.getReference(dto.recruiterFirmId)
        : null,
      region: this.locationRepository.getReferences(dto.regionIds),
      role: this.jobRepository.getReferences(dto.roleIds),
      industry: this.industryRepository.getReferences(dto.industryIds),
    });
  }

  /**
   * Get all job posts paginated
   * @param limit - The number of items per page
   * @param page - The page number
   * @returns A paginated response of job post entities
   */
  public async getAllPaginated(
    limit: number,
    page: number,
  ): Promise<FindPaginateResponse<JobPostEntity>> {
    return this.jobPostRepository.findAllPaginated({
      limit,
      page,
      orderBy: { title: QueryOrder.ASC },
    });
  }

  /**
   * Get a job post by its ID
   * @param id - The ID of the job post
   * @returns The job post entity
   */
  public async getById(id: string): Promise<JobPostEntity> {
    return this.jobPostRepository.findOneOrFail(id);
  }

  /**
   * Update an existing job post
   * @param dto - Data Transfer Object for updating a job post
   * @returns The updated job post entity
   */
  public async updateJobPost(dto: UpdateJobPostDto): Promise<JobPostEntity> {
    this._checkOwnership(dto, true);
    return this.jobPostRepository.update({ id: dto.id }, dto);
  }

  /**
   * Delete a job post by its ID
   * @param id - The ID of the job post
   * @returns A promise indicating the completion of the deletion
   */
  public deleteJobPost(id: string): Promise<void> {
    return this.jobPostRepository.delete(id);
  }

  /**
   * Check the ownership of a job post DTO
   * @param dto - The job post DTO
   * @param isForUpdate - Flag indicating if the check is for an update operation
   * @returns A boolean indicating the ownership validity
   */
  private _checkOwnership(dto: CreateJobPostDto, isForUpdate = false): boolean {
    if (dto?.companyId && dto?.recruiterFirmId) {
      throw new BadRequestException('Cannot have both company and recruiterFirm');
    }
    if (isForUpdate || dto.companyId || dto.recruiterFirmId) return true;
    else throw new BadRequestException('Must have either company or recruiterFirm');
  }

  /**
   * Convert a CreateJobPostDto to an UpdateJobPostDto
   * @param createDto - The CreateJobPostDto
   * @param id - The ID of the job post to be updated
   * @returns The UpdateJobPostDto
   */
  private createToUpdateJobPostDto(
    createDto: CreateJobPostDto,
    id: string,
  ): UpdateJobPostDto {
    return {
      id,
      companyId: createDto.companyId,
      recruiterFirmId: createDto.recruiterFirmId,
      title: createDto.title,
      url: createDto.url,
      contractType: createDto.contractType,
      experienceLevel: createDto.experienceLevel,
      roleFocus: createDto.roleFocus,
      location: createDto.location,
      dateRange: createDto.dateRange,
      currency: createDto.currency,
      minSalary: createDto.minSalary,
      maxSalary: createDto.maxSalary,
      companyOneLineOverview: createDto.companyOneLineOverview,
      workEnvironment: createDto.workEnvironment,
      serviceSpecialisms: createDto.serviceSpecialisms,
      sectorSpecialisms: createDto.sectorSpecialisms,
      nbOfEmployees: createDto.nbOfEmployees,
      whatYouBring: createDto.whatYouBring,
      tasks: createDto.tasks,
      benefits: createDto.benefits,
      trainingDevelopment: createDto.trainingDevelopment,
      interviewProcess: createDto.interviewProcess,
      visaSponsorchip: createDto.visaSponsorchip,
      securityClearance: createDto.securityClearance,
      companyOverview: createDto.companyOverview,
      cultureValues: createDto.cultureValues,
      environmentSustainability: createDto.environmentSustainability,
      inclusionDiversity: createDto.inclusionDiversity,
      recruiterOverview: createDto.recruiterOverview,
      recruiterSocialMedia: createDto.recruiterSocialMedia,
      recruiterFirmSocialMedia: createDto.recruiterFirmSocialMedia,
      dynamoUrl: createDto.dynamoUrl,
      roleIds: createDto.roleIds,
      industryIds: createDto.industryIds,
      regionIds: createDto.regionIds,
      company: this.companyRepository.getReference(createDto.companyId),
      recruiterFirm: createDto.recruiterFirm,
      expirationDays: createDto.expirationDays,
      role: this.jobRepository.getReferences(createDto.roleIds),
      industry: this.industryRepository.getReferences(createDto.industryIds),
      region: this.locationRepository.getReferences(createDto.regionIds),
    };
  }

  /**
   * Delete job posts that have expired
   */
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  @CreateRequestContext()
  private async _deleteExpiredJobPosts(): Promise<void> {
    const isLocked = await this.redis.lock(JOBPOST_PROCESS_RETRY_LOCKER, TIME_1_HOUR_MLS);
    if (!isLocked) return;

    const currentDate = new Date();

    const jobPosts = await this.jobPostRepository.findAll();

    const expiredJobPostIds = jobPosts
      .filter(jobPost => {
        const expirationDate = new Date(jobPost.createdAt);
        expirationDate.setDate(expirationDate.getDate() + jobPost.expirationDays!);

        return expirationDate <= currentDate;
      })
      .map(jobPost => jobPost.id);

    if (expiredJobPostIds.length > 0) {
      await this.jobPostRepository.nativeDelete({ id: { $in: expiredJobPostIds } });
    }

    await this.redis.unlock(JOBPOST_PROCESS_RETRY_LOCKER);
  }

  /**
   * Substract months to a date.
   * @param date - The date to add months to.
   * @param months - The number of months to add.
   * @returns The new date.
   */
  private _substractMonth(date: Date, months: number): Date {
    return new Date(date.setMonth(date.getMonth() - months));
  }

  /**
   * Check if the minSalary doesnt exceed the maxSalary
   * @param minSalary - The minimum salary
   * @param maxSalary - The maximum salary
   * @returns a boolean
   */
  private _checkSalary(minSalary: number, maxSalary?: number) {
    if (maxSalary) {
      if (minSalary < maxSalary) return true;
      return false;
    }
    return true;
  }
}
