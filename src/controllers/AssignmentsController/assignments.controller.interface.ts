import { Request } from 'express';

export interface CreateAssignmentRequest extends Request {
  body: {
    title: string;
    description: string;
    teacherId: number;
  };
}

export interface UpdateAssignmentRequest extends Request {
  body: {
    title?: string;
    description?: string;
  };
  params: {
    id: string;
  };
}
