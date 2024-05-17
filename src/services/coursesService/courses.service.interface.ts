export interface CourseData {
  title: string;
  description: string;
  teacherId: number;
}

export interface UpdateCourseData {
  courseId: number;
  title?: string;
  description?: string;
}
