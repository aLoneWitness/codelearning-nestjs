import { Injectable } from '@nestjs/common';
import { CreateAssignmentInputInput } from './dto/create-assignment-input.input';
import { UpdateAssignmentInputInput } from './dto/update-assignment-input.input';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignmentInput } from './entities/assignment-input.entity';
import { Repository } from 'typeorm';
import { Assignment } from '../assignment/entities/assignment.entity';
import { UserInputError } from 'apollo-server-express';

@Injectable()
export class AssignmentInputService {
  constructor(
    @InjectRepository(AssignmentInput)
    private assignmentInputRepository: Repository<AssignmentInput>,
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
  ) {}

  async create(createAssignmentInputInput: CreateAssignmentInputInput) {
    const assignment = await this.assignmentRepository.findOne(
      createAssignmentInputInput.assignmentId,
    );

    if (assignment == null) {
      throw new UserInputError('Assignment ID not valid/found');
    }

    const assignmentInput = new AssignmentInput();
    assignmentInput.userRef = createAssignmentInputInput.userRef;
    assignmentInput.input = createAssignmentInputInput.input;
    assignmentInput.assignment = assignment;

    return this.assignmentInputRepository.save(assignmentInput);
  }

  findAll(userRef: string) {
    return this.assignmentInputRepository.find({ userRef: userRef });
  }

  findOne(userRef: string, assignmentId: string) {
    return this.assignmentInputRepository.findOne({
      userRef: userRef,
      assignment: {
        id: assignmentId,
      },
    });
  }

  async update(
    id: string,
    updateAssignmentInputInput: UpdateAssignmentInputInput,
  ) {
    const assignmentInput = await this.assignmentInputRepository.findOne(id);
    assignmentInput.input = updateAssignmentInputInput.input;
    await this.assignmentInputRepository.save(assignmentInput);
    return assignmentInput;
  }

  async remove(id: string) {
    const assignmentInput = await this.assignmentInputRepository.findOne(id);
    return this.assignmentInputRepository.remove(assignmentInput);
  }
}
