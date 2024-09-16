import { PublicJobGroup } from '@api/jobGroup/classes/PublicJobGroup';
import { CreateJobGroupDto } from '@api/jobGroup/dtos/CreateJobGroup.dto';
import { UpdateJobGroupDto } from '@api/jobGroup/dtos/UpdateJobGroup.dto';
import { JobGroupService } from '@api/jobGroup/jobGroup.service';
import { Admin, Public } from '@app/authentication';
import { FindPaginateResponse, JobGroupEntity } from '@app/database';
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

@Controller('job-group')
@ApiTags('Job Group')
export class JobGroupController {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(private readonly jobGroupService: JobGroupService) {}

  /**
   * Creates a new job group.
   * @param dto - The data transfer object containing the job group details.
   * @returns A promise that resolves to the created job group.
   */
  @Post()
  @Admin()
  async createJobGroup(@Body() dto: CreateJobGroupDto): Promise<JobGroupEntity> {
    return await this.jobGroupService.createJobGroup(dto);
  }

  /**
   * Retrieves a paginated list of public job groups.
   * @param limit - The maximum number of items to retrieve per page.
   * @param page - The page number to retrieve.
   * @returns A promise that resolves to a `FindPaginateResponse` containing the paginated list of `PublicJobGroup` items.
   */
  @Get('public/many')
  @Public()
  async getPublicJobGroupsPaginated(
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
    @Query('page', new DefaultValuePipe(0)) page?: number,
  ): Promise<FindPaginateResponse<PublicJobGroup>> {
    return await this.jobGroupService.getPublicJobGroupsPaginated(limit, page);
  }

  /**
   * Retrieves job groups in a paginated manner.
   * @param limit The maximum number of job groups to retrieve per page. Default is 10.
   * @param page The page number of job groups to retrieve. Default is 0.
   * @returns A promise that resolves to a paginated response containing job groups.
   */
  @Get('many')
  @Admin()
  async getJobGroupsPaginated(
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
    @Query('page', new DefaultValuePipe(0)) page?: number,
  ): Promise<FindPaginateResponse<JobGroupEntity>> {
    return await this.jobGroupService.getJobGroupsPaginated(limit, page);
  }

  /**
   * Retrieves a public job group by its ID.
   * @param id The ID of the job group.
   * @returns A Promise that resolves to a PublicJobGroup object.
   */
  @Get('public')
  @Public()
  async getPublicJobGroupById(
    @Query('id', ParseUUIDPipe) id: string,
  ): Promise<PublicJobGroup> {
    return await this.jobGroupService.getPublicJobGroupById(id);
  }

  /**
   * Retrieves a job group by its ID.
   * @param id The ID of the job group.
   * @returns A Promise that resolves to the JobGroupEntity.
   */
  @Get()
  @Admin()
  async getJobGroupById(@Query('id', ParseUUIDPipe) id: string): Promise<JobGroupEntity> {
    return await this.jobGroupService.getJobGroupById(id);
  }

  /**
   * Updates a job group.
   * @param dto The DTO containing the updated job group data.
   * @returns A promise that resolves to the updated job group entity.
   */
  @Put()
  @Admin()
  async updateJobGroup(@Body() dto: UpdateJobGroupDto): Promise<JobGroupEntity> {
    return await this.jobGroupService.updateJobGroup(dto);
  }

  /**
   * Deletes a job group by its ID.
   * @param id The ID of the job group to delete.
   * @returns A Promise that resolves to void.
   */
  @Delete()
  @Admin()
  async deleteJobGroup(@Query('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.jobGroupService.deleteJobGroup(id);
  }
}
