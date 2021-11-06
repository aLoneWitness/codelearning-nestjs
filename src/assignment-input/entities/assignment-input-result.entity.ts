import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AssignmentInputResult {
  @Field()
  result: string;

  @Field()
  errorCode: string;

  @Field()
  errorMessage: string;
}
