import {
  ContractType,
  EnsureEntityKeys,
  ExperienceLevel,
  JobseekerStatus,
  SearchPreferenceEntity,
  UserEntity,
  Visa,
  Travel,
} from '@app/database';
import { CompanySize } from '@app/database/enums/CompanySize.enums';
import { Currency } from '@app/database/enums/Currency.enum';
import { IndustryIdValidator } from '@app/database/validators/IndustryId.validator';
import { JobIdValidator } from '@app/database/validators/JobId.validator';
import {
  Iso6391LanguageCode,
  Iso6391LanguageCodeToLanguageName,
} from '@app/shared/enums/Language.enum';
import { LocationIdValidator } from '@app/shared/validators/LocationId.validator';
import { Exclude } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';

export class UpdateSearchPreferenceDto
  implements EnsureEntityKeys<SearchPreferenceEntity>
{
  @IsOptional()
  @IsArray()
  @IsEnum(ContractType, { each: true })
  contractType: ContractType[];

  @IsOptional()
  @IsArray()
  @IsEnum(ExperienceLevel, { each: true })
  experienceLevel: ExperienceLevel[];

  @IsOptional()
  @IsEnum(Currency)
  currency: Currency;

  @IsOptional()
  @IsNumber()
  minSalary: number;

  @IsOptional()
  @IsArray()
  @Validate(IndustryIdValidator, { each: true })
  @IsUUID('4', { each: true })
  industries: string[];

  @IsOptional()
  @IsArray()
  @Validate(LocationIdValidator, { each: true })
  @IsUUID('4', { each: true })
  locations: string[];

  @IsOptional()
  @IsArray()
  @Validate(JobIdValidator, { each: true })
  @IsUUID('4', { each: true })
  jobs: string[];

  @IsOptional()
  @IsArray()
  @IsEnum(Visa, { each: true })
  visa: Visa[];

  @IsOptional()
  @IsArray()
  @IsEnum(Travel, { each: true })
  travel: Travel[];

  @IsOptional()
  @IsArray()
  @IsEnum(Iso6391LanguageCode, { each: true })
  languagesCode: Iso6391LanguageCode[];

  @IsOptional()
  @IsArray()
  @IsEnum(JobseekerStatus, { each: true })
  jobseekerStatus: JobseekerStatus[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  values: string[];

  @IsOptional()
  @IsArray()
  @IsEnum(CompanySize, { each: true })
  companySize: CompanySize[];

  /********Exclude********/
  @Exclude()
  languages: Iso6391LanguageCodeToLanguageName[];

  @Exclude()
  user: UserEntity;
}
