import { PublicJob } from '@api/job/classes/PublicJob';
import { CreateJobDto } from '@api/job/dtos/CreateJob.dto';
import { UpdateJobDto } from '@api/job/dtos/UpdateJob.dto';
import { JobService } from '@api/job/job.service';
import { Admin, Public } from '@app/authentication';
import { FindPaginateResponse, JobEntity } from '@app/database';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('job')
@ApiTags('Job')
export class JobController {
  // eslint-disable-next-line
  constructor(private readonly jobService: JobService) {}

  /**
   * Creates a new job.
   * @param dto The data transfer object containing the job details.
   * @returns A promise that resolves to the created job.
   */
  @Post()
  @Admin()
  async createJob(@Body() dto: CreateJobDto): Promise<JobEntity> {
    return await this.jobService.createJob(dto);
  }

  /**
   * Gets a paginated list of public jobs.
   * @param limit The maximum number of items to return.
   * @param page The page to return.
   * @returns A promise that resolves to a paginated list of public jobs.
   */
  @Get('public/many')
  @Public()
  async getPublicJobsPaginated(
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
    @Query('page', new DefaultValuePipe(0)) page?: number,
  ): Promise<FindPaginateResponse<PublicJob>> {
    return await this.jobService.getPublicJobsPaginated(limit, page);
  }

  /**
   * Retrieves a paginated list of jobs.
   * @param limit - The maximum number of jobs to retrieve per page. Default is 10.
   * @param page - The page number to retrieve. Default is 0.
   * @returns A promise that resolves to a paginated response containing the jobs.
   */
  @Get('many')
  @Admin()
  async getJobsPaginated(
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
    @Query('page', new DefaultValuePipe(0)) page?: number,
  ): Promise<FindPaginateResponse<JobEntity>> {
    return await this.jobService.getJobsPaginated(limit, page);
  }

  /**
   * Retrieves a public job by its ID.
   * @param id The ID of the job.
   * @returns A Promise that resolves to a PublicJob object.
   */
  @Get('public')
  @Public()
  async getPublicJobsById(@Query('id', ParseUUIDPipe) id: string): Promise<PublicJob> {
    return await this.jobService.getPublicJobById(id);
  }

  /**
   * Retrieves a job by its ID.
   * @param id The ID of the job.
   * @returns A promise that resolves to the JobEntity.
   */
  @Get()
  @Admin()
  async getJobByID(@Query('id', ParseUUIDPipe) id: string): Promise<JobEntity> {
    return await this.jobService.getJobById(id);
  }

  /**
   * Updates a job.
   * @param dto - The DTO containing the updated job data.
   * @returns A Promise that resolves to the updated JobEntity.
   */
  @Put()
  @Admin()
  async updateJob(@Body() dto: UpdateJobDto): Promise<JobEntity> {
    return await this.jobService.updateJob(dto);
  }

  /**
   * Deletes a job by its ID.
   * @param id - The ID of the job to delete.
   * @returns A Promise that resolves to void.
   */
  @Delete()
  @Admin()
  async deleteJob(@Query('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.jobService.deleteJob(id);
  }
}
