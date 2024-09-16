import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  IndustryEntity,
  JobEntity,
  JobPostEntity,
  RegionEntity,
  RegionIdValidator,
} from '@app/database';
import { CompanyEntity } from '@app/database/entities/Company.entity';
import { RecruiterFirmEntity } from '@app/database/entities/RecruiterFirm.entity';
import { CompanyIdValidator } from '@app/database/validators/CompanyId.validator';
import { RecruiterFirmIdValidator } from '@app/database/validators/RecruiterFirmId.validator';
import { JobPostService } from '@api/jobPost/jobPost.service';
import { JobPostController } from '@api/jobPost/jobPost.controller';
import { JobIdValidator } from '@app/database/validators/JobId.validator';
import { IndustryIdValidator } from '@app/database/validators/IndustryId.validator';
import { RedisService } from '@app/redis';
import { DynamodbModule } from '@api/dynamodb/dynamodb.module';
import { LoggerService } from '@app/logger';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      JobPostEntity,
      RegionEntity,
      CompanyEntity,
      RecruiterFirmEntity,
      JobEntity,
      IndustryEntity,
    ]),
    DynamodbModule,
  ],
  controllers: [JobPostController],
  providers: [
    JobPostService,
    RedisService,
    CompanyIdValidator,
    RecruiterFirmIdValidator,
    RegionIdValidator,
    JobIdValidator,
    IndustryIdValidator,
    LoggerService,
  ],
})
export class JobPostModule {}
