import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const loginUser = async (email, password_md5) => {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('password_md5', password_md5)
      .single();

    if (error || !data) {
      return {
        success: false,
        error: 'Credenciales inválidas'
      };
    }

    return {
      success: true,
      user: data,
      token: 'session-' + data.id
    };
  } catch (error) {
    console.error('Error de autenticación');
    return {
      success: false,
      error: 'Error en el servidor'
    };
  }
};
