import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Assignment } from '../../assignment/entities/assignment.entity';

@ObjectType()
@Entity()
export class Quiz {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ description: 'Title/Name of the Quiz' })
  @Column()
  name: string;

  @Field({ description: 'Description of what the Quiz is for' })
  @Column({ type: 'text' })
  description: string;

  @Field(() => [Assignment], {
    description: 'A set of assignments that is part of the Quiz',
  })
  @OneToMany(() => Assignment, (assignment) => assignment.quiz)
  assignments: Assignment[];
}
