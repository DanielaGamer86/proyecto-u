import { AreasModel } from '../../models/areas/model_areas.js';

export const AreasController = {
    // Obtener todas las áreas
    async getAreas() {
        try {
            console.log('Controller: Solicitando áreas...');
            const areas = await AreasModel.getAreas();
            console.log('Controller: Áreas recibidas:', areas);
            
            return {
                success: true,
                data: areas
            };
        } catch (error) {
            console.error('Error en controlador de áreas:', error);
            return {
                success: false,
                error: error.message
            };
        }
    },

    // Crear nueva área
    async createArea(areaData) {
        try {
            console.log('Controller: Creando nueva área:', areaData);
            const newArea = await AreasModel.createArea(areaData);
            return {
                success: true,
                data: newArea
            };
        } catch (error) {
            console.error('Error al crear área:', error);
            return {
                success: false,
                error: error.message
            };
        }
    },

    // Actualizar área
    async updateArea(id, areaData) {
        try {
            console.log('Controller: Actualizando área:', id, areaData);
            const updatedArea = await AreasModel.updateArea(id, areaData);
            return {
                success: true,
                data: updatedArea
            };
        } catch (error) {
            console.error('Error al actualizar área:', error);
            return {
                success: false,
                error: error.message
            };
        }
    },

    // Eliminar área
    async deleteArea(id) {
        try {
            console.log('Controller: Eliminando área:', id);
            await AreasModel.deleteArea(id);
            return {
                success: true
            };
        } catch (error) {
            console.error('Error al eliminar área:', error);
            return {
                success: false,
                error: error.message
            };
        }
    },

    // Buscar áreas
    async searchAreas(searchTerm) {
        try {
            console.log('Controller: Buscando áreas:', searchTerm);
            const areas = await AreasModel.searchAreas(searchTerm);
            return {
                success: true,
                data: areas
            };
        } catch (error) {
            console.error('Error al buscar áreas:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
};

// Mantener compatibilidad con la función anterior
export const handleAreas = async (id_usuario) => {
    return await AreasController.getAreas();
};