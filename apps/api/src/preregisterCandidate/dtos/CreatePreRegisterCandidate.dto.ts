import { EnsureEntityKeys } from '@app/database';
import { PreRegisterCandidateEntity } from '@app/database/entities/PreRegisterCandidate.entity';
import { SanitizeEmail } from '@app/shared';
import { IsBoolean, IsEmail, IsString, IsUrl, Length } from 'class-validator';

export class CreatePreRegisterCandidateDto
  implements EnsureEntityKeys<PreRegisterCandidateEntity>
{
  @IsString()
  @Length(3, 50)
  name!: string;

  @IsEmail()
  @SanitizeEmail()
  email!: string;

  @IsUrl()
  linkedin!: string;

  @IsString()
  @Length(3, 50)
  profession!: string;

  @IsBoolean()
  newsletter!: boolean;
}
