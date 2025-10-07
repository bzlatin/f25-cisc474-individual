<<<<<<< HEAD
import { Controller, Get, Param } from '@nestjs/common';
=======
import { Controller, Get } from '@nestjs/common';
>>>>>>> upstream/main
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
<<<<<<< HEAD
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
=======
  constructor(private usersService: UsersService) {}
  @Get()
  findAll() {
>>>>>>> upstream/main
    return this.usersService.findAll();
  }

  @Get(':id')
<<<<<<< HEAD
  getOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
=======
  findOne(id: string) {
    return this.usersService.findOne(id);
  }

  @Get('by-email/:email')
  findByEmail(email: string) {
    return this.usersService.findByEmail(email);
  }
>>>>>>> upstream/main
}
