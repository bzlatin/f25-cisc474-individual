import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '@repo/database';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of users', async () => {
    const result: User[] = [
      { id: '1', name: 'Ada Bart', email: '', emailVerified: null },
    ];
    jest.spyOn(service, 'findAll').mockResolvedValueOnce(result);

    expect(await service.findAll()).toBe(result);
  });
});
