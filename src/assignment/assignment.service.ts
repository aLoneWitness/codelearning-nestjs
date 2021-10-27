import { Injectable } from '@nestjs/common';
import { CreateAssignmentInput } from './dto/create-assignment.input';
import { UpdateAssignmentInput } from './dto/update-assignment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './entities/assignment.entity';
import { Quiz } from '../quiz/entities/quiz.entity';
import { UserInputError } from 'apollo-server-express';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}

  async create(createAssignmentInput: CreateAssignmentInput) {
    const quiz = await this.quizRepository.findOne(
      createAssignmentInput.quizId,
    );

    if (quiz == null) {
      throw new UserInputError('Quiz ID not valid/found');
    }

    const assignment = new Assignment();
    assignment.name = createAssignmentInput.name;
    assignment.description = createAssignmentInput.description;
    assignment.expectedResult = createAssignmentInput.expectedResult;
    assignment.position = createAssignmentInput.position;
    assignment.quiz = quiz;
    return this.assignmentRepository.save(assignment);
  }

  findAll() {
    return this.assignmentRepository.find();
  }

  findByQuiz(quizId: string) {
    return this.assignmentRepository.find({ where: { quiz: { id: quizId } } });
  }

  findOne(id: string) {
    return this.assignmentRepository.findOne(id);
  }

  async update(id: string, updateAssignmentInput: UpdateAssignmentInput) {
    const assignment = await this.assignmentRepository.findOne(id);
    assignment.name = updateAssignmentInput.name;
    assignment.description = updateAssignmentInput.description;
    assignment.expectedResult = updateAssignmentInput.expectedResult;
    assignment.position = updateAssignmentInput.position;
    await this.assignmentRepository.save(assignment);
    return assignment;
  }

  async remove(id: string) {
    const assignment = await this.assignmentRepository.findOne(id);
    return this.assignmentRepository.remove(assignment);
  }
}
