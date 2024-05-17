import { Request } from 'express';

export interface CreateCourseRequest extends Request {
  body: {
    title: string;
    description: string;
    teacherId: number;
  };
}

export interface UpdateCourseRequest extends Request {
  params: {
    id: string;
  };
  body: {
    title?: string;
    description?: string;
  };
}
