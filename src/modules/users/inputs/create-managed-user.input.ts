import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateManagedUserInput {
  @IsString()
  @ApiProperty({ example: 'alice@example.com' })
  email!: string;

  @IsString()
  @ApiProperty({
    example: 'Alice Smith',
    description: "Managed user's name is used in emails",
  })
  name!: string;

  @IsUrl()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    example:
      'https://cal.com/api/avatar/2b735186-b01b-46d3-87da-019b8f61776b.png',
    description: `URL of the user's avatar image`,
  })
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'Bio',
    example: 'I am a bio',
  })
  bio?: string;
}
