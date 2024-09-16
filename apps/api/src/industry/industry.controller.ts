import { PublicIndustry } from '@api/industry/classes/PublicIndustry';
import { CreateIndustryDto } from '@api/industry/dtos/CreateIndustry.dto';
import { UpdateIndustryDto } from '@api/industry/dtos/UpdateIndustry.dto';
import { IndustryService } from '@api/industry/industry.service';
import { Admin, Public } from '@app/authentication';
import { FindPaginateResponse, IndustryEntity } from '@app/database';
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

@Controller('industry')
@ApiTags('Industry')
export class IndustryController {
  // eslint-disable-next-line
  constructor(private readonly industryService: IndustryService) {}

  /**
   * POST /industry
   * This route creates a new industry.
   * It requires admin privileges.
   * @param dto - Data Transfer Object containing the details of the industry to be created.
   * @returns - The created industry entity.
   */
  @Post()
  @Admin()
  async createIndustry(@Body() dto: CreateIndustryDto): Promise<IndustryEntity> {
    return await this.industryService.createIndustry(dto);
  }

  /**
   * GET /industry
   * This route retrieves paginated industries.
   * It is publicly accessible.
   * @param limit - The number of industries to retrieve per page. Defaults to 10.
   * @param page - The page number to retrieve. Defaults to 0.
   * @returns - The paginated response of public industries.
   */
  @Get('public/many')
  @Public()
  async getPublicIndustries(
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
    @Query('page', new DefaultValuePipe(0)) page?: number,
  ): Promise<FindPaginateResponse<PublicIndustry>> {
    return await this.industryService.getPublicIndustries(limit, page);
  }

  /**
   * GET /industry
   * This route retrieves a single industry.
   * It is publicly accessible.
   * @param id - The ID of the industry to retrieve.
   * @returns - The retrieved industry.
   */
  @Get('public')
  @Public()
  async getPublicIndustry(
    @Query('id', new ParseUUIDPipe()) id: string,
  ): Promise<PublicIndustry> {
    return await this.industryService.getPublicIndustryById(id);
  }

  /**
   * GET /industry
   * This route retrieves paginated industries.
   * It requires admin privileges.
   * @param limit - The number of industries to retrieve per page. Defaults to 10.
   * @param page - The page number to retrieve. Defaults to 0.
   * @returns - The paginated response of industries.
   */
  @Get('many')
  @Admin()
  async getIndustries(
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
    @Query('page', new DefaultValuePipe(0)) page?: number,
  ): Promise<FindPaginateResponse<IndustryEntity>> {
    return await this.industryService.getIndustries(limit, page);
  }

  /**
   * GET /industry
   * This route retrieves a single industry.
   * It requires admin privileges.
   * @param id - The ID of the industry to retrieve.
   * @returns - The retrieved industry.
   */
  @Get()
  @Admin()
  async getIndustry(
    @Query('id', new ParseUUIDPipe()) id: string,
  ): Promise<IndustryEntity> {
    return await this.industryService.getIndustryById(id);
  }

  /**
   * This route updates an existing industry.
   * It requires admin privileges.
   * @param dto - Data Transfer Object containing the updated details of the industry.
   * @returns - The updated industry entity.
   */
  @Put()
  @Admin()
  async updateIndustry(@Body() dto: UpdateIndustryDto): Promise<IndustryEntity> {
    return await this.industryService.updateIndustry(dto);
  }

  /**
   * DELETE /industry
   * This route deletes an existing industry.
   * It requires admin privileges.
   * @param id - The ID of the industry to be deleted.
   * @returns - A message indicating the result of the deletion operation.
   */
  @Delete()
  @Admin()
  async deleteIndustry(@Query('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return await this.industryService.deleteIndustry(id);
  }
}
