import express, { Request, Response, NextFunction } from 'express';
import { query } from '../lib/db.js';
import { mapDbEventToEvent } from '../lib/events.js';

export const router = express.Router();

export async function index(req: Request, res: Response) {
  return res.json([
    {
      href: '/departments',
      methods: ['GET', 'POST'],
    },
    {
      href: '/departments/:slug',
      methods: ['GET', 'PATCH', 'DELETE'],
    },
    {
      href: '/departments/:slug/courses',
      methods: ['GET', 'POST'],
    },
    {
      href: '/departments/:slug/courses/:courseId',
      methods: ['GET', 'PATCH', 'DELETE'],
    },
  ]);
}



export async function event(req: Request, res: Response, next: NextFunction) {
  const { slug } = req.params;
  const eventsResult = await query('SELECT * FROM events WHERE slug = $1;', [slug]); 

  const events = mapDbEventToEvent(eventsResult);
  
  if(!event) {
    return next()
  }

  res.json(events);
}


router.get('/', index);
router.get('/departments', listDepartments);
router.post('/departments', createDepartment);
router.get('/departments/:slug', getDepartment);
router.patch('/department/:slug', updateDepartment);
router.delete('/departments/:slug', deleteDepartment);

router.get('/departments/:slug/courses', listCourses);
router.post('/departments/:slug/courses', createCourse);
router.get('/departments/:slug/courses/coursesId', getCourse);
router.patch('/department/:slug/courses/coursesId', updateCourse);
router.delete('/departments/:slug/courses/coursesId', deleteCourse);