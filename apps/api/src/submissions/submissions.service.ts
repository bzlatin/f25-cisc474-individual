<<<<<<< HEAD
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
=======
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
>>>>>>> upstream/main

@Injectable()
export class SubmissionsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.submission.findMany();
  }
<<<<<<< HEAD
  async findOne(id: string) {
    const row = await this.prisma.submission.findUnique({ where: { id } });
    if (!row) throw new NotFoundException(`Submission ${id} not found`);
    return row;
=======

  findOne(id: string) {
    return this.prisma.submission.findUnique({
      where: { id },
    });
>>>>>>> upstream/main
  }
}
