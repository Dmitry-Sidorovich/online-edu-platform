import { CourseRepository } from './DAL/courses.repository';
import { Courses } from '../../models/courses.model';
import { CourseData, UpdateCourseData } from './courses.service.interface';

export class CoursesService {
  private courseRepository: CourseRepository;

  constructor() {
    this.courseRepository = new CourseRepository();
  }

  public async createCourse(courseData: CourseData): Promise<Courses> {
    return this.courseRepository.createCourse(courseData);
  }

  public async getCourseById(id: number): Promise<Courses | null> {
    return this.courseRepository.getCourseById(id);
  }

  public async updateCourse(
    courseData: UpdateCourseData,
  ): Promise<[affectedCount: number]> {
    return this.courseRepository.updateCourse(courseData);
  }

  public async deleteCourse(id: number): Promise<number> {
    return this.courseRepository.deleteCourse(id);
  }

  public async getAllCourses(): Promise<Courses[]> {
    // Предполагается, что здесь используется ORM или прямой запрос к базе данных
    return await Courses.findAll();
  }
}
