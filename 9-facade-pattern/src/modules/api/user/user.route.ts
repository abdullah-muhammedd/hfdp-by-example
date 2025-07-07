import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();
const controller = new UserController();

router.post('/login', controller.login.bind(controller));

router.post('/logout', controller.logout.bind(controller));

router.post('/register', controller.register.bind(controller));

router.post('/update-profile', controller.updateProfile.bind(controller));

export default router;
