import { AppController } from '@api/app.controller';
import { EnvironmentModule } from '@api/environment/src/environment.module';
import { AuthModule } from '@app/authentication';
import { RedisModule } from '@app/redis';
import { DatabaseModule } from '@app/database';
import { CustomRequestContext } from '@app/shared';
import { RequestContextModule } from '@medibloc/nestjs-request-context';
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { SocketIoModule } from '@app/socket-io';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from '@app/logger';
import { RegionModule } from './region/region.module';
import { IndustryModule } from './industry/industry.module';
import { IndustryGroupModule } from './industryGroup/industryGroup.module';
import { PreregisterModule } from './preregister/preregister.module';
import { UserModule } from './user/user.module';
import { SearchPreferenceModule } from './searchPreference/searchPreference.module';
import { JobModule } from './job/job.module';
import { JobGroupModule } from './jobGroup/jobGroup.module';
import { CompanyModule } from './company/company.module';
import { PreregisterCandidateModule } from './preregisterCandidate/preregisterCandidate.module';
import { RecruiterFirmModule } from './recruiterFirm/recruiterFirm.module';
import { JobPostModule } from '@api/jobPost/jobPost.module';
import { RegionGroupModule } from '@api/regionGroup/regionGroup.module';
import { DynamodbModule } from './dynamodb/dynamodb.module';

@Module({
  imports: [
    // Libs
    RedisModule,
    SocketIoModule,
    DatabaseModule,
    AuthModule,
    LoggerModule,
    // Modules
    RequestContextModule.forRoot({
      contextClass: CustomRequestContext,
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    EnvironmentModule,
    RegionModule,
    RegionGroupModule,
    IndustryModule,
    IndustryGroupModule,
    PreregisterModule,
    UserModule,
    JobModule,
    JobGroupModule,
    JobPostModule,
    CompanyModule,
    PreregisterCandidateModule,
    SearchPreferenceModule,
    RecruiterFirmModule,
    DynamodbModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
