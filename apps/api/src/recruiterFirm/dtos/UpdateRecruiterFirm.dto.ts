import { EnsureEntityKeys, JobPostEntity } from '@app/database';
import { SocialMediaEmbeddableDto } from '@app/database/dtos/SocialMediaEmbeddable.dto';
import { PublicFileEmbeddable } from '@app/database/embeddables/storage/PublicFile.embeddable';
import { RecruiterFirmEntity } from '@app/database/entities/RecruiterFirm.entity';
import { TargetIdDto } from '@app/shared';
import { Collection } from '@mikro-orm/core';
import { Exclude, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

export class UpdateRecruiterFirmDto
  extends TargetIdDto
  implements EnsureEntityKeys<RecruiterFirmEntity>
{
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firmName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firmOverview: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialMediaEmbeddableDto)
  socialMedia: SocialMediaEmbeddableDto;

  /************ Exclude ************/

  @Exclude()
  logo: PublicFileEmbeddable;

  @Exclude()
  jobPosts: Collection<JobPostEntity>;
}
