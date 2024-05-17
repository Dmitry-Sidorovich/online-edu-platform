import { SubmissionsRepository } from './DAL/submissions.repository';
import { Submissions } from '../../models/submissions.model';
import {
  SubmissionData,
  SubmissionUpdateData,
} from './submissions.service.interface';

export class SubmissionsService {
  private repository = new SubmissionsRepository();

  public async createSubmission(data: SubmissionData): Promise<Submissions> {
    return this.repository.createSubmission(data);
  }

  public async getSubmissionById(id: number): Promise<Submissions | null> {
    return this.repository.getSubmissionById(id);
  }

  public async updateSubmission(
    id: number,
    data: SubmissionUpdateData,
  ): Promise<Submissions | null> {
    const [updated, submissions] = await this.repository.updateSubmission(
      id,
      data,
    );
    if (updated) return submissions[0];
    else return null;
  }

  public async deleteSubmission(id: number): Promise<boolean> {
    const deleted = await this.repository.deleteSubmission(id);
    return deleted === 1;
  }
}
