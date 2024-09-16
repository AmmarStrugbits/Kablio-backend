import { COMPANY_LOGO_KEY } from '@api/company/constants/company.constants';
import { CreateCompanyDto } from '@api/company/dtos/CreateCompany.dto';
import { UpdateCompanyDto } from '@api/company/dtos/UpdateCompany.dto';
import {
  FindPaginateResponse,
  JobPostEntity,
  JobPostRepository,
  RegionRepository,
} from '@app/database';
import { CompanyEntity } from '@app/database/entities/Company.entity';
import { CompanyRepository } from '@app/database/repositories/Company.repository';
import { MulterImage, StorageService } from '@app/storage';
import { QueryOrder } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class CompanyService {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly regionRepository: RegionRepository,
    private readonly jobPostRepository: JobPostRepository,
    private readonly storageService: StorageService,
  ) {}

  /**
   * Creates a new company.
   * @param dto - The data transfer object containing the company information.
   * @returns The created company entity.
   */
  public async createCompany(dto: CreateCompanyDto): Promise<CompanyEntity> {
    return this.companyRepository.save({
      ...dto,
    });
  }

  /**
   * Updates the logo of a company.
   * @param id - The ID of the company.
   * @param logo - The new logo image to be uploaded.
   * @returns The updated CompanyEntity.
   * @throws NotFoundException if the company with the given ID is not found.
   */
  public async updateLogo(id: string, logo: MulterImage): Promise<CompanyEntity> {
    const company = await this.companyRepository.findOne(id);
    if (!company) throw new NotFoundException('Company not found');
    if (company.logo) {
      await this.storageService.delete(company.logo.key);
    }
    return await this.companyRepository.update(id, {
      logo: await this.storageService.uploadImage(logo, COMPANY_LOGO_KEY(id, logo.ext)),
    });
  }

  /**
   * Retrieves a company by its ID.
   * @param id - The ID of the company.
   * @returns The company entity.
   * @throws NotFoundException if the company is not found.
   */
  public async getCompanyById(id: string): Promise<CompanyEntity> {
    const company = await this.companyRepository.findOne(id);
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  /**
   * Retrieves a paginated list of companies.
   * @param limit - The maximum number of companies to retrieve per page.
   * @param page - The page number to retrieve.
   * @returns A paginated response containing the companies.
   */
  public async getPaginatedCompanies(
    limit: number,
    page: number,
  ): Promise<FindPaginateResponse<CompanyEntity>> {
    return await this.companyRepository.findAllPaginated({
      limit,
      page,
      orderBy: { name: QueryOrder.ASC },
    });
  }

  /**
   * Retrieves a paginated list of job posts for a specific company.
   * @param companyId - The ID of the company.
   * @param limit - The maximum number of job posts to retrieve per page.
   * @param page - The page number of the job posts to retrieve.
   * @returns A paginated response containing the job posts.
   */
  public async getJobPostsPaginated(
    companyId: string,
    limit: number,
    page: number,
  ): Promise<FindPaginateResponse<JobPostEntity>> {
    return await this.jobPostRepository.findPaginated(
      { company: companyId },
      { limit, page },
    );
  }

  /**
   * Updates a company entity.
   * @param dto - The DTO containing the updated company data.
   * @returns The updated company entity.
   */
  public async updateCompany(dto: UpdateCompanyDto): Promise<CompanyEntity> {
    const company = await this.companyRepository.findOne(dto.id);
    if (!company) throw new NotFoundException('Company not found');
    return await this.companyRepository.update(
      dto.id,
      instanceToPlain(dto, { exposeUnsetFields: false }),
    );
  }

  /**
   * Deletes a company by its ID.
   * @param id - The ID of the company to delete.
   * @returns The company is deleted.
   */
  public async deleteCompany(id: string): Promise<void> {
    return await this.companyRepository.delete(id);
  }
}
