import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const AreasModel = {
    // Obtener todas las áreas
    async getAreas() {
        try {
            const { data, error } = await supabase
                .from('areas')
                .select('*')
                .order('id', { ascending: true });
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error al obtener áreas:', error);
            throw error;
        }
    },

    // Crear nueva área
    async createArea(areaData) {
        try {
            const { data, error } = await supabase
                .from('areas')
                .insert([areaData])
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error al crear área:', error);
            throw error;
        }
    },

    // Actualizar área
    async updateArea(id, areaData) {
        try {
            const { data, error } = await supabase
                .from('areas')
                .update(areaData)
                .eq('id', id)
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error al actualizar área:', error);
            throw error;
        }
    },

    // Eliminar área
    async deleteArea(id) {
        try {
            const { error } = await supabase
                .from('areas')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error al eliminar área:', error);
            throw error;
        }
    },

    // Buscar áreas por nombre o jefe encargado
    async searchAreas(searchTerm) {
        try {
            const { data, error } = await supabase
                .from('areas')
                .select('*')
                .or(`nombre.ilike.%${searchTerm}%,jefe_encargado.ilike.%${searchTerm}%`)
                .order('id', { ascending: true });
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error al buscar áreas:', error);
            throw error;
        }
    }
};
