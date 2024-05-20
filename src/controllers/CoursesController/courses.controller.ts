import * as express from 'express';
import { Request, Response } from 'express';
import { CoursesService } from '../../services/coursesService/courses.service';
import {
  createCourseSchema,
  updateCourseSchema,
} from './courses.controller.schemas';
import { expressJoiMiddleware } from '../../middlewares/ExpressJoiMiddleware/express-joi.middleware';
import {
  CreateCourseRequest,
  UpdateCourseRequest,
} from './courses.controller.interface';
import { roleMiddleware } from '../../middlewares/roleMiddleware';

const router = express.Router();
const courseService = new CoursesService();

router.post(
  '/',
  roleMiddleware(['admin', 'teacher']),
  expressJoiMiddleware.body(createCourseSchema),
  async (req: CreateCourseRequest, res: Response): Promise<void> => {
    try {
      const course = await courseService.createCourse(req.body);
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const course = await courseService.getCourseById(parseInt(id));
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put(
  '/:id',
  expressJoiMiddleware.body(updateCourseSchema),
  roleMiddleware(['admin', 'teacher']),
  async (req: UpdateCourseRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const [updated] = await courseService.updateCourse({
        ...req.body,
        courseId: parseInt(id),
      });
      if (!updated) {
        res.status(404).json({ message: 'Course not found' });
        return;
      }
      res.json({ message: 'Course updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

router.delete(
  '/:id',
  roleMiddleware(['admin', 'teacher']),
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const deleted = await courseService.deleteCourse(parseInt(id));
      if (!deleted) {
        res.status(404).json({ message: 'Course not found' });
        return;
      }
      res.json({ message: 'Course deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).send('Error fetching courses: ' + error.message);
  }
});

export { router as coursesRouter };
