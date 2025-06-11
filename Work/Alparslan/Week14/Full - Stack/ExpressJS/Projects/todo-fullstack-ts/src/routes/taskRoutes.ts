import { Router } from 'express';
import * as taskController from '../controllers/taskController';

const router = Router();

router.get('/', taskController.showCreate);
router.post('/add', taskController.create);
router.get('/tasks', taskController.list);
router.get('/tasks/edit/:id', taskController.showEdit);
router.post('/tasks/edit/:id', taskController.update);
router.post('/tasks/delete/:id', taskController.remove);

export default router;