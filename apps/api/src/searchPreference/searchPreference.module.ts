import { Module } from '@nestjs/common';
import { SearchPreferenceController } from './searchPreference.controller';
import { SearchPreferenceService } from './searchPreference.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  IndustryEntity,
  JobEntity,
  RegionEntity,
  SearchPreferenceEntity,
  UserEntity,
} from '@app/database';
import { UserIdValidator } from '@app/database/validators/UserId.validator';
import { LoggerService } from '@app/logger';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      SearchPreferenceEntity,
      UserEntity,
      RegionEntity,
      JobEntity,
      IndustryEntity,
    ]),
  ],
  controllers: [SearchPreferenceController],
  providers: [SearchPreferenceService, UserIdValidator, LoggerService],
})
export class SearchPreferenceModule {}
