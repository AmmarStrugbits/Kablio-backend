import { PublicIndustryGroup } from '@api/industryGroup/classes/PublicIndustryGroup';
import { CreateIndustryGroupDto } from '@api/industryGroup/dtos/CreateIndustryGroup.dto';
import { UpdateIndustryGroupDto } from '@api/industryGroup/dtos/UpdateIndustryGroup.dto';
import {
  FindPaginateResponse,
  IndustryGroupEntity,
  IndustryGroupRepository,
} from '@app/database';
import { QueryOrder } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class IndustryGroupService {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(private readonly groupRepository: IndustryGroupRepository) {}

  /**
   * Creates a new industry group.
   * @param dto - Data Transfer Object containing the details of the industry group to be created.
   * @returns - The created industry group entity.
   */
  public async createIndustryGroup(
    dto: CreateIndustryGroupDto,
  ): Promise<IndustryGroupEntity> {
    return await this.groupRepository.save(dto);
  }

  /**
   * Retrieves paginated industry groups.
   * @param limit - The number of industry groups to retrieve per page.
   * @param page - The page number to retrieve.
   * @returns - The paginated response of public industry groups.
   */
  public async getPublicPaginatedIndustryGroups(
    limit: number,
    page: number,
  ): Promise<FindPaginateResponse<PublicIndustryGroup>> {
    const res = await this.groupRepository.findAllPaginated({
      limit,
      page,
      populate: ['industries'],
      orderBy: { name: QueryOrder.ASC },
    });
    return {
      items: res.items.map(group => new PublicIndustryGroup(group)),
      meta: res.meta,
    };
  }

  /**
   * Retrieves paginated industry groups.
   * @param limit - The number of industry groups to retrieve per page.
   * @param page - The page number to retrieve.
   * @returns - The paginated response of industry groups.
   */
  public async getPaginatedIndustryGroups(
    limit: number,
    page: number,
  ): Promise<FindPaginateResponse<IndustryGroupEntity>> {
    const res = await this.groupRepository.findAllPaginated({
      limit,
      page,
      populate: ['industries'],
      orderBy: { name: QueryOrder.ASC },
    });
    return {
      items: res.items,
      meta: res.meta,
    };
  }

  /**
   * Retrieves an public industry group by ID.
   * @param id - The ID of the industry group to be retrieved.
   * @returns - The retrieved public industry group entity.
   */
  public async getPublicIndustryGroupById(id: string): Promise<PublicIndustryGroup> {
    const group = await this.groupRepository.findOne(id, { populate: ['industries'] });
    if (!group) {
      throw new NotFoundException('Industry group not found');
    }
    await this.groupRepository.populate(group, ['industries']);
    return new PublicIndustryGroup(group);
  }

  /**
   * Retrieves an industry group by ID.
   * @param id - The ID of the industry group to be retrieved.
   * @returns - The retrieved industry group entity.
   */
  public async getIndustryGroupById(id: string): Promise<IndustryGroupEntity> {
    const group = await this.groupRepository.findOne(id, { populate: ['industries'] });
    if (!group) {
      throw new NotFoundException('Industry group not found');
    }
    return group;
  }

  /**
   * Updates an existing industry group.
   * @param dto - Data Transfer Object containing the updated details of the industry group.
   * @returns - The updated industry group entity.
   */
  public async updateIndustryGroup(
    dto: UpdateIndustryGroupDto,
  ): Promise<IndustryGroupEntity> {
    try {
      const group = await this.groupRepository.findOneOrFail(dto.id);
      return await this.groupRepository.update(
        group,
        instanceToPlain(dto, { exposeUnsetFields: false }),
      );
    } catch (error) {
      throw new NotFoundException('Group not found');
    }
  }

  /**
   * Deletes an existing industry group.
   * @param id - The ID of the industry group to be deleted.
   * @returns - A message indicating the result of the deletion operation.
   */
  public async deleteIndustryGroup(id: string): Promise<void> {
    await this.groupRepository.delete(id);
  }
}
