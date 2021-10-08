import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentResolver } from './assignment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from '../quiz/entities/quiz.entity';
import { Assignment } from './entities/assignment.entity';
import { QuizService } from '../quiz/quiz.service';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment, Quiz])],
  providers: [AssignmentResolver, AssignmentService, QuizService],
})
export class AssignmentModule {}
