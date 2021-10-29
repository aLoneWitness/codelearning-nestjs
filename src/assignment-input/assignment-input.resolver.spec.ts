import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentInputResolver } from './assignment-input.resolver';
import { AssignmentInputService } from './assignment-input.service';

describe('AssignmentInputResolver', () => {
  let resolver: AssignmentInputResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignmentInputResolver, AssignmentInputService],
    }).compile();

    resolver = module.get<AssignmentInputResolver>(AssignmentInputResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
