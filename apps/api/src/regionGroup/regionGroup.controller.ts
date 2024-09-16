import { PublicRegionGroup } from '@api/regionGroup/classes/PublicRegionGroup';
import { CreateRegionGroupDto } from '@api/regionGroup/dtos/CreateRegionGroup.dto';
import { UpdateRegionGroupDto } from '@api/regionGroup/dtos/UpdateRegionGroup.dto';
import { RegionGroupService } from '@api/regionGroup/regionGroup.service';
import { Admin, Public } from '@app/authentication';
import { FindPaginateResponse, RegionGroupEntity } from '@app/database';
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

@Controller('region-group')
@ApiTags('Region Group')
export class RegionGroupController {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(private readonly regionGroupService: RegionGroupService) {}

  /**
   * Creates a new region group.
   * @param dto - The data transfer object containing the region group details.
   * @returns A promise that resolves to the created region group.
   */
  @Post()
  @Admin()
  async createRegionGroup(@Body() dto: CreateRegionGroupDto): Promise<RegionGroupEntity> {
    return await this.regionGroupService.createRegionGroup(dto);
  }

  /**
   * Retrieves a paginated list of public region groups.
   * @param limit - The maximum number of items to retrieve per page.
   * @param page - The page number to retrieve.
   * @returns A promise that resolves to a `FindPaginateResponse` containing the paginated list of `PublicRegionGroup` items.
   */
  @Get('public/many')
  @Public()
  async getPublicRegionGroupsPaginated(
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
    @Query('page', new DefaultValuePipe(0)) page?: number,
  ): Promise<FindPaginateResponse<PublicRegionGroup>> {
    return await this.regionGroupService.getPublicRegionGroupsPaginated(limit, page);
  }

  /**
   * Retrieves region groups in a paginated manner.
   * @param limit The maximum number of region groups to retrieve per page. Default is 10.
   * @param page The page number of region groups to retrieve. Default is 0.
   * @returns A promise that resolves to a paginated response containing region groups.
   */
  @Get('many')
  @Admin()
  async getRegionGroupsPaginated(
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
    @Query('page', new DefaultValuePipe(0)) page?: number,
  ): Promise<FindPaginateResponse<RegionGroupEntity>> {
    return await this.regionGroupService.getRegionGroupsPaginated(limit, page);
  }

  /**
   * Retrieves a public region group by its ID.
   * @param id The ID of the region group.
   * @returns A Promise that resolves to a PublicRegionGroup object.
   */
  @Get('public')
  @Public()
  async getPublicRegionGroupById(
    @Query('id', ParseUUIDPipe) id: string,
  ): Promise<PublicRegionGroup> {
    return await this.regionGroupService.getPublicRegionGroupById(id);
  }

  /**
   * Retrieves a region group by its ID.
   * @param id The ID of the region group.
   * @returns A Promise that resolves to the RegionGroupEntity.
   */
  @Get()
  @Admin()
  async getRegionGroupById(
    @Query('id', ParseUUIDPipe) id: string,
  ): Promise<RegionGroupEntity> {
    return await this.regionGroupService.getRegionGroupById(id);
  }

  /**
   * Updates a region group.
   * @param dto The DTO containing the updated region group data.
   * @returns A promise that resolves to the updated region group entity.
   */
  @Put()
  @Admin()
  async updateRegionGroup(@Body() dto: UpdateRegionGroupDto): Promise<RegionGroupEntity> {
    return await this.regionGroupService.updateRegionGroup(dto);
  }

  /**
   * Deletes a region group by its ID.
   * @param id The ID of the region group to delete.
   * @returns A Promise that resolves to void.
   */
  @Delete()
  @Admin()
  async deleteRegionGroup(@Query('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.regionGroupService.deleteRegionGroup(id);
  }
}
