import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}
  findAll() {
    return this.prisma.feedback.findMany();
  }
  async findOne(id: string) {
    const row = await this.prisma.feedback.findUnique({ where: { id } });
    if (!row) throw new NotFoundException(`Feedback ${id} not found`);
    return row;
  }
}
