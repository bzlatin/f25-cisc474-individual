import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.assignment.findMany();
  }

  async findOne(id: string) {
    const row = await this.prisma.assignment.findUnique({
      where: { id },
    });
    if (!row) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return row;
  }
}
