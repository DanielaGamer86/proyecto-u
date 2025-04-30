import { User } from '../models/userModel';

export class UserService {
  async login(email, password) {
    // Aquí iría la lógica de autenticación
    return new User({ email });
  }

  async register(userData) {
    // Aquí iría la lógica de registro
    return new User(userData);
  }

  async updateUserPlan(userId, plan) {
    // Aquí iría la lógica de actualización de plan
    return new User({ id: userId, plan });
  }
}

export const userService = new UserService();
