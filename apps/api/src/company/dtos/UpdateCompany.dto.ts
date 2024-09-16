import { ExternalLinkDto } from '@api/company/dtos/ExternalLink.dto';
import { EnsureEntityKeys, JobPostEntity, RegionEntity } from '@app/database';
import { PublicFileEmbeddable } from '@app/database/embeddables/storage/PublicFile.embeddable';
import { CompanyEntity } from '@app/database/entities/Company.entity';
import { CompanySize } from '@app/database/enums/CompanySize.enums';
import { SanitizeEmail, TargetIdDto } from '@app/shared';
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

export class UpdateCompanyDto
  extends TargetIdDto
  implements EnsureEntityKeys<CompanyEntity>
{
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUrl()
  website: string;

  @IsOptional()
  @IsEmail()
  @SanitizeEmail()
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  oneLineOverview: string;

  @IsOptional()
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

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  overview: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  cultureValues: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  environmentSustainability: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  inclusionDiversity: string;

  @IsOptional()
  @IsArray()
  @IsEnum(CompanySize, { each: true })
  companySize: CompanySize[];

  //@IsOptional()
  //@IsNumber()
  //glassdoorRating?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExternalLinkDto)
  externalLinks: ExternalLinkDto[];

  /************ Exclude ************/
  @Exclude()
  location: RegionEntity;

  @Exclude()
  logo: PublicFileEmbeddable;

  @Exclude()
  jobPosts: Collection<JobPostEntity>;
}
