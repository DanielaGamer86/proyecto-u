import { loginUser } from '../../models/login/model_login';
import md5 from 'md5';
import { setSupabaseToken } from '../../lib/supabase';

export const handleLogin = async (email, password) => {
  try {
    const password_md5 = md5(password);
    const response = await loginUser(email, password_md5);
    
    if (response.success) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Establecer el token para las solicitudes de Supabase
      setSupabaseToken(response.token);
      
      return { success: true };
    }
    
    return { success: false, error: response.error };
  } catch (error) {
    return { success: false, error: 'Error en la autenticación' };
  }
};
