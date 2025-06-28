import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateManagedUserInput } from '../inputs/create-managed-user.input';
import { ManagedUserOutput } from '../outputs/managed-user.output';
import { UsersService } from '../services/users.service';

import { API_VERSIONS_VALUES } from '@/lib/api-versions';

// TODO: later this entire controller will be private and only used by the developers

@Controller({
  path: '/v2/users',
  version: API_VERSIONS_VALUES,
})
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a managed user',
    description: 'Creates a new managed user with the provided information',
  })
  async createManagedUser(
    @Body() createManagedUserInput: CreateManagedUserInput,
  ): Promise<ManagedUserOutput> {
    const { email: username } = createManagedUserInput;
    return this.usersService.createManagedUser(createManagedUserInput, {
      username,
    });
  }

  @Get()
  @ApiOperation({
    summary: 'Get all managed users',
    description: 'Retrieves a list of all managed users',
  })
  async findAllManagedUsers(): Promise<ManagedUserOutput[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get managed user by ID',
    description: 'Retrieves a specific managed user by their ID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Managed user not found',
  })
  async findManagedUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ManagedUserOutput> {
    return this.usersService.findById({ id });
  }
}
