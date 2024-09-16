import { PublicJob } from '@api/job/classes/PublicJob';
import { CreateJobDto } from '@api/job/dtos/CreateJob.dto';
import { UpdateJobDto } from '@api/job/dtos/UpdateJob.dto';
import { FindPaginateResponse, JobEntity, JobRepository } from '@app/database';
import { QueryOrder } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class JobService {
  // eslint-disable-next-line
  constructor(private readonly jobRepository: JobRepository) {}

  /**
   * Creates a new job.
   * @param dto - The data transfer object containing the job details.
   * @returns A promise that resolves to the created job.
   */
  public async createJob(dto: CreateJobDto): Promise<JobEntity> {
    return await this.jobRepository.save({
      ...dto,
      group: this.jobRepository.getReference(dto.groupId),
    });
  }

  /**
   * Gets a paginated list of public jobs.
   * @param limit - The maximum number of items to return.
   * @param page - The page to return.
   * @returns A promise that resolves to a paginated list of public jobs.
   */
  public async getPublicJobsPaginated(
    limit: number,
    page: number,
  ): Promise<FindPaginateResponse<PublicJob>> {
    const res = await this.jobRepository.findAllPaginated({
      limit,
      page,
      populate: ['group'],
      orderBy: { name: QueryOrder.ASC }, // Order by name alphabetically
    });

    // Sort the results by group.name alphabetically
    res.items.sort((a, b) => a.group.name.localeCompare(b.group.name));

    return {
      items: res.items.map(job => new PublicJob(job)),
      meta: res.meta,
    };
  }

  /**
   * Gets a paginated list of jobs.
   * @param limit - The maximum number of items to return.
   * @param page - The page to return.
   * @returns A promise that resolves to a paginated list of jobs.
   */
  public async getJobsPaginated(
    limit: number,
    page: number,
  ): Promise<FindPaginateResponse<JobEntity>> {
    const res = await this.jobRepository.findAllPaginated({
      limit,
      page,
      populate: ['group'],
      orderBy: { name: QueryOrder.ASC }, // Order by name alphabetically
    });

    // Sort the results by group.name alphabetically
    res.items.sort((a, b) => a.group.name.localeCompare(b.group.name));

    return res;
  }

  /**
   * Retrieves a public job by its ID.
   * @param id - The ID of the job.
   * @returns A Promise that resolves to a PublicJob object.
   */
  public async getPublicJobById(id: string): Promise<PublicJob> {
    const job = await this.jobRepository.findOne(id);
    if (!job) throw new NotFoundException('Job not found');
    return new PublicJob(job);
  }

  /**
   * Retrieves a job by its ID.
   * @param id - The ID of the job.
   * @returns A promise that resolves to the JobEntity with the specified ID.
   */
  public async getJobById(id: string): Promise<JobEntity> {
    const job = await this.jobRepository.findOne(id);
    if (!job) throw new NotFoundException('job not found');
    return job;
  }

  /**
   * Updates a job group.
   * @param dto - The DTO containing the updated job group data.
   * @returns A promise that resolves to the updated JobEntity.
   */
  public async updateJob(dto: UpdateJobDto): Promise<JobEntity> {
    const group = await this.jobRepository.findOne(dto.id);
    if (!group) throw new NotFoundException('Group not found');

    return await this.jobRepository.update(
      group,
      instanceToPlain(dto, { exposeUnsetFields: false }),
    );
  }

  /**
   * Deletes a job by its ID.
   * @param id The ID of the job to delete.
   * @returns A Promise that resolves when the job is deleted.
   */
  public async deleteJob(id: string): Promise<void> {
    return this.jobRepository.delete(id);
  }
}
