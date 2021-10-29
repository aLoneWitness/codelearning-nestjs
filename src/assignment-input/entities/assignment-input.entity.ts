import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Assignment } from '../../assignment/entities/assignment.entity';

@ObjectType()
@Entity()
export class AssignmentInput {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('text')
  input: string;

  @Field()
  @Column()
  userRef: string;

  @ManyToOne(() => Assignment)
  assignment: Assignment;
}
