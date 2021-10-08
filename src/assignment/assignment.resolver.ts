import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AssignmentService } from './assignment.service';
import { Assignment } from './entities/assignment.entity';
import { CreateAssignmentInput } from './dto/create-assignment.input';
import { Quiz } from '../quiz/entities/quiz.entity';
import { UpdateAssignmentInput } from './dto/update-assignment.input';
import { QuizService } from '../quiz/quiz.service';

@Resolver(() => Assignment)
export class AssignmentResolver {
  constructor(
    private readonly assignmentService: AssignmentService,
    private readonly quizService: QuizService,
  ) {}

  @Mutation(() => Assignment)
  createAssignment(
    @Args('createAssignmentInput') createAssignmentInput: CreateAssignmentInput,
  ) {
    return this.assignmentService.create(createAssignmentInput);
  }

  @Query(() => [Assignment], { name: 'assignment' })
  findAll() {
    return this.assignmentService.findAll();
  }

  @Query(() => Assignment, { name: 'assignment' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.assignmentService.findOne(id);
  }

  @Mutation(() => Assignment)
  removeAssignment(@Args('id', { type: () => Int }) id: string) {
    return this.assignmentService.remove(id);
  }

  @Mutation(() => Quiz)
  updateQuiz(
    @Args('updateAssignmentInput') updateAssignmentInput: UpdateAssignmentInput,
  ) {
    return this.assignmentService.update(
      updateAssignmentInput.id,
      updateAssignmentInput,
    );
  }

  // @ResolveField()
  // async quiz(@Parent() assignment: Assignment) {
  //   return this.assignmentService.findOne()
  // }
}
