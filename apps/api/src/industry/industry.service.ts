import { PublicIndustry } from '@api/industry/classes/PublicIndustry';
import { CreateIndustryDto } from '@api/industry/dtos/CreateIndustry.dto';
import { UpdateIndustryDto } from '@api/industry/dtos/UpdateIndustry.dto';
import {
  FindPaginateResponse,
  IndustryEntity,
  IndustryGroupRepository,
} from '@app/database';
import { IndustryRepository } from '@app/database/repositories/Industry.repository';
import { QueryOrder } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class IndustryService {
  // eslint-disable-next-line
  constructor(
    private readonly industryRepository: IndustryRepository,
    private readonly groupRepository: IndustryGroupRepository,
  ) {}

  /**
   * Creates a new industry.
   * @param dto - Data Transfer Object containing the details of the industry to be created.
   * @returns - The created industry entity.
   */
  public async createIndustry(dto: CreateIndustryDto): Promise<IndustryEntity> {
    return await this.industryRepository.save({
      ...dto,
      group: this.groupRepository.getReference(dto.groupId),
    });
  }

  /**
   * Retrieves paginated industries.
   * @param limit - The number of industries to retrieve per page.
   * @param page - The page number to retrieve.
   * @returns - The paginated response of public industries.
   */
  public async getPublicIndustries(
    limit: number,
    page: number,
  ): Promise<FindPaginateResponse<PublicIndustry>> {
    const res = await this.industryRepository.findAllPaginated({
      limit,
      page,
      populate: ['group'],
      orderBy: { name: QueryOrder.ASC },
    });

    // Sort the results by group.name alphabetically
    res.items.sort((a, b) => a.group.name.localeCompare(b.group.name));

    return {
      items: res.items.map(industry => new PublicIndustry(industry)),
      meta: res.meta,
    };
  }

  /**
   * Retrieves a paginated list of industries.
   * @param limit - The maximum number of industries to retrieve per page.
   * @param page - The page number of the industries to retrieve.
   * @returns A promise that resolves to a paginated response containing the industries.
   */
  public async getIndustries(
    limit: number,
    page: number,
  ): Promise<FindPaginateResponse<IndustryEntity>> {
    const res = await this.industryRepository.findAllPaginated({
      limit,
      page,
      populate: ['group'],
      orderBy: { group: QueryOrder.ASC, name: QueryOrder.ASC },
    });

    // Sort the results by group.name alphabetically
    res.items.sort((a, b) => a.group.name.localeCompare(b.group.name));

    return res;
  }

  /**
   * Retrieves a public industry by its ID.
   * @param id - The ID of the industry to retrieve.
   * @returns A Promise that resolves to a PublicIndustry object.
   * @throws NotFoundException if the industry is not found.
   */
  public async getPublicIndustryById(id: string): Promise<PublicIndustry> {
    const industry = await this.industryRepository.findOne(id, { populate: ['group'] });
    if (!industry) {
      throw new NotFoundException('Industry not found');
    }
    return new PublicIndustry(industry);
  }

  /**
   * Retrieves an industry by its ID.
   * @param id - The ID of the industry to retrieve.
   * @returns A Promise that resolves to the IndustryEntity object.
   * @throws NotFoundException if the industry with the specified ID is not found.
   */
  public async getIndustryById(id: string): Promise<IndustryEntity> {
    const industry = await this.industryRepository.findOne(id, { populate: ['group'] });
    if (!industry) {
      throw new NotFoundException('Industry not found');
    }
    return industry;
  }

  /**
   * Updates an existing industry.
   * @param dto - Data Transfer Object containing the updated details of the industry.
   * @returns - The updated industry entity.
   */
  public async updateIndustry(dto: UpdateIndustryDto): Promise<IndustryEntity> {
    const industry = await this.industryRepository.findOne(dto.id);
    if (!industry) throw new NotFoundException('Industry not found');
    if (dto.groupId) {
      industry.group = this.groupRepository.getReference(dto.groupId);
    }
    return await this.industryRepository.update(
      dto.id,
      instanceToPlain(dto, { exposeUnsetFields: false }),
    );
  }

  /**
   * Deletes an existing industry.
   * @param id - The ID of the industry to be deleted.
   * @returns - A message indicating the result of the deletion operation.
   */
  public async deleteIndustry(id: string): Promise<void> {
    return await this.industryRepository.delete(id);
  }
}
