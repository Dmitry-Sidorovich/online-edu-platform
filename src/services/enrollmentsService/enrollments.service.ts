import { EnrollmentData } from './enrollments.service.interface';
import { Enrollments } from '../../models/enrollments.model';
import { EnrollmentRepository } from './DAL/enrollments.repository';

export class EnrollmentService {
  private enrollmentRepository = new EnrollmentRepository();

  public async enrollStudent(
    enrollmentData: EnrollmentData,
  ): Promise<Enrollments> {
    return this.enrollmentRepository.createEnrollment(enrollmentData);
  }

  public async getEnrollmentStatus(
    studentId: number,
    courseId: number,
  ): Promise<string | null> {
    const enrollment = await this.enrollmentRepository.findEnrollment(
      studentId,
      courseId,
    );
    return enrollment ? enrollment.status : null;
  }

  public async updateEnrollment(
    studentId: number,
    courseId: number,
    data: Partial<EnrollmentData>,
  ): Promise<boolean> {
    return this.enrollmentRepository.updateEnrollment(
      studentId,
      courseId,
      data,
    );
  }

  public async deleteEnrollment(
    studentId: number,
    courseId: number,
  ): Promise<boolean> {
    return this.enrollmentRepository.deleteEnrollment(studentId, courseId);
  }
}
