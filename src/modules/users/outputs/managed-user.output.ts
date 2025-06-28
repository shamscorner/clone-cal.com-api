import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDateString, IsInt, IsString } from 'class-validator';

export class ManagedUserOutput {
  @IsInt()
  @Expose()
  @ApiProperty({
    type: Number,
    required: true,
    description: 'The ID of the user',
    example: 1,
  })
  id!: number;

  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
    description: 'The username of the user',
    example: 'john_doe',
  })
  username!: string | null;

  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
    description: 'The name of the user',
    example: 'John Doe',
  })
  name!: string | null;

  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    required: true,
    description: 'The email of the user',
    example: 'john@example.com',
  })
  email!: string;

  @IsDateString()
  @Expose()
  @ApiProperty({
    type: Date,
    nullable: true,
    required: false,
    description: 'The date when the email was verified',
    example: '2022-01-01T00:00:00Z',
  })
  emailVerified!: Date | null;

  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
    description: 'The bio of the user',
    example: 'I am a software developer',
  })
  bio!: string | null;

  @IsString()
  @Expose()
  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
    description: "The URL of the user's avatar",
    example: 'https://example.com/avatar.jpg',
  })
  avatarUrl!: string | null;

  @IsDateString()
  @Expose()
  @ApiProperty({
    type: Date,
    required: true,
    description: 'The date when the user was created',
    example: '2022-01-01T00:00:00Z',
  })
  createdDate!: Date;
}
