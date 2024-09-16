import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { JobEntity, JobGroupEntity } from '@app/database';
import { JobGroupIdValidator } from '@app/database/validators/JobGroupId.validator';

@Module({
  imports: [MikroOrmModule.forFeature([JobEntity, JobGroupEntity])],
  providers: [JobService, JobGroupIdValidator],
  controllers: [JobController],
})
export class JobModule {}
