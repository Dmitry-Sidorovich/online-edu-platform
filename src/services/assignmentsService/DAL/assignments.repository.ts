import { Assignments } from '../../../models/assignments.model';

export class AssignmentsRepository {
  public async createAssignment(assignmentData: any): Promise<Assignments> {
    return Assignments.create(assignmentData);
  }

  public async getAssignmentById(id: number): Promise<Assignments | null> {
    return Assignments.findByPk(id);
  }

  public async updateAssignment(
    id: number,
    assignmentData: any,
  ): Promise<[number, Assignments[]]> {
    return Assignments.update(assignmentData, {
      where: { id },
      returning: true,
    });
  }

  public async deleteAssignment(id: number): Promise<number> {
    return Assignments.destroy({
      where: { id },
    });
  }
}
