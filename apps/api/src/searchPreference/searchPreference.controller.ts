import { UpdateSearchPreferenceDto } from '@api/searchPreference/dtos/UpdateSearchPreference.dto';
import { SearchPreferenceService } from '@api/searchPreference/searchPreference.service';
import { CreateSearchPreferenceDto, User, UserRequest } from '@app/authentication';
import { SearchPreferenceEntity } from '@app/database';
import { Body, Controller, Get, Post, Put, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('search-preference')
@ApiTags('Search Preference')
export class SearchPreferenceController {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(private readonly searchPreferenceService: SearchPreferenceService) {}

  /**
   * Get the user's search preferences
   * @param req - the user request
   * @returns the Search Preference Entity
   */
  @Get()
  @User()
  async getSearchPreference(
    @Request() req: UserRequest,
  ): Promise<SearchPreferenceEntity> {
    return await this.searchPreferenceService.repository.findOne(
      { user: req.user.id },
      { populate: ['industries', 'locations', 'jobs'] },
    );
  }

  /**
   * Create a Search Preference for the User
   * @param req - The user request
   * @param dto - The CreateSearchPreferenceDto
   * @returns - The SearchPreference entity created
   */
  @Post()
  @User()
  async createSearchPreference(
    @Request() req: UserRequest,
    @Body() dto: CreateSearchPreferenceDto,
  ): Promise<SearchPreferenceEntity> {
    return await this.searchPreferenceService.saveSearchPreference(req.user.id, dto);
  }

  /**
   * Updates the search preference for a user.
   * @param req - The request object containing user information.
   * @param dto - The data transfer object containing the updated search preference.
   * @returns - The SearchPreference entity updated
   */
  @Put()
  @User()
  async updateSearchPreference(
    @Request() req: UserRequest,
    @Body() dto: UpdateSearchPreferenceDto,
  ): Promise<SearchPreferenceEntity> {
    return await this.searchPreferenceService.update(req.user, dto);
  }
}
