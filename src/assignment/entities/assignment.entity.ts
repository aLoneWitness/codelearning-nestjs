import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Quiz } from '../../quiz/entities/quiz.entity';

@ObjectType()
@Entity()
export class Assignment {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ description: 'Position in which it is located in the Quiz' })
  @Column()
  position: number;

  @Field({ description: 'Name of the Assignment' })
  @Column()
  name: string;

  @Field({ description: 'Description of the Assignment' })
  @Column()
  description: string;

  @Field({ description: 'Expected result of the assignment' })
  @Column()
  expectedResult: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.assignments)
  quiz: Quiz;
}
