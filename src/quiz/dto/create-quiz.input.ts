import { InputType, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateQuizInput {
  @Field({ description: 'Title/Name of the Quiz' })
  @Column()
  name: string;

  @Field({ description: 'Description of what the Quiz is for' })
  @Column()
  description: string;
}
