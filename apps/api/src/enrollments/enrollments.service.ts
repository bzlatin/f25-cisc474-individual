import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.enrollment.findMany();
  }
  async findOne(id: string) {
    const row = await this.prisma.enrollment.findUnique({ where: { id } });
    if (!row) throw new NotFoundException(`Enrollment ${id} not found`);
    return row;
  }
}
