import { EnsureEntityKeys, IndustryGroupEntity, IndustryEntity } from '@app/database';
import { TargetIdDto } from '@app/shared/dtos/TargetId.dto';
import { Exclude } from 'class-transformer';
import { IsOptional, IsString, Length } from 'class-validator';
import { Collection } from 'lodash';

export class UpdateIndustryGroupDto
  extends TargetIdDto
  implements EnsureEntityKeys<IndustryGroupEntity>
{
  @IsOptional()
  @IsString()
  @Length(3, 100)
  name: string;

  /** Excludes */
  @Exclude()
  industries: Collection<IndustryEntity>;
}
