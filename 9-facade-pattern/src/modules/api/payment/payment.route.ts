import { Router } from 'express';
import { PaymentController } from './payment.controller';

const router = Router();
const controller = new PaymentController();

router.post('/initiate', controller.initiate.bind(controller));

router.post('/process', controller.process.bind(controller));

router.post('/refund', controller.refund.bind(controller));

export default router;
