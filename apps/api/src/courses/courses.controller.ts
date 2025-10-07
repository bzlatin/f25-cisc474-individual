<<<<<<< HEAD
import { Controller, Get, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly service: CoursesService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.findOne(id);
=======
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CourseRef, CourseUpdateIn, CourseCreateIn } from '@repo/api/courses';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: CourseUpdateIn) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Post()
  create(@Body() createCourseDto: CourseCreateIn) {
    return this.coursesService.create(createCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
>>>>>>> upstream/main
  }
}
