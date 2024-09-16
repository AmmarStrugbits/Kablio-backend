import { RECRUITERFIRM_LOGO_KEY } from '@api/recruiterFirm/constants/recruiterFirm.constants';
import { JobPostRepository } from '@app/database';
import { RecruiterFirmEntity } from '@app/database/entities/RecruiterFirm.entity';
import { RecruiterFirmRepository } from '@app/database/repositories/RecruiterFirm.repository';
import { MulterImage, StorageService } from '@app/storage';
import { QueryOrder } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class RecruiterFirmService {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(
    public readonly repository: RecruiterFirmRepository,
    private readonly jobPostRepository: JobPostRepository,
    private readonly storageService: StorageService,
  ) {}

  /**
   * Updates the logo of a RecruiterFirm.
   * @param id - The ID of the RecruiterFirm.
   * @param logo - The new logo image to be uploaded.
   * @returns The updated RecruiterFirmEntity.
   * @throws NotFoundException if the RecruiterFirm with the given ID is not found.
   */
  public async updateLogo(id: string, logo: MulterImage): Promise<RecruiterFirmEntity> {
    const RecruiterFirm = await this.repository.findOne(id);
    if (!RecruiterFirm) throw new NotFoundException('RecruiterFirm not found');
    if (RecruiterFirm.logo) {
      await this.storageService.delete(RecruiterFirm.logo.key);
    }
    return await this.repository.update(id, {
      logo: await this.storageService.uploadImage(
        logo,
        RECRUITERFIRM_LOGO_KEY(id, logo.ext),
      ),
    });
  }

  /**
   * Retrieves a paginated list of job posts for a specific recruiter.
   * @param recruiterId - The ID of the recruiter.
   * @param limit - The maximum number of job posts to retrieve per page.
   * @param page - The page number of the job posts to retrieve.
   * @returns A paginated response containing the job posts.
   */
  public async getJobPostsPaginated(recruiterId: string, limit?: number, page?: number) {
    return await this.jobPostRepository.findPaginated(
      { recruiterFirm: recruiterId },
      { limit, page, orderBy: { recruiterFirm: QueryOrder.ASC } },
    );
  }
}
