import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { AssignmentInputService } from './assignment-input.service';
import { AssignmentInput } from './entities/assignment-input.entity';
import { CreateAssignmentInputInput } from './dto/create-assignment-input.input';
import { UpdateAssignmentInputInput } from './dto/update-assignment-input.input';
import { PubSub } from 'graphql-subscriptions';

@Resolver(() => AssignmentInput)
export class AssignmentInputResolver {
  private pubSub = new PubSub();

  constructor(
    private readonly assignmentInputService: AssignmentInputService,
  ) {}

  @Mutation(() => AssignmentInput)
  createAssignmentInput(
    @Args('createAssignmentInputInput')
    createAssignmentInputInput: CreateAssignmentInputInput,
  ) {
    return this.assignmentInputService.create(createAssignmentInputInput);
  }

  @Query(() => [AssignmentInput], { name: 'assignmentInputs' })
  findAll(@Args('userRef', { type: () => String }) userRef: string) {
    return this.assignmentInputService.findAll(userRef);
  }

  @Query(() => AssignmentInput, { name: 'assignmentInput' })
  findOne(@Args('userRef', { type: () => String }) userRef: string, @Args('assignmentId', { type: () => String }) assignmentId: string) {
    return this.assignmentInputService.findOne(userRef, assignmentId);
  }

  @Mutation(() => AssignmentInput)
  async updateAssignmentInput(
    @Args('updateAssignmentInput')
    updateAssignmentInputInput: UpdateAssignmentInputInput,
  ) {
    const assignmentInput = this.assignmentInputService.update(
      updateAssignmentInputInput.id,
      updateAssignmentInputInput,
    );

    await this.pubSub.publish('assignmentInputUpdated', {
      assignmentInputUpdated: assignmentInput,
    });

    return assignmentInput;
  }

  @Mutation(() => AssignmentInput)
  removeAssignmentInput(@Args('id', { type: () => String }) id: string) {
    return this.assignmentInputService.remove(id);
  }

  @Subscription((returns) => AssignmentInput)
  assignmentInputUpdated() {
    return this.pubSub.asyncIterator('assignmentInputUpdated');
  }
}
