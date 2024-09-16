import { CreatePreRegisterCandidateDto } from '@api/preregisterCandidate/dtos/CreatePreRegisterCandidate.dto';
import { PreregisterCandidateService } from '@api/preregisterCandidate/preregisterCandidate.service';
import { Admin, Public } from '@app/authentication';
import { FindPaginateResponse } from '@app/database';
import { PreRegisterCandidateEntity } from '@app/database/entities/PreRegisterCandidate.entity';
import { IsEmailPipe } from '@app/shared';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('preregister-candidate')
@ApiTags('Preregisters candidate')
export class PreregisterCandidateController {
  // eslint-disable-next-line jsdoc/require-jsdoc
  constructor(
    private readonly preregisterCandidateService: PreregisterCandidateService,
  ) {}

  /**
   * Creates a new pre-registered candidate.
   * @param dto - The data transfer object containing the candidate information.
   * @returns -
   */
  @Post()
  @Public()
  async create(@Body() dto: CreatePreRegisterCandidateDto): Promise<void> {
    await this.preregisterCandidateService.save(dto);
  }

  /**
   * Retrieves all paginated PreRegister Candidate Form.
   * @param page - The page number.
   * @param limit - The maximum number of records per page.
   * @returns the paginated PreRegister Candidate Form.
   */
  @Get('many')
  @Admin()
  async getAllPaginated(
    @Query('page', new DefaultValuePipe(10)) page?: number,
    @Query('limit', new DefaultValuePipe(0)) limit?: number,
  ): Promise<FindPaginateResponse<PreRegisterCandidateEntity>> {
    return await this.preregisterCandidateService.getAllPaginated(page, limit);
  }

  /**
   * Retrieves PreRegister Candidate Form by email.
   * @param email - The email of the candidate to retrieve.
   * @returns the PreRegister Candidate Form.
   */
  @Get()
  @Admin()
  async getByEmail(
    @Query('email', IsEmailPipe) email: string,
  ): Promise<PreRegisterCandidateEntity> {
    return await this.preregisterCandidateService.getByEmail(email);
  }

  /**
   * Deletes a preregistered candidate by ID.
   * @param id - The ID of the candidate to delete.
   * @returns -
   */
  @Delete()
  @Admin()
  async delete(@Query('id') id: string): Promise<void> {
    await this.preregisterCandidateService.delete(id);
  }
}
