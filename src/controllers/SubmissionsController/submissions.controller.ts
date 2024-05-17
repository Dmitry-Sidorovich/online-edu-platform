import { Router, Request, Response } from 'express';
import { SubmissionsService } from '../../services/submissionsService/submissions.service';
import { roleMiddleware } from '../../middlewares/roleMiddleware';
import {
  createSubmissionSchema,
  updateSubmissionSchema,
} from './submissions.controller.schemas';
import { expressJoiMiddleware } from '../../middlewares/ExpressJoiMiddleware/express-joi.middleware';

const router = Router();
const submissionsService = new SubmissionsService();

router.post(
  '/',
  expressJoiMiddleware.body(createSubmissionSchema),
  async (req: Request, res: Response) => {
    try {
      const submission = await submissionsService.createSubmission(req.body);
      res.status(201).json(submission);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const submission = await submissionsService.getSubmissionById(id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    return res.json(submission);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.put(
  '/:id',
  expressJoiMiddleware.body(updateSubmissionSchema),
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedSubmission = await submissionsService.updateSubmission(
        id,
        req.body,
      );
      if (!updatedSubmission) {
        return res.status(404).json({ message: 'Submission not found' });
      }
      return res.json(updatedSubmission);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
);

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await submissionsService.deleteSubmission(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    return res.status(200).json({ message: 'Submission deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export { router as submissionsRouter };
