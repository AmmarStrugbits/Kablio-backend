import { EnsureEntityKeys, PreRegisterEntity } from '@app/database';
import { ISO31661Alpha2, ISO31661Alpha2ToCountryName, SanitizeEmail } from '@app/shared';
import { Exclude } from 'class-transformer';
import { IsBoolean, IsEmail, IsEnum, IsString, IsUrl, Length } from 'class-validator';

export class CreatePreRegisterDto implements EnsureEntityKeys<PreRegisterEntity> {
  @IsString()
  @Length(3, 200)
  name!: string;

  @IsString()
  @Length(3, 200)
  companyName!: string;

  @IsEmail()
  @SanitizeEmail()
  email!: string;

  @IsUrl()
  website!: string;

  @IsEnum(ISO31661Alpha2)
  countryCode!: ISO31661Alpha2;

  @IsBoolean()
  newsletter!: boolean;

  /*******Exclude*******/

  @Exclude()
  country: ISO31661Alpha2ToCountryName;
}
