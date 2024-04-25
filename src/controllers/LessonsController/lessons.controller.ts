import express from 'express';
import { LessonsService } from '../../services/lessonsService/lessons.service';
import { roleMiddleware } from '../../middlewares/roleMiddleware';
import { expressJoiMiddleware } from '../../middlewares/ExpressJoiMiddleware/express-joi.middleware';
import {
  createLessonSchema,
  updateLessonSchema,
} from './lessons.controller.schemas';

const router = express.Router();
const lessonsService = new LessonsService();

router.post(
  '/',
  expressJoiMiddleware.body(createLessonSchema),
  roleMiddleware(['admin', 'teacher']),
  async (req, res) => {
    try {
      const lesson = await lessonsService.createLesson(req.body);
      res.status(201).json(lesson);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

router.get('/:id', async (req, res) => {
  try {
    const lesson = await lessonsService.getLessonById(parseInt(req.params.id));
    if (lesson) {
      res.json(lesson);
    } else {
      res.status(404).json({ message: 'Lesson not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put(
  '/:id',
  expressJoiMiddleware.body(updateLessonSchema),
  roleMiddleware(['admin', 'teacher']),
  async (req, res) => {
    try {
      const updatedLesson = await lessonsService.updateLesson(
        parseInt(req.params.id),
        req.body,
      );
      if (updatedLesson) {
        res.json(updatedLesson);
      } else {
        res.status(404).json({ message: 'Lesson not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

router.delete(
  '/:id',
  roleMiddleware(['admin', 'teacher']),
  async (req, res) => {
    try {
      const isSuccess = await lessonsService.deleteLesson(
        parseInt(req.params.id),
      );
      if (isSuccess) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Lesson not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

export { router as lessonsRouter };
