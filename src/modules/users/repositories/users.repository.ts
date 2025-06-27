import { Injectable } from '@nestjs/common';
import { CreationSource } from '@prisma/client';

import { PrismaReadService } from '@/modules/prisma/prisma-read.service';
import { PrismaWriteService } from '@/modules/prisma/prisma-write.service';

import { CreateManagedUserInput } from '../inputs/create-managed-user.input';
import { UserIdInput } from '../inputs/user-id.input';
import { UsernameInput } from '../inputs/user-name.input';

@Injectable()
export class UsersRepository {
  constructor(
    private readonly dbRead: PrismaReadService,
    private readonly dbWrite: PrismaWriteService,
  ) {}

  async create(user: CreateManagedUserInput, username: UsernameInput) {
    return this.dbWrite.prisma.user.create({
      data: {
        ...user,
        username: username.username,
        creationSource: CreationSource.API_V2,
      },
    });
  }

  async findAll() {
    return this.dbRead.prisma.user.findMany({
      orderBy: {
        createdDate: 'desc',
      },
    });
  }

  async findById(userIdInput: UserIdInput) {
    return this.dbRead.prisma.user.findUnique({
      where: {
        id: userIdInput.id,
      },
    });
  }
}
