import { Router, Request, Response } from 'express';
import { AssignmentsService } from '../../services/assignmentsService/assignments.service';
import { roleMiddleware } from '../../middlewares/roleMiddleware';
import {
  createAssignmentSchema,
  idParamSchema,
  updateAssignmentSchema,
} from './assignments.controller.schemas';
import { expressJoiMiddleware } from '../../middlewares/ExpressJoiMiddleware/express-joi.middleware';
import {
  CreateAssignmentRequest,
  UpdateAssignmentRequest,
} from './assignments.controller.interface';

const assignmentService = new AssignmentsService();
const router = Router();

router.post(
  '/',
  expressJoiMiddleware.body(createAssignmentSchema),
  roleMiddleware(['admin', 'teacher']),
  async (req: CreateAssignmentRequest, res: Response) => {
    try {
      const assignment = await assignmentService.createAssignment(req.body);
      res.status(201).json(assignment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

router.get(
  '/:id',
  expressJoiMiddleware.params(idParamSchema),
  async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    try {
      const assignment = await assignmentService.getAssignmentById(id);
      if (!assignment) {
        return res.status(404).json({ message: 'Assignment not found' });
      }
      return res.json(assignment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
);

router.put(
  '/:id',
  expressJoiMiddleware.body(updateAssignmentSchema),
  roleMiddleware(['admin', 'teacher']),
  async (req: UpdateAssignmentRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const [updated] = await assignmentService.updateAssignment(id, req.body);
      if (updated) {
        const updatedAssignment = await assignmentService.getAssignmentById(id);
        res.json(updatedAssignment);
      } else {
        res.status(404).json({ message: 'Assignment not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

router.delete(
  '/:id',
  roleMiddleware(['admin', 'teacher']),
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await assignmentService.deleteAssignment(id);
      if (deleted) {
        res.status(200).json({ message: 'Assignment deleted successfully' });
      } else {
        res.status(404).json({ message: 'Assignment not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

export { router as assignmentsRouter };
