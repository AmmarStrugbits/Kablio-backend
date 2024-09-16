import { ExternalLinkDto } from '@api/company/dtos/ExternalLink.dto';
import { EnsureEntityKeys, JobPostEntity } from '@app/database';
import { PublicFileEmbeddable } from '@app/database/embeddables/storage/PublicFile.embeddable';
import { CompanyEntity } from '@app/database/entities/Company.entity';
import { CompanySize } from '@app/database/enums/CompanySize.enums';
import { SanitizeEmail } from '@app/shared';
import { Collection } from '@mikro-orm/core';
import { Exclude, Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class CreateCompanyDto implements EnsureEntityKeys<CompanyEntity> {
  @IsString()
  name: string;

  @IsOptional()
  @IsUrl()
  website: string;

  @IsEmail()
  @SanitizeEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  oneLineOverview: string;

  @IsString()
  @IsNotEmpty()
  nbOfEmployees: string;

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  serviceSpecialisms: string[];

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  sectorSpecialisms: string[];

  @IsNotEmpty()
  @IsString()
  overview: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  cultureValues: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  environmentSustainability: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  inclusionDiversity: string;

  //@IsOptional()
  //@IsNumber()
  //glassdoorRating?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExternalLinkDto)
  externalLinks: ExternalLinkDto[];

  @IsOptional()
  @IsArray()
  @IsEnum(CompanySize, { each: true })
  companySize: CompanySize[];

  /** Excludes */
  @Exclude()
  logo: PublicFileEmbeddable;

  @Exclude()
  jobPosts: Collection<JobPostEntity>;
}
