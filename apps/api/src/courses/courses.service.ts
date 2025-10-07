<<<<<<< HEAD
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
=======
import { Injectable } from '@nestjs/common';
import { CourseCreateIn, CourseUpdateIn } from '@repo/api/courses';
import { PrismaService } from '../prisma.service';
>>>>>>> upstream/main

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}
<<<<<<< HEAD
=======
  create(createCourseDto: CourseCreateIn) {
    return this.prisma.course.create({ data: createCourseDto });
  }
>>>>>>> upstream/main

  findAll() {
    return this.prisma.course.findMany();
  }

<<<<<<< HEAD
  async findOne(id: string) {
    const row = await this.prisma.course.findUnique({
      where: { id },
    });
    if (!row) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return row;
=======
  findOne(id: string) {
    return this.prisma.course.findUnique({
      where: { id },
    });
  }

  update(id: string, updateCourseDto: CourseUpdateIn) {
    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  remove(id: string) {
    return this.prisma.course.delete({
      where: { id },
    });
>>>>>>> upstream/main
  }
}
