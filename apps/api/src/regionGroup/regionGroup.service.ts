import { PublicRegionGroup } from '@api/regionGroup/classes/PublicRegionGroup';
import { CreateRegionGroupDto } from '@api/regionGroup/dtos/CreateRegionGroup.dto';
import { UpdateRegionGroupDto } from '@api/regionGroup/dtos/UpdateRegionGroup.dto';
import {
  FindPaginateResponse,
  RegionGroupEntity,
  RegionGroupRepository,
} from '@app/database';
import { QueryOrder } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class RegionGroupService {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(private readonly regionGroupRepository: RegionGroupRepository) {}

  /**
   * Creates a new region group.
   * @param dto - The data transfer object containing the region group details.
   * @returns A promise that resolves to the created region group.
   */
  public async createRegionGroup(dto: CreateRegionGroupDto): Promise<RegionGroupEntity> {
    return await this.regionGroupRepository.save(dto);
  }

  /**
   * Retrieves a paginated list of public region groups.
   * @param limit - The maximum number of items to retrieve per page.
   * @param page - The page number to retrieve.
   * @returns A promise that resolves to a `FindPaginateResponse` containing the paginated list of `PublicRegionGroup` items.
   */
  public async getPublicRegionGroupsPaginated(
    limit: number,
    page: number,
  ): Promise<FindPaginateResponse<PublicRegionGroup>> {
    const res = await this.regionGroupRepository.findAllPaginated({
      limit,
      page,
      populate: ['regions'],
      orderBy: { name: QueryOrder.ASC },
    });

    return {
      items: res.items.map(group => new PublicRegionGroup(group)),
      meta: res.meta,
    };
  }

  /**
   * Retrieves region groups in a paginated manner.
   * @param limit The maximum number of region groups to retrieve per page. Default is 10.
   * @param page The page number of region groups to retrieve. Default is 0.
   * @returns A promise that resolves to a paginated response containing region groups.
   */
  public async getRegionGroupsPaginated(
    limit: number,
    page: number,
  ): Promise<FindPaginateResponse<RegionGroupEntity>> {
    return await this.regionGroupRepository.findAllPaginated({
      limit,
      page,
      populate: ['regions'],
      orderBy: { name: QueryOrder.ASC },
    });
  }

  /**
   * Retrieves a public region group by its ID.
   * @param id - The ID of the region group.
   * @returns A promise that resolves to a PublicRegionGroup object.
   * @throws NotFoundException if the region group is not found.
   */
  public async getPublicRegionGroupById(id: string): Promise<PublicRegionGroup> {
    const group = await this.regionGroupRepository.findOne(id, { populate: ['regions'] });
    if (!group) throw new NotFoundException('Group not found');
    return new PublicRegionGroup(group);
  }

  /**
   * Retrieves a region group by its ID.
   * @param id - The ID of the region group.
   * @returns A promise that resolves to the RegionGroupEntity if found.
   * @throws NotFoundException if the region group is not found.
   */
  public async getRegionGroupById(id: string): Promise<RegionGroupEntity> {
    const group = await this.regionGroupRepository.findOne(id, { populate: ['regions'] });
    if (!group) throw new NotFoundException('Group not found');
    return group;
  }

  /**
   * Updates a region group.
   * @param dto - The DTO containing the updated region group data.
   * @returns A promise that resolves to the updated RegionGroupEntity.
   */
  public async updateRegionGroup(dto: UpdateRegionGroupDto): Promise<RegionGroupEntity> {
    try {
      const group = await this.regionGroupRepository.findOneOrFail(dto.id);
      return await this.regionGroupRepository.update(
        group,
        instanceToPlain(dto, { exposeUnsetFields: false }),
      );
    } catch (error) {
      throw new NotFoundException('Group not found');
    }
  }

  /**
   * Deletes a region group by its ID.
   * @param id The ID of the region group to delete.
   * @returns A Promise that resolves when the region group is deleted.
   */
  public async deleteRegionGroup(id: string): Promise<void> {
    return await this.regionGroupRepository.delete(id);
  }
}
