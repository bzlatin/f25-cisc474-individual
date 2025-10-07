<<<<<<< HEAD
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
=======
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
>>>>>>> upstream/main

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

<<<<<<< HEAD
  async findOne(id: string) {
    const row = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!row) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return row;
=======
  findOne(id: string) {
    return this.prisma.user.findFirst({ where: { id } });
  }

  findByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
>>>>>>> upstream/main
  }
}
