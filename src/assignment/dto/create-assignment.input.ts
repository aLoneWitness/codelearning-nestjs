import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAssignmentInput {
  @Field({ description: 'Name of the Assignment' })
  name: string;

  @Field({ description: 'Position in which it is located in the Quiz' })
  position: number;

  @Field({ description: 'Description of the Assignment' })
  description: string;

  @Field({ description: 'Expected result of the assignment' })
  expectedResult: string;

  @Field({ description: 'Id of the Quiz it belongs to' })
  quizId: string;
}
