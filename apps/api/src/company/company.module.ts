import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CompanyEntity } from '@app/database/entities/Company.entity';
import { JobPostEntity, RegionEntity, RegionIdValidator } from '@app/database';
import { StorageModule } from '@app/storage';

@Module({
  imports: [
    MikroOrmModule.forFeature([CompanyEntity, RegionEntity, JobPostEntity]),
    StorageModule,
  ],
  controllers: [CompanyController],
  providers: [CompanyService, RegionIdValidator],
})
export class CompanyModule {}
