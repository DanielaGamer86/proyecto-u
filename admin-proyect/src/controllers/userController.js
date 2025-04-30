import { userService } from '../services/userService';

export class UserController {
  async handleLogin(email, password) {
    try {
      const user = await userService.login(email, password);
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async handleRegister(userData) {
    try {
      const user = await userService.register(userData);
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async handlePlanUpdate(userId, plan) {
    try {
      const updatedUser = await userService.updateUserPlan(userId, plan);
      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export const userController = new UserController();
