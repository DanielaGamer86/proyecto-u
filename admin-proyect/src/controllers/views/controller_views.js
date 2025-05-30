import { ViewsModel } from '../../models/views/model_views';

export const ViewsController = {
    async getColumns() {
        try {
            console.log('Controller: Solicitando columnas...');
            const columns = await ViewsModel.getColumns();
            console.log('Controller: Columnas recibidas:', columns);

            // If no columns exist, initialize default ones
            if (!columns || columns.length === 0) {
                console.log('No se encontraron columnas, inicializando columnas por defecto...');
                await ViewsModel.initializeDefaultColumns();
                // Get the columns again after initialization
                return await this.getColumns();
            }

            return {
                success: true,
                data: columns
            };
        } catch (error) {
            console.error('Error en controlador de vistas:', error);
            return {
                success: false,
                error: error.message
            };
        }
    },

    async updateColumnOrder(columnId, newOrder) {
        try {
            await ViewsModel.updateColumnOrder(columnId, newOrder);
            return {
                success: true
            };
        } catch (error) {
            console.error('Error al actualizar orden:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
};
