import { JobEntity, JobGroupEntity } from '@app/database';
import { EnsureEntityKeys } from '@app/database/types/Database.types';
import { JobGroupIdValidator } from '@app/database/validators/JobGroupId.validator';
import { Exclude } from 'class-transformer';
import { IsString, IsUUID, Length, Validate } from 'class-validator';

export class CreateJobDto implements EnsureEntityKeys<JobEntity> {
  @IsString()
  @Length(3, 100)
  name!: string;

  @IsUUID('4')
  @Validate(JobGroupIdValidator)
  groupId!: string;

  /** Excludes */
  @Exclude()
  group: JobGroupEntity;
}
