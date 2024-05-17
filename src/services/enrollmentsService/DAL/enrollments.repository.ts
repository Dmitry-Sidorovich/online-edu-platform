import { Enrollments } from '../../../models/enrollments.model';
import { EnrollmentData } from '../enrollments.service.interface';

export class EnrollmentRepository {
  public async createEnrollment(
    enrollmentData: EnrollmentData,
  ): Promise<Enrollments> {
    return Enrollments.create(enrollmentData);
  }

  public async findEnrollment(
    studentId: number,
    courseId: number,
  ): Promise<Enrollments | null> {
    return Enrollments.findOne({ where: { studentId, courseId } });
  }

  public async updateEnrollment(
    studentId: number,
    courseId: number,
    data: Partial<EnrollmentData>,
  ): Promise<boolean> {
    const [affectedCount] = await Enrollments.update(data, {
      where: { studentId, courseId },
    });
    return affectedCount > 0;
  }

  public async deleteEnrollment(
    studentId: number,
    courseId: number,
  ): Promise<boolean> {
    const affectedCount = await Enrollments.destroy({
      where: { studentId, courseId },
    });
    return affectedCount > 0;
  }
}
