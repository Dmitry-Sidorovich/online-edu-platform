import { Router, Request, Response } from 'express';
import { EnrollmentService } from '../../services/enrollmentsService/enrollments.service';
import { expressJoiMiddleware } from '../../middlewares/ExpressJoiMiddleware/express-joi.middleware';
import {
  enrollmentSchema,
  updateEnrollmentSchema,
} from './enrollments.controller.schemas';
import { roleMiddleware } from '../../middlewares/roleMiddleware';

const router = Router();
const enrollmentService: EnrollmentService = new EnrollmentService();

router.post(
  '/',
  roleMiddleware(['teacher']),
  expressJoiMiddleware.body(enrollmentSchema),
  async (req: Request, res: Response) => {
    try {
      const enrollment = await enrollmentService.enrollStudent(req.body);
      res.status(201).json(enrollment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

router.get(
  '/:studentId/:courseId',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { studentId, courseId } = req.params;
      const status = await enrollmentService.getEnrollmentStatus(
        parseInt(studentId),
        parseInt(courseId),
      );
      if (!status) {
        res.status(404).json({ message: 'Enrollment not found' });
      } else {
        res.json({ status: status });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

router.put(
  '/:studentId/:courseId',
  roleMiddleware(['teacher']),
  expressJoiMiddleware.body(updateEnrollmentSchema),
  async (req: Request, res: Response) => {
    try {
      const { studentId, courseId } = req.params;
      const updated = await enrollmentService.updateEnrollment(
        parseInt(studentId),
        parseInt(courseId),
        req.body,
      );
      if (updated) {
        res.json({ message: 'Enrollment updated successfully' });
      } else {
        res.status(404).json({ message: 'Enrollment not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

router.delete(
  '/:studentId/:courseId',
  roleMiddleware(['teacher']),
  async (req: Request, res: Response) => {
    try {
      const { studentId, courseId } = req.params;
      const deleted = await enrollmentService.deleteEnrollment(
        parseInt(studentId),
        parseInt(courseId),
      );
      if (deleted) {
        res.status(200).json({ message: 'Enrollment deleted successfully' });
      } else {
        res.status(404).json({ message: 'Enrollment not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

export { router as enrollmentsRouter };
