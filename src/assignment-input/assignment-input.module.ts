import { Module } from '@nestjs/common';
import { AssignmentInputService } from './assignment-input.service';
import { AssignmentInputResolver } from './assignment-input.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from '../assignment/entities/assignment.entity';
import { AssignmentInput } from './entities/assignment-input.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assignment, AssignmentInput]),
    HttpModule,
  ],
  providers: [AssignmentInputResolver, AssignmentInputService],
})
export class AssignmentInputModule {}
