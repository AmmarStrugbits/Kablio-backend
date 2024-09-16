import { CreatePreRegisterCandidateDto } from '@api/preregisterCandidate/dtos/CreatePreRegisterCandidate.dto';
import { FindPaginateResponse } from '@app/database';
import { PreRegisterCandidateEntity } from '@app/database/entities/PreRegisterCandidate.entity';
import { PreRegisterCandidateRepository } from '@app/database/repositories/PreRegisterCandidate.repository';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class PreregisterCandidateService {
  // eslint-disable-next-line jsdoc/require-jsdoc
  constructor(private readonly repository: PreRegisterCandidateRepository) {}

  /**
   * Creates a new pre-registered candidate.
   * @param dto - The data transfer object containing the candidate information.
   * @returns -
   */
  public async save(dto: CreatePreRegisterCandidateDto): Promise<void> {
    const form = await this.repository.findOne({ email: dto.email });
    if (form) {
      throw new BadRequestException('Email already exists');
    }
    await this.repository.save(dto);
  }

  /**
   * Retrieves all paginated PreRegister Candidate Form.
   * @param page - The page number.
   * @param limit - The maximum number of records per page.
   * @returns the paginated PreRegister Candidate Form.
   */
  public async getAllPaginated(
    page: number,
    limit: number,
  ): Promise<FindPaginateResponse<PreRegisterCandidateEntity>> {
    return await this.repository.findAllPaginated({ page, limit });
  }

  /**
   * Retrieves PreRegister Candidate Form by email.
   * @param email - The email of the candidate to retrieve.
   * @returns the PreRegister Candidate Form.
   */
  public async getByEmail(email: string): Promise<PreRegisterCandidateEntity> {
    return await this.repository.findOne({ email });
  }

  /**
   * Deletes a preregistered candidate by ID.
   * @param id - The ID of the candidate to delete.
   * @returns -
   */
  public async delete(id: string): Promise<void> {
    const form = await this.repository.findOne({ id });
    if (!form) {
      throw new BadRequestException('Form not found');
    }
    await this.repository.delete(id);
  }
}
