import { CreateJobPostDto } from '@api/jobPost/dtos/CreateJobPost.dto';
import { UpdateJobPostDto } from '@api/jobPost/dtos/UpdateJobPost.dto';
import { JobPostService } from '@api/jobPost/jobPost.service';
import { Admin } from '@app/authentication';
import { FindPaginateResponse, JobPostEntity } from '@app/database';
import { TimeoutInterceptor } from '@app/shared/interceptors/timeout.interceptor';
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
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('job-post')
@ApiTags('Job Post')
export class JobPostController {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(private readonly jobPostService: JobPostService) {}

  /**
   * Synchronizes job posts by calling the JobPostService.
   * @returns A message indicating the synchronization status and the total number of job posts.
   */
  @Get('synchronize')
  @UseInterceptors(new TimeoutInterceptor(300000))
  async synchronizeJobPosts(): Promise<{ message: string; totalCount: number }> {
    const totalCount = await this.jobPostService.synchronizeJobPosts();
    return {
      message: 'Job posts synchronized successfully',
      totalCount,
    };
  }

  /**
   * Creates a new job post.
   * @param dto - The data transfer object containing the job post details.
   * @returns The created JobPostEntity.
   */
  @Post()
  @Admin()
  async createJobPost(@Body() dto: CreateJobPostDto): Promise<JobPostEntity> {
    return this.jobPostService.createJobPost(dto);
  }

  /**
   * Retrieves a paginated list of job posts.
   * @param limit - The maximum number of job posts to retrieve per page.
   * @param page - The page number of the job posts to retrieve.
   * @returns A promise that resolves to a paginated response containing job posts.
   */
  @Get('many')
  @Admin()
  async getPaginatedJobPost(
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
    @Query('page', new DefaultValuePipe(0)) page?: number,
  ): Promise<FindPaginateResponse<JobPostEntity>> {
    return this.jobPostService.getAllPaginated(limit, page);
  }

  /**
   * Get the Job Post by id
   * @param id - Id of the job post
   * @returns - the Job Post entity
   */
  @Get()
  @Admin()
  async getById(@Query('id', ParseUUIDPipe) id: string): Promise<JobPostEntity> {
    return this.jobPostService.getById(id);
  }

  /**
   * Updates a job post with the provided data.
   * @param dto - The data to update the job post with.
   * @returns A promise that resolves to the updated job post entity.
   */
  @Put()
  @Admin()
  async updateJobPost(@Body() dto: UpdateJobPostDto): Promise<JobPostEntity> {
    return this.jobPostService.updateJobPost(dto);
  }

  /**
   * Deletes a job post by its ID.
   * @param id - The ID of the job post to delete.
   * @returns The job post is successfully deleted.
   */
  @Delete()
  @Admin()
  async deleteJobPost(@Query('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.jobPostService.deleteJobPost(id);
  }
}
