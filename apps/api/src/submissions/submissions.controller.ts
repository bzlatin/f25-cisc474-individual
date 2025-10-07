<<<<<<< HEAD
import { Controller, Get, Param } from '@nestjs/common';
=======
import { Controller, Get } from '@nestjs/common';
>>>>>>> upstream/main
import { SubmissionsService } from './submissions.service';

@Controller('submissions')
export class SubmissionsController {
<<<<<<< HEAD
  constructor(private readonly service: SubmissionsService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.findOne(id);
=======
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Get()
  findAll() {
    return this.submissionsService.findAll();
  }
  @Get(':id')
  findOne(id: string) {
    return this.submissionsService.findOne(id);
>>>>>>> upstream/main
  }
}
