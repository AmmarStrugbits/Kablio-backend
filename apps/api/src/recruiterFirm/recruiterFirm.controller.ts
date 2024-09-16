import { CreateRecruiterFirmDto } from '@api/recruiterFirm/dtos/CreateRecruiterFirm.dto';
import { UpdateRecruiterFirmDto } from '@api/recruiterFirm/dtos/UpdateRecruiterFirm.dto';
import { RecruiterFirmService } from '@api/recruiterFirm/recruiterFirm.service';
import { Admin } from '@app/authentication';
import { FindPaginateResponse, JobPostEntity } from '@app/database';
import { RecruiterFirmEntity } from '@app/database/entities/RecruiterFirm.entity';
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

@Controller('recruiter')
@ApiTags('Recruiter Firm')
export class RecruiterFirmController {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(private readonly recruiterService: RecruiterFirmService) {}

  /**
   * Saves a recruiter.
   * @param dto The data transfer object containing the recruiter information.
   * @returns -
   */
  @Post()
  @Admin()
  async saveRecruiter(@Body() dto: CreateRecruiterFirmDto): Promise<RecruiterFirmEntity> {
    return await this.recruiterService.repository.save(dto);
  }

  /**
   * Updates the logo of a recruiter firm .
   * @param file - The new logo image to be uploaded.
   * @param id - The ID of the recruiter firm .
   * @returns The updated recruiter firm Entity.
   * @throws NotFoundException if the recruiter firm  with the given ID is not found.
   */
  @Post('logo')
  @Admin()
  @UseInterceptors(FileInterceptor('file'))
  async uploadLogo(
    @UploadedFile(new ImagePipe()) file: MulterImage,
    @Query('id', new ParseUUIDPipe()) id: string,
  ): Promise<RecruiterFirmEntity> {
    return await this.recruiterService.updateLogo(id, file);
  }

  /**
   * Retrieves a paginated list of all recruiters.
   * @param limit - The maximum number of recruiters to retrieve per page. Default is 10.
   * @param page - The page number to retrieve. Default is 0.
   * @returns A paginated response containing the recruiters.
   */
  @Get('many')
  @Admin()
  async getAllPaginatedRecruiters(
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
    @Query('page', new DefaultValuePipe(0)) page?: number,
  ): Promise<FindPaginateResponse<RecruiterFirmEntity>> {
    return await this.recruiterService.repository.findAllPaginated({ limit, page });
  }

  /**
   * Retrieves a paginated list of job posts for a specific recruiter.
   * @param recruiterId - The ID of the recruiter.
   * @param limit - The maximum number of job posts to retrieve per page.
   * @param page - The page number of the job posts to retrieve.
   * @returns A paginated response containing the job posts.
   */
  @Get('job-posts')
  @Admin()
  async getJobPostsPaginated(
    @Query('recruiterId', ParseUUIDPipe) recruiterId: string,
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
    @Query('page', new DefaultValuePipe(0)) page?: number,
  ): Promise<FindPaginateResponse<JobPostEntity>> {
    return await this.recruiterService.getJobPostsPaginated(recruiterId, limit, page);
  }

  /**
   * Retrieves a recruiter by their email.
   * @param name - The name of the recruiter firm.
   * @returns The recruiter object.
   * @throws NotFoundException if the recruiter is not found.
   */
  @Get()
  @Admin()
  async getRecruiterByName(@Query('name') name: string): Promise<RecruiterFirmEntity> {
    return await this.recruiterService.repository.findOneOrFail({ firmName: name });
  }

  /**
   * Updates a recruiter entity.
   * @param dto The DTO containing the updated recruiter data.
   * @returns The updated recruiter entity.
   * @throws BadRequestException if an error occurs during the update process.
   */
  @Put()
  @Admin()
  async updateRecruiter(
    @Body() dto: UpdateRecruiterFirmDto,
  ): Promise<RecruiterFirmEntity> {
    return await this.recruiterService.repository.update(dto.id, dto);
  }

  /**
   * Deletes a recruiter by ID.
   * @param id The ID of the recruiter to delete.
   * @throws {NotFoundException} If the recruiter is not found.
   */
  @Delete()
  @Admin()
  async deleteRecruiter(@Query('id') id: string): Promise<void> {
    await this.recruiterService.repository.delete(id);
  }
}
