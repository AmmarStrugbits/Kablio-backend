import { RegionEntity, RegionGroupEntity, RegionGroupIdValidator } from '@app/database';
import { EnsureEntityKeys } from '@app/database/types/Database.types';
import { TargetIdDto } from '@app/shared';
import { Exclude } from 'class-transformer';
import { IsOptional, IsString, IsUUID, Length, Validate } from 'class-validator';

export class UpdateRegionDto
  extends TargetIdDto
  implements EnsureEntityKeys<RegionEntity>
{
  @IsOptional()
  @IsString()
  @Length(3, 100)
  name: string;

  @IsOptional()
  @IsUUID('4')
  @Validate(RegionGroupIdValidator)
  groupId: string;

  /** Excludes */
  @Exclude()
  group: RegionGroupEntity;
}
