import { Module } from '@nestjs/common';
import { RegionGroupService } from './regionGroup.service';
import { RegionGroupController } from './regionGroup.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RegionGroupEntity } from '@app/database';

@Module({
  imports: [MikroOrmModule.forFeature([RegionGroupEntity])],
  providers: [RegionGroupService],
  controllers: [RegionGroupController],
})
export class RegionGroupModule {}
