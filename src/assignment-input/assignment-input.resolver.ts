import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { AssignmentInputService } from './assignment-input.service';
import { AssignmentInput } from './entities/assignment-input.entity';
import { CreateAssignmentInputInput } from './dto/create-assignment-input.input';
import { UpdateAssignmentInputInput } from './dto/update-assignment-input.input';
import { PubSub } from 'graphql-subscriptions';
import { AssignmentInputResult } from './entities/assignment-input-result.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, from, map, of, switchMap, throwError } from 'rxjs';

@Resolver(() => AssignmentInput)
export class AssignmentInputResolver {
  private pubSub = new PubSub();

  constructor(
    private readonly assignmentInputService: AssignmentInputService,
    private httpService: HttpService,
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
  findOne(
    @Args('userRef', { type: () => String }) userRef: string,
    @Args('assignmentId', { type: () => String }) assignmentId: string,
  ) {
    return this.assignmentInputService.findOne(userRef, assignmentId);
  }

  @Query(() => AssignmentInputResult, { name: 'assignmentInputResult' })
  findOneResult(
    @Args('userRef', { type: () => String }) userRef: string,
    @Args('assignmentId', { type: () => String }) assignmentId: string,
  ) {
    const options = {
      headers: {
        'X-Access-Token': 'dispatchmalignant',
        'Content-Type': 'application/json',
      },
    };

    return from(this.assignmentInputService.findOne(userRef, assignmentId))
      .pipe(
        switchMap((assignmentInput: AssignmentInput) => {
          return this.httpService.post(
            'http://execute.vandinteren.me:8088/run',
            {
              image: 'glot/java:latest',
              payload: {
                language: 'java',
                files: [
                  {
                    name: 'Main.java',
                    content: assignmentInput.input,
                  },
                ],
              },
            },
            options,
          );
        }),
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(err);
        }),
      )
      .pipe(
        map((result) => {
          const assignmentInputResult = new AssignmentInputResult();
          assignmentInputResult.result = result.data.stdout;
          assignmentInputResult.errorCode = result.data.error;
          assignmentInputResult.errorMessage = result.data.stderr;
          return assignmentInputResult;
        }),
      );
  }

  @Mutation(() => AssignmentInput)
  async updateAssignmentInput(
    @Args('updateAssignmentInputInput')
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

  @Subscription(() => AssignmentInput)
  assignmentInputUpdated() {
    return this.pubSub.asyncIterator('assignmentInputUpdated');
  }
}
