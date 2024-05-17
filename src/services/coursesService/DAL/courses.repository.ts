import { Courses } from '../../../models/courses.model';
import { CourseData, UpdateCourseData } from '../courses.service.interface';

export class CourseRepository {
  public async createCourse(courseData: CourseData): Promise<Courses> {
    return Courses.create(courseData);
  }

  public async getCourseById(id: number): Promise<Courses | null> {
    return Courses.findByPk(id);
  }

  public async updateCourse(
    courseData: UpdateCourseData,
  ): Promise<[affectedCount: number]> {
    return Courses.update(courseData, {
      where: { id: courseData.courseId },
    });
  }

  public async deleteCourse(id: number): Promise<number> {
    return Courses.destroy({
      where: { id },
    });
  }
}
