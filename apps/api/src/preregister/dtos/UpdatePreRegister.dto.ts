import { EnsureEntityKeys, PreRegisterEntity } from '@app/database';
import {
  ISO31661Alpha2,
  ISO31661Alpha2ToCountryName,
  SanitizeEmail,
  TargetIdDto,
} from '@app/shared';
import { Exclude } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class UpdatePreRegisterDto
  extends TargetIdDto
  implements EnsureEntityKeys<PreRegisterEntity>
{
  @IsOptional()
  @IsString()
  @Length(3, 200)
  name: string;

  @IsOptional()
  @IsString()
  @Length(3, 200)
  companyName!: string;

  @IsEmail()
  @SanitizeEmail()
  email!: string;

  @IsOptional()
  @IsUrl()
  website: string;

  @IsOptional()
  @IsEnum(ISO31661Alpha2)
  countryCode: ISO31661Alpha2;

  @IsOptional()
  @IsBoolean()
  newsletter: boolean;

  /*******Exclude*******/

  @Exclude()
  country: ISO31661Alpha2ToCountryName;
}
