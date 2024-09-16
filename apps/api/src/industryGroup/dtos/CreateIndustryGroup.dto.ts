import { EnsureEntityKeys, IndustryEntity, IndustryGroupEntity } from '@app/database';
import { Collection } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class CreateIndustryGroupDto implements EnsureEntityKeys<IndustryGroupEntity> {
  @IsString()
  @Length(3, 100)
  name: string;

  /** Excludes */
  @Exclude()
  industries: Collection<IndustryEntity>;
}
