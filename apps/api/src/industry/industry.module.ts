import { Module } from '@nestjs/common';
import { IndustryController } from './industry.controller';
import { IndustryService } from './industry.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { IndustryEntity } from '@app/database/entities/Industry.entity';
import { IndustryGroupEntity } from '@app/database';
import { LoggerService } from '@app/logger';
import { IndustryGroupIdValidator } from '@app/database/validators/IndustryGroupId.validator';

@Module({
  imports: [MikroOrmModule.forFeature([IndustryEntity, IndustryGroupEntity])],
  controllers: [IndustryController],
  providers: [IndustryService, IndustryGroupIdValidator, LoggerService],
})
export class IndustryModule {}
