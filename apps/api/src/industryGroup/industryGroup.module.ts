import { Module } from '@nestjs/common';
import { IndustryGroupController } from './industryGroup.controller';
import { IndustryGroupService } from './industryGroup.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { IndustryGroupEntity } from '@app/database';
import { LoggerService } from '@app/logger';

@Module({
  imports: [MikroOrmModule.forFeature([IndustryGroupEntity])],
  controllers: [IndustryGroupController],
  providers: [IndustryGroupService, LoggerService],
})
export class IndustryGroupModule {}
