import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateManagedUserInput } from '../inputs/create-managed-user.input';
import { UserIdInput } from '../inputs/user-id.input';
import { UsernameInput } from '../inputs/user-name.input';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createManagedUser(
    user: CreateManagedUserInput,
    usernameInput: UsernameInput,
  ) {
    return this.usersRepository.create(user, usernameInput);
  }

  async findAll() {
    return this.usersRepository.findAll();
  }

  async findById(userIdInput: UserIdInput) {
    const user = await this.usersRepository.findById(userIdInput);
    if (!user) {
      throw new NotFoundException(
        `User with ID=${userIdInput.id} does not exist.`,
      );
    }
    return user;
  }
}
