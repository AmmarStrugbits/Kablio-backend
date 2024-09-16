import { PublicIndustryGroup } from '@api/industryGroup/classes/PublicIndustryGroup';
import { CreateIndustryGroupDto } from '@api/industryGroup/dtos/CreateIndustryGroup.dto';
import { UpdateIndustryGroupDto } from '@api/industryGroup/dtos/UpdateIndustryGroup.dto';
import { IndustryGroupService } from '@api/industryGroup/industryGroup.service';
import { Admin, Public } from '@app/authentication';
import { FindPaginateResponse, IndustryGroupEntity } from '@app/database';
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

@Controller('industry-group')
@ApiTags('Industry Group')
export class IndustryGroupController {
  // eslint-disable-next-line
  constructor(private readonly industryGroupService: IndustryGroupService) {}

  /**
   * POST /industry-group
   * This route creates a new industry group.
   * It requires admin privileges.
   * @param dto - Data Transfer Object containing the details of the industry group to be created.
   * @returns - The created industry group entity.
   */
  @Post()
  @Admin()
  async createIndustryGroup(
    @Body() dto: CreateIndustryGroupDto,
  ): Promise<IndustryGroupEntity> {
    return await this.industryGroupService.createIndustryGroup(dto);
  }

  /**
   * GET /industry-group
   * This route retrieves paginated industry groups.
   * It is publicly accessible.
   * @param limit - The number of industry groups to retrieve per page. Defaults to 10.
   * @param page - The page number to retrieve. Defaults to 1.
   * @returns - The paginated response of public industry groups.
   */
  @Get('public/many')
  @Public()
  async getPublicPaginatedIndustryGroups(
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
    @Query('page', new DefaultValuePipe(1)) page?: number,
  ): Promise<FindPaginateResponse<PublicIndustryGroup>> {
    return await this.industryGroupService.getPublicPaginatedIndustryGroups(limit, page);
  }

  /**
   * GET /industry-group
   * This route retrieves a single industry group.
   * It is publicly accessible.
   * @param id - The ID of the industry group to retrieve.
   * @returns - The retrieved industry group.
   */
  @Get('public')
  @Public()
  async getPublicIndustryGroupByID(
    @Query('id', new ParseUUIDPipe()) id: string,
  ): Promise<PublicIndustryGroup> {
    return await this.industryGroupService.getPublicIndustryGroupById(id);
  }

  /**
   * GET /industry-group
   * This route retrieves paginated industry groups.
   * It requires admin privileges.
   * @param limit - The number of industry groups to retrieve per page. Defaults to 10.
   * @param page - The page number to retrieve. Defaults to 1.
   * @returns - The paginated response of industry groups.
   */
  @Get('many')
  @Admin()
  async getPaginatedIndustryGroups(
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
    @Query('page', new DefaultValuePipe(1)) page?: number,
  ): Promise<FindPaginateResponse<IndustryGroupEntity>> {
    return await this.industryGroupService.getPaginatedIndustryGroups(limit, page);
  }

  /**
   * GET /industry-group
   * This route retrieves a single industry group.
   * It requires admin privileges.
   * @param id - The ID of the industry group to retrieve.
   * @returns - The retrieved industry group.
   */
  @Get()
  @Admin()
  async getIndustryGroupById(
    @Query('id', new ParseUUIDPipe()) id: string,
  ): Promise<IndustryGroupEntity> {
    return await this.industryGroupService.getIndustryGroupById(id);
  }

  /**
   * PUT /industry-group
   * This route updates an existing industry group.
   * It requires admin privileges.
   * @param dto - Data Transfer Object containing the updated details of the industry group.
   * @returns - The updated industry group entity.
   */
  @Put()
  @Admin()
  async updateIndustryGroup(
    @Body() dto: UpdateIndustryGroupDto,
  ): Promise<IndustryGroupEntity> {
    return await this.industryGroupService.updateIndustryGroup(dto);
  }

  /**
   * DELETE /industry-group
   * This route deletes an existing industry group.
   * It requires admin privileges.
   * @param id - The ID of the industry group to be deleted.
   * @returns - A message indicating the result of the deletion operation.
   */
  @Delete()
  @Admin()
  async deleteIndustryGroup(@Query('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return await this.industryGroupService.deleteIndustryGroup(id);
  }
}
