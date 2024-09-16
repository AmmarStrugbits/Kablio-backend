import { JobEntity, JobGroupEntity } from '@app/database';
import { EnsureEntityKeys } from '@app/database/types/Database.types';
import { Collection } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateJobGroupDto implements EnsureEntityKeys<JobGroupEntity> {
  @IsString()
  name: string;

  /** Excludes */
  @Exclude()
  jobs: Collection<JobEntity>;
}
