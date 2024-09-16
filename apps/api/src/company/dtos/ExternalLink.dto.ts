import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class ExternalLinkDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl()
  url: string;
}
