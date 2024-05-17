export interface SubmissionData {
  assignmentId: number;
  studentId: number;
  content: string;
}

export interface SubmissionUpdateData {
  content?: string;
}
