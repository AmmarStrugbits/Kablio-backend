import { PublicRegion } from '@api/region/classes/PublicRegion';
import { CreateRegionDto } from '@api/region/dtos/CreateRegion.dto';
import { UpdateRegionDto } from '@api/region/dtos/UpdateRegion.dto';
import { RegionService } from '@api/region/region.service';
import { Admin, Public } from '@app/authentication';
import { FindPaginateResponse, RegionEntity } from '@app/database';
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

@Controller('region')
@ApiTags('Region')
export class RegionController {
  // eslint-disable-next-line
  constructor(private readonly regionService: RegionService) {}

  /**
   * Creates a new region.
   * @param dto The data transfer object containing the region details.
   * @returns A promise that resolves to the created region.
   */
  @Post()
  @Admin()
  async createRegion(@Body() dto: CreateRegionDto): Promise<RegionEntity> {
    return await this.regionService.createRegion(dto);
  }

  /**
   * Gets a paginated list of public regions.
   * @param limit The maximum number of items to return.
   * @param page The page to return.
   * @returns A promise that resolves to a paginated list of public regions.
   */
  @Get('public/many')
  @Public()
  async getPublicRegionsPaginated(
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
    @Query('page', new DefaultValuePipe(0)) page?: number,
  ): Promise<FindPaginateResponse<PublicRegion>> {
    return await this.regionService.getPublicRegionsPaginated(limit, page);
  }

  /**
   * Retrieves a paginated list of regions.
   * @param limit - The maximum number of regions to retrieve per page. Default is 10.
   * @param page - The page number to retrieve. Default is 0.
   * @returns A promise that resolves to a paginated response containing the regions.
   */
  @Get('many')
  @Admin()
  async getRegionsPaginated(
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
    @Query('page', new DefaultValuePipe(0)) page?: number,
  ): Promise<FindPaginateResponse<RegionEntity>> {
    return await this.regionService.getRegionsPaginated(limit, page);
  }

  /**
   * Retrieves a public region by its ID.
   * @param id The ID of the region.
   * @returns A Promise that resolves to a PublicRegion object.
   */
  @Get('public')
  @Public()
  async getPublicRegionsById(
    @Query('id', ParseUUIDPipe) id: string,
  ): Promise<PublicRegion> {
    return await this.regionService.getPublicRegionById(id);
  }

  /**
   * Retrieves a region by its ID.
   * @param id The ID of the region.
   * @returns A promise that resolves to the RegionEntity.
   */
  @Get()
  @Admin()
  async getRegionByID(@Query('id', ParseUUIDPipe) id: string): Promise<RegionEntity> {
    return await this.regionService.getRegionById(id);
  }

  /**
   * Updates a region.
   * @param dto - The DTO containing the updated region data.
   * @returns A Promise that resolves to the updated RegionEntity.
   */
  @Put()
  @Admin()
  async updateRegion(@Body() dto: UpdateRegionDto): Promise<RegionEntity> {
    return await this.regionService.updateRegion(dto);
  }

  /**
   * Deletes a region by its ID.
   * @param id - The ID of the region to delete.
   * @returns A Promise that resolves to void.
   */
  @Delete()
  @Admin()
  async deleteRegion(@Query('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.regionService.deleteRegion(id);
  }
}
