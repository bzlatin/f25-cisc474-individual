import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.course.findMany();
  }

  async findOne(id: string) {
    const row = await this.prisma.course.findUnique({
      where: { id },
    });
    if (!row) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return row;
  }
}
