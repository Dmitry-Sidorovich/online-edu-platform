import { LessonsRepository } from './DAL/lessons.repository';
import { Lessons } from '../../models/lessons.model';
import { LessonData } from './lessons.service.interface';

export class LessonsService {
  private lessonRepository: LessonsRepository;

  constructor() {
    this.lessonRepository = new LessonsRepository();
  }

  public async createLesson(lessonData: LessonData): Promise<Lessons> {
    return this.lessonRepository.createLesson(lessonData);
  }

  public async getLessonById(id: number): Promise<Lessons | null> {
    return this.lessonRepository.getLessonById(id);
  }

  public async updateLesson(
    id: number,
    lessonData: LessonData,
  ): Promise<Lessons | null> {
    const [updateCount, [updatedLesson]] =
      await this.lessonRepository.updateLesson(id, lessonData);
    if (updateCount === 1) {
      return updatedLesson;
    }
    return null;
  }

  public async deleteLesson(id: number): Promise<boolean> {
    const deleteCount = await this.lessonRepository.deleteLesson(id);
    return deleteCount === 1;
  }
}
