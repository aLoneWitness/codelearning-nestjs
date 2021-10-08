import { CreateAssignmentInput } from './create-assignment.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAssignmentInput extends PartialType(CreateAssignmentInput) {
  @Field({ description: 'UUID of the Assignment' })
  id: string;

  @Field({ description: 'Name of the Assignment' })
  name: string;

  @Field({ description: 'Description of the Assignment' })
  description: string;

  @Field({ description: 'Expected result of the assignment' })
  expectedResult: string;
}
