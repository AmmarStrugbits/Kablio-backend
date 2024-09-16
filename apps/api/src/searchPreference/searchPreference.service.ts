import { UpdateSearchPreferenceDto } from '@api/searchPreference/dtos/UpdateSearchPreference.dto';
import { CreateSearchPreferenceDto } from '@app/authentication';
import {
  SearchPreferenceEntity,
  SearchPreferenceRepository,
  UserEntity,
  UserRepository,
} from '@app/database';
import { LoggerService } from '@app/logger';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class SearchPreferenceService {
  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(
    public readonly repository: SearchPreferenceRepository,
    private readonly userRepository: UserRepository,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Create a Search Preference for the User
   * @param userId - The user ID
   * @param dto - The CreateSearchPreferenceDto
   * @returns - The SearchPreference entity created
   */
  public async saveSearchPreference(
    userId: string,
    dto: CreateSearchPreferenceDto,
  ): Promise<SearchPreferenceEntity> {
    const sp = await this.repository.save({ user: userId, ...dto });
    const user = await this.userRepository.findOne(userId);
    if (!user.searchPreference) {
      user.searchPreference = sp;
    }
    await this.userRepository.flush();
    return sp;
  }

  /**
   * Update the search preference of a user
   * @param userDto - The user to update
   * @param dto - The data to update
   * @returns - The Search Preference of the User
   */
  public async update(
    userDto: UserEntity,
    dto: UpdateSearchPreferenceDto,
  ): Promise<SearchPreferenceEntity> {
    try {
      const user = await this.userRepository.findOne({ email: userDto.email });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return await this.repository.update(user.searchPreference.id, dto, {
        populate: ['industries', 'jobs', 'locations'],
      });
    } catch (error) {
      this.logger.warn(error);
    }
  }
}
