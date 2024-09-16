import { Module } from '@nestjs/common';
import { RegionController } from './region.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RegionEntity, RegionGroupEntity, RegionGroupIdValidator } from '@app/database';
import { RegionService } from '@api/region/region.service';

@Module({
  imports: [MikroOrmModule.forFeature([RegionEntity, RegionGroupEntity])],
  providers: [RegionService, RegionGroupIdValidator],
  controllers: [RegionController],
})
export class RegionModule {}
