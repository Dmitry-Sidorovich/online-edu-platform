import { Submissions } from '../../../models/submissions.model';
import {
  SubmissionData,
  SubmissionUpdateData,
} from '../submissions.service.interface';

export class SubmissionsRepository {
  public async createSubmission(data: SubmissionData): Promise<Submissions> {
    return Submissions.create(data);
  }

  public async getSubmissionById(id: number): Promise<Submissions | null> {
    return Submissions.findByPk(id);
  }

  public async updateSubmission(
    id: number,
    data: SubmissionUpdateData,
  ): Promise<[number, Submissions[]]> {
    return Submissions.update(data, { where: { id }, returning: true });
  }

  public async deleteSubmission(id: number): Promise<number> {
    return Submissions.destroy({ where: { id } });
  }
}
