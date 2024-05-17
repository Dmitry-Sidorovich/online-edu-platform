import { AssignmentsRepository } from './DAL/assignments.repository';
import { Assignments } from '../../models/assignments.model';

export class AssignmentsService {
  private repository = new AssignmentsRepository();

  public async createAssignment(assignmentData: any): Promise<Assignments> {
    return this.repository.createAssignment(assignmentData);
  }

  public async getAssignmentById(id: number): Promise<Assignments | null> {
    return this.repository.getAssignmentById(id);
  }

  public async updateAssignment(
    id: number,
    assignmentData: any,
  ): Promise<[number, Assignments[]]> {
    return this.repository.updateAssignment(id, assignmentData);
  }

  public async deleteAssignment(id: number): Promise<boolean> {
    const deleted = await this.repository.deleteAssignment(id);
    return deleted === 1;
  }
}
