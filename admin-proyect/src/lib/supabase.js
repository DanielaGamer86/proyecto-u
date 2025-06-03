import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Faltan variables de entorno de Supabase');
    console.log('URL:', supabaseUrl ? 'Configurado' : 'Falta');
    console.log('Key:', supabaseKey ? 'Configurado' : 'Falta');
    throw new Error('Faltan variables de entorno de Supabase');
}

console.log('Inicializando cliente Supabase con URL:', supabaseUrl.substring(0, 8) + '...');

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true
    }
});

// Función para establecer el token de autenticación
export const setSupabaseToken = (token) => {
    if (token) {
        // Establecer el token de autenticación para las solicitudes
        // Usar el método correcto según la versión de Supabase
        if (typeof supabase.auth.setSession === 'function') {
            // Para versiones más recientes de Supabase
            supabase.auth.setSession({
                access_token: token,
                refresh_token: ''
            });
        } else if (typeof supabase.auth.setAuth === 'function') {
            // Para versiones anteriores de Supabase
            supabase.auth.setAuth(token);
        } else {
            // Alternativa si los métodos anteriores no están disponibles
            // Establecer el token en los headers de las solicitudes
            supabase.supabaseClient?.headers?.set('Authorization', `Bearer ${token}`);
        }
        console.log('Token de autenticación establecido');
    }
};

// Verificar la conexión
const verifyConnection = async () => {
    try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        console.log('Conexión a Supabase establecida correctamente');
        return true;
    } catch (error) {
        console.error('Error al verificar la conexión con Supabase:', error.message);
        return false;
    }
};

verifyConnection();

export default supabase;
