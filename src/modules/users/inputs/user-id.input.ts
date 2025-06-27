import { IsNumber } from 'class-validator';

export class UserIdInput {
  @IsNumber()
  id!: number;
}
