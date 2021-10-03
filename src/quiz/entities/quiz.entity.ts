import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column()
  description: string;
}
