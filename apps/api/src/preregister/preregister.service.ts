import { CreatePreRegisterDto } from '@api/preregister/dtos/CreatePreRegister.dto';
import { UpdatePreRegisterDto } from '@api/preregister/dtos/UpdatePreRegister.dto';
import { FindPaginateResponse } from '@app/database';
import { PreRegisterEntity } from '@app/database/entities/PreRegister.entity';
import { PreRegisterRepository } from '@app/database/repositories/PreRegister.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PreregisterService {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(private readonly preregisterRepository: PreRegisterRepository) {}

  /**
   * Creates a new pre-registration.
   * @param data - The data for the pre-registration.
   * @returns A promise that resolves when the pre-registration is created.
   * @throws If an error occurs while creating the pre-registration.
   */
  public async createPreRegister(data: CreatePreRegisterDto): Promise<PreRegisterEntity> {
    return await this.preregisterRepository.save(data);
  }

  /**
   * Retrieves all pre-registers with pagination.
   * @param limit - The maximum number of pre-registers to retrieve per page.
   * @param page - The page number of pre-registers to retrieve.
   * @returns A promise that resolves to a paginated response of pre-registers.
   * @throws If an error occurs while retrieving the pre-registers.
   */
  public async getAllPreRegisters(
    limit: number,
    page: number,
  ): Promise<FindPaginateResponse<PreRegisterEntity>> {
    return await this.preregisterRepository.findAllPaginated({ limit, page });
  }

  /**
   * Retrieves a pre-register by its email.
   * @param email - The email of the pre-register to retrieve.
   * @returns A promise that resolves to the pre-register.
   * @throws If an error occurs while retrieving the pre-register.
   */
  public async getPreRegisterByEmail(email: string): Promise<PreRegisterEntity> {
    return await this.preregisterRepository.findOneOrFail({ email });
  }

  /**
   * Updates a pre-register entry with the provided data.
   * @param data - The data to update the pre-register entry with.
   * @returns A promise that resolves to the updated pre-register entry.
   * @throws If an error occurs while updating the pre-register entry.
   */
  public async updatePreRegister(data: UpdatePreRegisterDto): Promise<PreRegisterEntity> {
    return await this.preregisterRepository.update({ email: data.email }, data);
  }

  /**
   * Deletes a pre-register by its ID.
   * @param email - The email of the pre-register to delete.
   * @returns A promise that resolves to the result of the deletion.
   * @throws If an error occurs during the deletion process.
   */
  public async deletePreRegister(email: string): Promise<void> {
    return await this.preregisterRepository.delete({ email });
  }
}
