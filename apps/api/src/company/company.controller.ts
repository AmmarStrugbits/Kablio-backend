import { CompanyService } from '@api/company/company.service';
import { CreateCompanyDto } from '@api/company/dtos/CreateCompany.dto';
import { UpdateCompanyDto } from '@api/company/dtos/UpdateCompany.dto';
import { Admin } from '@app/authentication';
import { FindPaginateResponse, JobPostEntity } from '@app/database';
import { CompanyEntity } from '@app/database/entities/Company.entity';
import { ImagePipe, MulterImage } from '@app/storage';
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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@Controller('company')
@ApiTags('Company')
export class CompanyController {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(private readonly companyService: CompanyService) {}

  /**
   * Creates a new company.
   * @param dto - The data transfer object containing the company information.
   * @returns The created company entity.
   */
  @Post()
  @Admin()
  async createCompany(@Body() dto: CreateCompanyDto): Promise<CompanyEntity> {
    return await this.companyService.createCompany(dto);
  }

  /**
   * Updates the logo of a company.
   * @param file - The new logo image to be uploaded.
   * @param id - The ID of the company.
   * @returns The updated CompanyEntity.
   * @throws NotFoundException if the company with the given ID is not found.
   */
  @Post('logo')
  @Admin()
  @UseInterceptors(FileInterceptor('file'))
  async uploadLogo(
    @UploadedFile(new ImagePipe()) file: MulterImage,
    @Query('id', new ParseUUIDPipe()) id: string,
  ): Promise<CompanyEntity> {
    return await this.companyService.updateLogo(id, file);
  }

  /**
   * Retrieves a company by its ID.
   * @param id - The ID of the company.
   * @returns The company entity.
   * @throws NotFoundException if the company is not found.
   */
  @Get()
  @Admin()
  async getCompanyById(@Query('id', ParseUUIDPipe) id: string): Promise<CompanyEntity> {
    return await this.companyService.getCompanyById(id);
  }

  /**
   * Retrieves a paginated list of companies.
   * @param limit - The maximum number of companies to retrieve per page.
   * @param page - The page number to retrieve.
   * @returns A paginated response containing the companies.
   */
  @Get('many')
  @Admin()
  async getPaginatedCompanies(
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
    @Query('page', new DefaultValuePipe(0)) page?: number,
  ): Promise<FindPaginateResponse<CompanyEntity>> {
    return await this.companyService.getPaginatedCompanies(limit, page);
  }

  /**
   * Retrieves a paginated list of job posts for a specific company.
   * @param companyId - The ID of the company.
   * @param limit - The maximum number of job posts to retrieve per page.
   * @param page - The page number of the job posts to retrieve.
   * @returns A paginated response containing the job posts.
   */
  @Get('job-posts')
  @Admin()
  async getJobPostsPaginated(
    @Query('companyId', ParseUUIDPipe) companyId: string,
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
    @Query('page', new DefaultValuePipe(0)) page?: number,
  ): Promise<FindPaginateResponse<JobPostEntity>> {
    return await this.companyService.getJobPostsPaginated(companyId, limit, page);
  }

  /**
   * Updates a company entity.
   * @param dto - The DTO containing the updated company data.
   * @returns The updated company entity.
   */
  @Put()
  @Admin()
  async updateCompany(@Body() dto: UpdateCompanyDto): Promise<CompanyEntity> {
    return await this.companyService.updateCompany(dto);
  }

  /**
   * Deletes a company by its ID.
   * @param id - The ID of the company to delete.
   * @returns The company is deleted.
   */
  @Delete()
  @Admin()
  async deleteCompany(@Query('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.companyService.deleteCompany(id);
  }
}
