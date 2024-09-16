import { RegionEntity, RegionGroupEntity } from '@app/database';
import { EnsureEntityKeys } from '@app/database/types/Database.types';
import { RegionGroupIdValidator } from '@app/database/validators/RegionGroupId.validator';
import { Exclude } from 'class-transformer';
import { IsString, IsUUID, Length, Validate } from 'class-validator';

export class CreateRegionDto implements EnsureEntityKeys<RegionEntity> {
  @IsString()
  @Length(3, 100)
  name!: string;

  @IsUUID('4')
  @Validate(RegionGroupIdValidator)
  groupId!: string;

  /** Excludes */
  @Exclude()
  group: RegionGroupEntity;
}
