import { Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController {
  private userService = new UserService();

  async login(req: Request, res: Response) {
    const { userId } = req.body;
    const result = await this.userService.login(userId);
    res.json(result);
  }

  async logout(req: Request, res: Response) {
    const { userId } = req.body;
    const result = await this.userService.logout(userId);
    res.json(result);
  }

  async register(req: Request, res: Response) {
    const { email } = req.body;
    const result = await this.userService.register(email);
    res.json(result);
  }

  async updateProfile(req: Request, res: Response) {
    const { userId, changes } = req.body;
    const result = await this.userService.updateProfile(userId, changes);
    res.json(result);
  }
}
