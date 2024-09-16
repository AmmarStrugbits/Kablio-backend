import { JobEntity, JobGroupEntity } from '@app/database';
import { EnsureEntityKeys } from '@app/database/types/Database.types';
import { JobGroupIdValidator } from '@app/database/validators/JobGroupId.validator';
import { TargetIdDto } from '@app/shared';
import { Exclude } from 'class-transformer';
import { IsOptional, IsString, IsUUID, Length, Validate } from 'class-validator';

export class UpdateJobDto extends TargetIdDto implements EnsureEntityKeys<JobEntity> {
  @IsOptional()
  @IsString()
  @Length(3, 100)
  name: string;

  @IsOptional()
  @IsUUID('4')
  @Validate(JobGroupIdValidator)
  groupId: string;

  /** Excludes */
  @Exclude()
  group: JobGroupEntity;
}
