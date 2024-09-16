import { PublicJobGroup } from '@api/jobGroup/classes/PublicJobGroup';
import { CreateJobGroupDto } from '@api/jobGroup/dtos/CreateJobGroup.dto';
import { UpdateJobGroupDto } from '@api/jobGroup/dtos/UpdateJobGroup.dto';
import { FindPaginateResponse, JobGroupEntity, JobGroupRepository } from '@app/database';
import { QueryOrder } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class JobGroupService {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(private readonly jobGroupRepository: JobGroupRepository) {}

  /**
   * Creates a new job group.
   * @param dto - The data transfer object containing the job group details.
   * @returns A promise that resolves to the created job group.
   */
  public async createJobGroup(dto: CreateJobGroupDto): Promise<JobGroupEntity> {
    return await this.jobGroupRepository.save(dto);
  }

  /**
   * Retrieves a paginated list of public job groups.
   * @param limit - The maximum number of items to retrieve per page.
   * @param page - The page number to retrieve.
   * @returns A promise that resolves to a `FindPaginateResponse` containing the paginated list of `PublicJobGroup` items.
   */
  public async getPublicJobGroupsPaginated(
    limit: number,
    page: number,
  ): Promise<FindPaginateResponse<PublicJobGroup>> {
    const res = await this.jobGroupRepository.findAllPaginated({
      limit,
      page,
      populate: ['jobs'],
      orderBy: { name: QueryOrder.ASC },
    });

    return {
      items: res.items.map(group => new PublicJobGroup(group)),
      meta: res.meta,
    };
  }

  /**
   * Retrieves job groups in a paginated manner.
   * @param limit The maximum number of job groups to retrieve per page. Default is 10.
   * @param page The page number of job groups to retrieve. Default is 0.
   * @returns A promise that resolves to a paginated response containing job groups.
   */
  public async getJobGroupsPaginated(
    limit: number,
    page: number,
  ): Promise<FindPaginateResponse<JobGroupEntity>> {
    return await this.jobGroupRepository.findAllPaginated({
      limit,
      page,
      populate: ['jobs'],
      orderBy: { name: QueryOrder.ASC },
    });
  }

  /**
   * Retrieves a public job group by its ID.
   * @param id - The ID of the job group.
   * @returns A promise that resolves to a PublicJobGroup object.
   * @throws NotFoundException if the job group is not found.
   */
  public async getPublicJobGroupById(id: string): Promise<PublicJobGroup> {
    const group = await this.jobGroupRepository.findOne(id, { populate: ['jobs'] });
    if (!group) throw new NotFoundException('Group not found');
    return new PublicJobGroup(group);
  }

  /**
   * Retrieves a job group by its ID.
   * @param id - The ID of the job group.
   * @returns A promise that resolves to the JobGroupEntity if found.
   * @throws NotFoundException if the job group is not found.
   */
  public async getJobGroupById(id: string): Promise<JobGroupEntity> {
    const group = await this.jobGroupRepository.findOne(id, { populate: ['jobs'] });
    if (!group) throw new NotFoundException('Group not found');
    return group;
  }

  /**
   * Updates a job group.
   * @param dto - The DTO containing the updated job group data.
   * @returns A promise that resolves to the updated JobGroupEntity.
   */
  public async updateJobGroup(dto: UpdateJobGroupDto): Promise<JobGroupEntity> {
    try {
      const group = await this.jobGroupRepository.findOneOrFail(dto.id);
      return await this.jobGroupRepository.update(
        group,
        instanceToPlain(dto, { exposeUnsetFields: false }),
      );
    } catch (error) {
      throw new NotFoundException('Group not found');
    }
  }

  /**
   * Deletes a job group by its ID.
   * @param id The ID of the job group to delete.
   * @returns A Promise that resolves when the job group is deleted.
   */
  public async deleteJobGroup(id: string): Promise<void> {
    return await this.jobGroupRepository.delete(id);
  }
}
