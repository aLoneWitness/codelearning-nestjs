import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizResolver } from './quiz.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { AssignmentService } from '../assignment/assignment.service';
import { Assignment } from '../assignment/entities/assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Assignment])],
  providers: [QuizResolver, QuizService, AssignmentService],
})
export class QuizModule {}
