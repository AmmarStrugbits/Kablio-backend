import { IndustryEntity, IndustryGroupEntity } from '@app/database';
import { EnsureEntityKeys } from '@app/database/types/Database.types';
import { IndustryGroupIdValidator } from '@app/database/validators/IndustryGroupId.validator';
import { TargetIdDto } from '@app/shared/dtos/TargetId.dto';
import { Exclude } from 'class-transformer';
import { IsOptional, IsString, IsUUID, Validate } from 'class-validator';

export class UpdateIndustryDto
  extends TargetIdDto
  implements EnsureEntityKeys<IndustryEntity>
{
  /**
   * DOC
   */
  @IsOptional()
  @IsString()
  name: string;

  /**
   * Id to link to the group
   */
  @IsOptional()
  @IsUUID('4')
  @Validate(IndustryGroupIdValidator)
  groupId: string;

  /** Excludes */
  @Exclude()
  group: IndustryGroupEntity;
}
