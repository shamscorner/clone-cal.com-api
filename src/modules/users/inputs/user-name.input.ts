import { IsString } from 'class-validator';

export class UsernameInput {
  @IsString()
  username!: string;
}
