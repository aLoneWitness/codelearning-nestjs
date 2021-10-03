import { Injectable } from '@nestjs/common';
import { CreateQuizInput } from './dto/create-quiz.input';
import { UpdateQuizInput } from './dto/update-quiz.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
  ) {}

  create(createQuizInput: CreateQuizInput) {
    const quiz = this.quizRepository.create();
    quiz.name = createQuizInput.name;
    quiz.description = createQuizInput.description;
    return this.quizRepository.save(quiz);
  }

  findAll() {
    return this.quizRepository.find();
  }

  findOne(id: string) {
    return this.quizRepository.findOne(id);
  }

  async update(id: string, updateQuizInput: UpdateQuizInput) {
    const quiz = await this.quizRepository.findOne(id);
    quiz.name = updateQuizInput.name;
    quiz.description = updateQuizInput.description;
    await this.quizRepository.save(quiz);
    return quiz;
  }

  async remove(id: string) {
    const quiz = await this.quizRepository.findOne(id);
    return this.quizRepository.remove(quiz);
  }
}
