import {
  ContractType,
  EnsureEntityKeys,
  IndustryEntity,
  JobEntity,
  JobPostEntity,
  RegionEntity,
  RegionIdValidator,
  SocialMediaEmbeddableDto,
} from '@app/database';
import { CompanyEntity } from '@app/database/entities/Company.entity';
import { RecruiterFirmEntity } from '@app/database/entities/RecruiterFirm.entity';
import { CompanySize } from '@app/database/enums/CompanySize.enums';
import { Currency } from '@app/database/enums/Currency.enum';
import { ExperienceLevel } from '@app/database/enums/ExperienceLevel.enums';
import { CompanyIdValidator } from '@app/database/validators/CompanyId.validator';
import { IndustryIdValidator } from '@app/database/validators/IndustryId.validator';
import { JobIdValidator } from '@app/database/validators/JobId.validator';
import { RecruiterFirmIdValidator } from '@app/database/validators/RecruiterFirmId.validator';
import { Exclude, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Length,
  Validate,
  ValidateNested,
} from 'class-validator';

export class CreateJobPostDto implements EnsureEntityKeys<JobPostEntity> {
  //############################################################################
  //Overview Section
  //############################################################################
  @IsOptional()
  @IsUUID('4')
  @Validate(CompanyIdValidator)
  companyId: string;

  @IsOptional()
  @IsUUID('4')
  @Validate(RecruiterFirmIdValidator)
  recruiterFirmId: string;

  @IsString()
  @Length(5)
  @IsNotEmpty()
  title: string;

  @IsUrl()
  url: string;

  @IsOptional()
  @IsEnum(ContractType)
  contractType: ContractType;

  @IsEnum(ExperienceLevel)
  experienceLevel: ExperienceLevel;

  @IsString()
  @Length(5, 120)
  @IsNotEmpty()
  roleFocus: string;

  @IsString()
  @Length(5, 120)
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  dateRange: string;

  @IsOptional()
  @IsEnum(Currency)
  currency: Currency;

  @IsOptional()
  @IsNumber()
  minSalary: number;

  @IsOptional()
  @IsNumber()
  maxSalary: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  companyOneLineOverview: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  workEnvironment: string;

  //############################################################################
  //Overview Section - Additionals options when jobpost is create by recruiter
  //############################################################################

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
  @IsString()
  @IsNotEmpty()
  nbOfEmployees: string;

  //############################################################################
  //Body Section
  //############################################################################
  @IsString()
  // @IsNotEmpty()
  whatYouBring: string;

  @IsString()
  // @IsNotEmpty()
  tasks: string;

  @IsOptional()
  @IsString()
  benefits: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  trainingDevelopment: string;

  @IsOptional()
  @IsString()
  // @IsNotEmpty()
  interviewProcess: string;

  @IsOptional()
  @IsString()
  // @IsNotEmpty()
  visaSponsorchip: string;

  @IsOptional()
  @IsString()
  // @IsNotEmpty()
  securityClearance: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  companyOverview: string;

  //############################################################################
  //Body Section - Additionals options when jobpost is create by recruiter
  //############################################################################

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

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  recruiterOverview: string;

  @IsOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => SocialMediaEmbeddableDto)
  recruiterSocialMedia: SocialMediaEmbeddableDto;

  @IsOptional()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => SocialMediaEmbeddableDto)
  recruiterFirmSocialMedia: SocialMediaEmbeddableDto;

  @IsOptional()
  @IsArray()
  @IsEnum(CompanySize, { each: true })
  companySize: CompanySize[];

  //############################################################################
  //JobPost fetched from dynamoDB
  //############################################################################
  @IsOptional()
  @IsUrl()
  dynamoUrl: string;

  //############################################################################
  //Additionals fields
  //############################################################################
  @IsOptional()
  @IsNumber()
  expirationDays?: number;

  //############################################################################
  //Field not meant to be displayed, Only for Matching Algorithm
  //############################################################################
  @IsNotEmpty({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  @Validate(JobIdValidator, { each: true })
  roleIds: string[];

  @IsNotEmpty({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  @Validate(IndustryIdValidator, { each: true })
  industryIds: string[];

  @IsNotEmpty({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  @Validate(RegionIdValidator, { each: true })
  regionIds: string[];

  /****************************** Exclude ************************************/
  @Exclude()
  company: CompanyEntity;

  @Exclude()
  recruiterFirm: RecruiterFirmEntity;

  @Exclude()
  role: JobEntity[];

  @Exclude()
  industry: IndustryEntity[];

  @Exclude()
  region: RegionEntity[];
}
