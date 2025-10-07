<<<<<<< HEAD
import { Controller, Get, Param } from '@nestjs/common';
=======
import { Controller, Get } from '@nestjs/common';
>>>>>>> upstream/main
import { AssignmentsService } from './assignments.service';

@Controller('assignments')
export class AssignmentsController {
<<<<<<< HEAD
  constructor(private readonly service: AssignmentsService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.findOne(id);
=======
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Get()
  findAll() {
    return this.assignmentsService.findAll();
  }
  @Get(':id')
  findOne(id: string) {
    return this.assignmentsService.findOne(id);
>>>>>>> upstream/main
  }
}
