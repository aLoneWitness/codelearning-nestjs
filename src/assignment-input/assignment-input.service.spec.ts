import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentInputService } from './assignment-input.service';

describe('AssignmentInputService', () => {
  let service: AssignmentInputService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignmentInputService],
    }).compile();

    service = module.get<AssignmentInputService>(AssignmentInputService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
