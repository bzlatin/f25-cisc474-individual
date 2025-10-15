import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import type {
  AssignmentCreateIn,
  AssignmentIdParams,
  AssignmentUpdateIn,
} from '@repo/api/assignments';
import { AssignmentsService } from './assignments.service';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly service: AssignmentsService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() body: AssignmentCreateIn) {
    return this.service.create(body);
  }

  @Patch(':id')
  update(
    @Param() params: AssignmentIdParams,
    @Body() body: AssignmentUpdateIn,
  ) {
    return this.service.update(params.id, body);
  }

  @Delete(':id')
  remove(@Param() params: AssignmentIdParams) {
    return this.service.remove(params.id);
  }
}
