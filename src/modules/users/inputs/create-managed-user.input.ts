import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateManagedUserInput {
  @IsString()
  email!: string;

  @IsString()
  name!: string;

  @IsUrl()
  @IsOptional()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  bio?: string;
}
