import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateQuizInput {
  @Field({ description: 'Title/Name of the Quiz' })
  name: string;

  @Field({ description: 'Description of what the Quiz is for' })
  description: string;
}
