import { Lessons } from '../../../models/lessons.model';
import { LessonData } from '../lessons.service.interface';

export class LessonsRepository {
  public async createLesson(lessonData: LessonData): Promise<Lessons> {
    return Lessons.create(lessonData);
  }

  public async getLessonById(id: number): Promise<Lessons | null> {
    return Lessons.findByPk(id);
  }

  public async updateLesson(
    id: number,
    lessonData: LessonData,
  ): Promise<[number, Lessons[]]> {
    return Lessons.update(lessonData, { where: { id }, returning: true });
  }

  public async deleteLesson(id: number): Promise<number> {
    return Lessons.destroy({ where: { id } });
  }
}
