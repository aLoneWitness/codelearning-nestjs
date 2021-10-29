import { CreateAssignmentInputInput } from './create-assignment-input.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAssignmentInputInput extends PartialType(
  CreateAssignmentInputInput,
) {
  @Field()
  id: string;

  @Field()
  input: string;
}
