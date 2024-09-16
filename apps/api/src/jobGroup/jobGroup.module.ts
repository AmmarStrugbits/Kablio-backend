import { Module } from '@nestjs/common';
import { JobGroupService } from './jobGroup.service';
import { JobGroupController } from './jobGroup.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { JobGroupEntity } from '@app/database';

@Module({
  imports: [MikroOrmModule.forFeature([JobGroupEntity])],
  providers: [JobGroupService],
  controllers: [JobGroupController],
})
export class JobGroupModule {}
