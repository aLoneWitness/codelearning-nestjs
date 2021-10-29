import { InputType, Int, Field } from '@nestjs/graphql';
import { Assignment } from '../../assignment/entities/assignment.entity';

@InputType()
export class CreateAssignmentInputInput {
  @Field()
  input: string;

  @Field()
  userRef: string;

  @Field()
  assignmentId: string;
}
