import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const CardsModel = {
    // Obtener todas las tarjetas
    async getCards() {
        try {
            const { data, error } = await supabase
                .from('cards')
                .select('*')
                .order('id', { ascending: true });
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error al obtener tarjetas:', error);
            throw error;
        }
    },
    // Crear nueva tarjeta
    async createCard(cardData) {
        try {
            const { data, error } = await supabase
                .from('cards')
                .insert([cardData])
                .select()
                .single();
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error al crear tarjeta:', error);
            throw error;
        }
    },
    // Actualizar tarjeta
    async updateCard(id, cardData) {
        try {
            const { data, error } = await supabase
                .from('cards')
                .update(cardData)
                .eq('id', id)
                .select()
                .single();
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error al actualizar tarjeta:', error);
            throw error;
        }
    },
    // Eliminar tarjeta
    async deleteCard(id) {
        try {
            const { error } = await supabase
                .from('cards')
                .delete()
                .eq('id', id);
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error al eliminar tarjeta:', error);
            throw error;
        }
    },
    // Buscar tarjetas por título o descripción
    async searchCards(searchTerm) {
        try {
            const { data, error } = await supabase
                .from('cards')
                .select('*')
                .or(`titulo.ilike.%${searchTerm}%,descripcion.ilike.%${searchTerm}%`)
                .order('id', { ascending: true });
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error al buscar tarjetas:', error);
            throw error;
        }
    }
};