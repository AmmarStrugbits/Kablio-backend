import { IndustryEntity, IndustryGroupEntity } from '@app/database';
import { EnsureEntityKeys } from '@app/database/types/Database.types';
import { IndustryGroupIdValidator } from '@app/database/validators/IndustryGroupId.validator';
import { Exclude } from 'class-transformer';
import { IsString, IsUUID, Validate } from 'class-validator';

export class CreateIndustryDto implements EnsureEntityKeys<IndustryEntity> {
  /**
   * DOC
   */
  @IsString()
  name: string;

  /**
   * Id to link to the group
   */
  @IsUUID('4')
  @Validate(IndustryGroupIdValidator)
  groupId: string;

  /** Excludes */
  @Exclude()
  group: IndustryGroupEntity;
}
