import { Request, Response } from 'express';
import { PaymentService } from './payment.service';

export class PaymentController {
  private paymentService = new PaymentService();

  async initiate(req: Request, res: Response) {
    const { userId, amount } = req.body;
    const result = await this.paymentService.initiatePayment(userId, amount);
    res.json(result);
  }

  async process(req: Request, res: Response) {
    const { userId, amount } = req.body;
    const result = await this.paymentService.processPayment(userId, amount);
    res.json(result);
  }

  async refund(req: Request, res: Response) {
    const { userId, amount } = req.body;
    const result = await this.paymentService.refundPayment(userId, amount);
    res.json(result);
  }
}
