import { EnsureEntityKeys, JobPostEntity } from '@app/database';
import { SocialMediaEmbeddableDto } from '@app/database/dtos/SocialMediaEmbeddable.dto';
import { PublicFileEmbeddable } from '@app/database/embeddables/storage/PublicFile.embeddable';
import { RecruiterFirmEntity } from '@app/database/entities/RecruiterFirm.entity';
import { Collection } from '@mikro-orm/core';
import { Exclude, Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreateRecruiterFirmDto implements EnsureEntityKeys<RecruiterFirmEntity> {
  @IsString()
  @IsNotEmpty()
  firmName: string;

  @IsString()
  @IsNotEmpty()
  firmOverview: string;

  @ValidateNested()
  @Type(() => SocialMediaEmbeddableDto)
  socialMedia: SocialMediaEmbeddableDto;

  /************ Exclude ************/

  @Exclude()
  logo: PublicFileEmbeddable;

  @Exclude()
  jobPosts: Collection<JobPostEntity>;
}
