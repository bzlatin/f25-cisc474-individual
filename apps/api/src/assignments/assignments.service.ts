<<<<<<< HEAD
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
=======
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
>>>>>>> upstream/main

@Injectable()
export class AssignmentsService {
  constructor(private prisma: PrismaService) {}
<<<<<<< HEAD
  findAll() {
    return this.prisma.assignment.findMany();
  }
  async findOne(id: string) {
    const row = await this.prisma.assignment.findUnique({ where: { id } });
    if (!row) throw new NotFoundException(`Assignment ${id} not found`);
    return row;
=======

  findAll() {
    return this.prisma.assignment.findMany();
  }

  findOne(id: string) {
    return this.prisma.assignment.findUnique({
      where: { id },
    });
>>>>>>> upstream/main
  }
}
