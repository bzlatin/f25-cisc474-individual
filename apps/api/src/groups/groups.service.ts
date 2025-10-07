import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.assignmentGroup.findMany();
  }

  findOne(id: string) {
    return this.prisma.assignmentGroup.findUnique({
      where: { id },
    });
  }
}
