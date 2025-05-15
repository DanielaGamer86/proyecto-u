import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const userModel = {
    async getAllUsers() {
        const { data, error } = await supabase
            .from('usuarios')
            .select('email, nombre, telefono');
        
        if (error) {
            throw new Error('Error fetching users');
        }
        
        return data || [];
    },

    async checkExistingUser({ nombre, email, telefono }) {
        // First check for email
        const { data: emailCheck } = await supabase
            .from('usuarios')
            .select('email')
            .eq('email', email.toLowerCase())
            .single();

        if (emailCheck) {
            throw new Error('Email already registered');
        }

        // Check for phone
        const { data: phoneCheck } = await supabase
            .from('usuarios')
            .select('telefono')
            .eq('telefono', telefono)
            .single();

        if (phoneCheck) {
            throw new Error('Phone number already registered');
        }

        // Check for name
        const { data: nameCheck } = await supabase
            .from('usuarios')
            .select('nombre')
            .eq('nombre', nombre.toLowerCase())
            .single();

        if (nameCheck) {
            throw new Error('Name already registered');
        }

        return null;
    },

    async createUser({ nombre, email, telefono, password_md5 }) {
        try {
            // Sanitize inputs first
            const sanitizedData = {
                nombre: nombre.trim(),
                email: email.toLowerCase().trim(),
                telefono: telefono.trim(),
                password_md5,
                roles: { roles: ["sin_rol"] }
            };

            // Check for duplicates
            await this.checkExistingUser(sanitizedData);

            // If we get here, no duplicates were found
            const { data, error } = await supabase
                .from('usuarios')
                .insert(sanitizedData)
                .select('id, nombre, email, telefono, roles')
                .single();

            if (error) {
                throw new Error('Error creating user: ' + error.message);
            }

            return data;
        } catch (error) {
            console.error('Create user error:', error);
            throw error;
        }
    }
};

export default userModel;