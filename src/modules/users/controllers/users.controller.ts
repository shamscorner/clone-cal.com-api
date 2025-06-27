import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { API_VERSIONS_VALUES } from '@/lib/api-versions';

import { CreateManagedUserInput } from '../inputs/create-managed-user.input';
import { UsersService } from '../services/users.service';

// TODO: later this entire controller will be private and only used by the developers

@Controller({
  path: '/v2/users',
  version: API_VERSIONS_VALUES,
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createManagedUser(
    @Body() createManagedUserInput: CreateManagedUserInput,
  ) {
    const { email: username } = createManagedUserInput;
    return this.usersService.createManagedUser(createManagedUserInput, {
      username,
    });
  }

  @Get()
  async findAllManagedUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findManagedUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById({ id });
  }
}
