import { RegionGroupEntity } from '@app/database';
import { EnsureEntityKeys } from '@app/database/types/Database.types';
import { TargetIdDto } from '@app/shared';
import { Exclude } from 'class-transformer';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateRegionGroupDto
  extends TargetIdDto
  implements EnsureEntityKeys<RegionGroupEntity>
{
  @IsOptional()
  @IsString()
  @Length(3, 100)
  name: string;

  /** Excludes */
  @Exclude()
  regions: RegionGroupEntity;
}
