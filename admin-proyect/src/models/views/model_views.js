import supabase from '../../lib/supabase';

export const ViewsModel = {
    async validateTable() {
        try {
            console.log('Validando estructura de la tabla columnas...');
            const { error } = await supabase.from('columnas').select('count');
            
            if (error) {
                console.error('Error al validar tabla:', error);
                return false;
            }
            return true;
        } catch (error) {
            console.error('Error en validateTable:', error);
            return false;
        }
    },

    async getColumns() {
        try {
            console.log('Iniciando getColumns...');
            
            // Validate table structure
            const isValid = await this.validateTable();
            if (!isValid) {
                console.log('La tabla no es válida, creando columnas por defecto...');
                return await this.initializeDefaultColumns();
            }

            // Get columns
            const { data, error } = await supabase
                .from('columnas')
                .select('*')
                .order('orden', { ascending: true });

            console.log('Respuesta de getColumns:', { data, error });
            
            if (error) {
                console.error('Error al obtener columnas:', error);
                throw error;
            }

            // Initialize if empty
            if (!data || data.length === 0) {
                console.log('No hay columnas, inicializando valores por defecto...');
                return await this.initializeDefaultColumns();
            }

            return data;
        } catch (error) {
            console.error('Error en getColumns:', error);
            throw new Error(`Error al obtener columnas: ${error.message}`);
        }
    },

    async initializeDefaultColumns() {
        try {
            console.log('Iniciando inicialización de columnas por defecto...');
            
            const defaultColumns = [
                { nombre: 'Por hacer', orden: 1 },
                { nombre: 'En progreso', orden: 2 },
                { nombre: 'En revisión', orden: 3 },
                { nombre: 'Completado', orden: 4 }
            ];

            console.log('Intentando insertar columnas:', defaultColumns);

            const { data, error } = await supabase
                .from('columnas')
                .insert(defaultColumns)
                .select();

            if (error) {
                console.error('Error al insertar columnas:', error);
                throw error;
            }

            console.log('Columnas inicializadas correctamente:', data);
            return data;
        } catch (error) {
            console.error('Error en initializeDefaultColumns:', error);
            throw new Error(`Error al inicializar columnas por defecto: ${error.message}`);
        }
    },

    async updateColumnOrder(columnId, newOrder) {
        try {
            const { data, error } = await supabase
                .from('columnas')
                .update({ orden: newOrder })
                .eq('id', columnId)
                .select();

            if (error) throw error;
            return data;
        } catch (error) {
            throw new Error(`Error al actualizar orden de columna: ${error.message}`);
        }
    },

    async createColumn(columnName) {
        try {
            console.log('Model: Creando nueva columna:', columnName);
            
            // Obtener el orden máximo actual
            const { data: columns, error: getError } = await supabase
                .from('columnas')
                .select('orden')
                .order('orden', { ascending: false })
                .limit(1);
            
            if (getError) throw getError;
            
            // Calcular el nuevo orden (máximo + 1 o 1 si no hay columnas)
            const newOrder = columns && columns.length > 0 ? columns[0].orden + 1 : 1;
            
            // Insertar la nueva columna
            const { data, error } = await supabase
                .from('columnas')
                .insert({ nombre: columnName, orden: newOrder })
                .select();
            
            if (error) throw error;
            
            console.log('Columna creada correctamente:', data);
            return data[0];
        } catch (error) {
            console.error('Error en createColumn:', error);
            throw new Error(`Error al crear nueva columna: ${error.message}`);
        }
    }
};
