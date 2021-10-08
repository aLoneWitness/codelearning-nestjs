import { CreateQuizInput } from './create-quiz.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateQuizInput extends PartialType(CreateQuizInput) {
  @Field({ description: 'UUID of the Quiz' })
  id: string;

  @Field({ description: 'Title/Name of the Quiz' })
  name: string;

  @Field({ description: 'Description of what the Quiz is for' })
  description: string;
}
