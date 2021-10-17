import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { QuizService } from './quiz.service';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizInput } from './dto/create-quiz.input';
import { UpdateQuizInput } from './dto/update-quiz.input';
import { AssignmentService } from '../assignment/assignment.service';

@Resolver(() => Quiz)
export class QuizResolver {
  constructor(
    private readonly quizService: QuizService,
    private readonly assignmentService: AssignmentService,
  ) {}

  @Mutation(() => Quiz)
  createQuiz(@Args('createQuizInput') createQuizInput: CreateQuizInput) {
    return this.quizService.create(createQuizInput);
  }

  @Query(() => [Quiz], { name: 'quizzes' })
  findAll() {
    return this.quizService.findAll();
  }

  @Query(() => Quiz, { name: 'quiz' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.quizService.findOne(id);
  }

  @Mutation(() => Quiz)
  updateQuiz(@Args('updateQuizInput') updateQuizInput: UpdateQuizInput) {
    return this.quizService.update(updateQuizInput.id, updateQuizInput);
  }

  @Mutation(() => Quiz)
  removeQuiz(@Args('id', { type: () => String }) id: string) {
    return this.quizService.remove(id);
  }

  @ResolveField()
  async assignments(@Parent() quiz: Quiz) {
    return this.assignmentService.findByQuiz(quiz.id);
  }
}
