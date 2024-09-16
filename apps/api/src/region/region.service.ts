import { PublicRegion } from '@api/region/classes/PublicRegion';
import { CreateRegionDto } from '@api/region/dtos/CreateRegion.dto';
import { UpdateRegionDto } from '@api/region/dtos/UpdateRegion.dto';
import { FindPaginateResponse, RegionEntity, RegionRepository } from '@app/database';
import { QueryOrder } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class RegionService {
  // eslint-disable-next-line
  constructor(private readonly regionRepository: RegionRepository) {}

  /**
   * Creates a new region.
   * @param dto - The data transfer object containing the region details.
   * @returns A promise that resolves to the created region.
   */
  public async createRegion(dto: CreateRegionDto): Promise<RegionEntity> {
    return await this.regionRepository.save({
      ...dto,
      group: this.regionRepository.getReference(dto.groupId),
    });
  }

  /**
   * Gets a paginated list of public regions.
   * @param limit - The maximum number of items to return.
   * @param page - The page to return.
   * @returns A promise that resolves to a paginated list of public regions.
   */
  public async getPublicRegionsPaginated(
    limit: number,
    page: number,
  ): Promise<FindPaginateResponse<PublicRegion>> {
    const res = await this.regionRepository.findAllPaginated({
      limit,
      page,
      populate: ['group'],
      orderBy: { name: QueryOrder.ASC },
    });

    // Sort the results by group.name alphabetically
    res.items.sort((a, b) => a.group.name.localeCompare(b.group.name));

    return {
      items: res.items.map(region => new PublicRegion(region)),
      meta: res.meta,
    };
  }

  /**
   * Gets a paginated list of regions.
   * @param limit - The maximum number of items to return.
   * @param page - The page to return.
   * @returns A promise that resolves to a paginated list of regions.
   */
  public async getRegionsPaginated(
    limit: number,
    page: number,
  ): Promise<FindPaginateResponse<RegionEntity>> {
    const res = await this.regionRepository.findAllPaginated({
      limit,
      page,
      populate: ['group'],
      orderBy: { name: QueryOrder.ASC },
    });

    // Sort the results by group.name alphabetically
    res.items.sort((a, b) => a.group.name.localeCompare(b.group.name));

    return res;
  }

  /**
   * Retrieves a public region by its ID.
   * @param id - The ID of the region.
   * @returns A Promise that resolves to a PublicRegion object.
   */
  public async getPublicRegionById(id: string): Promise<PublicRegion> {
    const region = await this.regionRepository.findOne(id);
    if (!region) throw new NotFoundException('Region not found');
    return new PublicRegion(region);
  }

  /**
   * Retrieves a region by its ID.
   * @param id - The ID of the region.
   * @returns A promise that resolves to the RegionEntity with the specified ID.
   */
  public async getRegionById(id: string): Promise<RegionEntity> {
    const region = await this.regionRepository.findOne(id);
    if (!region) throw new NotFoundException('region not found');
    return region;
  }

  /**
   * Updates a region group.
   * @param dto - The DTO containing the updated region group data.
   * @returns A promise that resolves to the updated RegionEntity.
   */
  public async updateRegion(dto: UpdateRegionDto): Promise<RegionEntity> {
    const group = await this.regionRepository.findOne(dto.id);
    if (!group) throw new NotFoundException('Group not found');

    return await this.regionRepository.update(
      group,
      instanceToPlain(dto, { exposeUnsetFields: false }),
    );
  }

  /**
   * Deletes a region by its ID.
   * @param id The ID of the region to delete.
   * @returns A Promise that resolves when the region is deleted.
   */
  public async deleteRegion(id: string): Promise<void> {
    return this.regionRepository.delete(id);
  }
}
