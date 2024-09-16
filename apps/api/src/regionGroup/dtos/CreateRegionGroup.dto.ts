import { RegionEntity, RegionGroupEntity } from '@app/database';
import { EnsureEntityKeys } from '@app/database/types/Database.types';
import { Collection } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateRegionGroupDto implements EnsureEntityKeys<RegionGroupEntity> {
  @IsString()
  name: string;

  /** Excludes */
  @Exclude()
  regions: Collection<RegionEntity>;
}
