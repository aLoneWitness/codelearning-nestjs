import { Module } from '@nestjs/common';
import { AssignmentInputService } from './assignment-input.service';
import { AssignmentInputResolver } from './assignment-input.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from '../assignment/entities/assignment.entity';
import { AssignmentInput } from './entities/assignment-input.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment, AssignmentInput])],
  providers: [AssignmentInputResolver, AssignmentInputService],
})
export class AssignmentInputModule {}
