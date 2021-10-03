import { CreateQuizInput } from './create-quiz.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class UpdateQuizInput extends PartialType(CreateQuizInput) {
  @Field({ description: 'UUID of the Quiz' })
  id: string;

  @Field({ description: 'Title/Name of the Quiz' })
  @Column()
  name: string;

  @Field({ description: 'Description of what the Quiz is for' })
  @Column()
  description: string;
}
