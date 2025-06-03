# Documentación del Módulo de Vistas

Este módulo gestiona las columnas del tablero Kanban en la aplicación. A continuación se detalla la estructura y funcionamiento de cada componente.

## Estructura del Módulo

El módulo de vistas sigue el patrón MVC (Modelo-Vista-Controlador):

```
├── controllers/
│   └── views/
│       └── controller_views.js
├── models/
│   └── views/
│       └── model_views.js
└── lib/
    └── supabase.js
```

## Modelo (Model)

### `model_views.js`

Maneja la lógica de negocio y la interacción con la base de datos Supabase.

#### Funciones principales:

- **validateTable()**: Verifica que la tabla 'columnas' exista y tenga la estructura correcta.
  ```javascript
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
  }
  ```

- **getColumns()**: Obtiene todas las columnas ordenadas por el campo 'orden'.
  ```javascript
  async getColumns() {
      try {
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
          
          if (error) throw error;

          // Initialize if empty
          if (!data || data.length === 0) {
              console.log('No hay columnas, inicializando valores por defecto...');
              return await this.initializeDefaultColumns();
          }

          return data;
      } catch (error) {
          throw new Error(`Error al obtener columnas: ${error.message}`);
      }
  }
  ```

- **initializeDefaultColumns()**: Crea columnas predeterminadas cuando no existen en la base de datos.
  ```javascript
  async initializeDefaultColumns() {
      try {
          const defaultColumns = [
              { nombre: 'Por hacer', orden: 1 },
              { nombre: 'En progreso', orden: 2 },
              { nombre: 'En revisión', orden: 3 },
              { nombre: 'Completado', orden: 4 }
          ];

          const { data, error } = await supabase
              .from('columnas')
              .insert(defaultColumns)
              .select();

          if (error) throw error;
          return data;
      } catch (error) {
          throw new Error(`Error al inicializar columnas por defecto: ${error.message}`);
      }
  }
  ```

- **updateColumnOrder()**: Actualiza el orden de una columna específica.
  ```javascript
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
  }
  ```

## Controlador (Controller)

### `controller_views.js`

Actúa como intermediario entre la vista y el modelo, procesando las solicitudes del usuario.

#### Funciones principales:

- **getColumns()**: Solicita las columnas al modelo y maneja la inicialización de columnas predeterminadas si es necesario.
  ```javascript
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
  }
  ```

- **updateColumnOrder()**: Envía la solicitud de actualización de orden al modelo y maneja posibles errores.
  ```javascript
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
  ```

## Integración con Supabase

### `supabase.js`

Configura la conexión con Supabase y proporciona funciones para la autenticación.

#### Configuración inicial:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true
    }
});
```

#### Funciones principales:

- **setSupabaseToken()**: Establece el token de autenticación para las solicitudes a Supabase, compatible con diferentes versiones de la API.
  ```javascript
  export const setSupabaseToken = (token) => {
      if (token) {
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
              supabase.supabaseClient?.headers?.set('Authorization', `Bearer ${token}`);
          }
          console.log('Token de autenticación establecido');
      }
  };
  ```

## Estructura de la Base de Datos

### Tabla 'columnas'

La tabla 'columnas' en Supabase tiene la siguiente estructura:

| Campo  | Tipo    | Descripción                                |
|--------|---------|--------------------------------------------|
| id     | integer | Identificador único (clave primaria)       |
| nombre | text    | Nombre de la columna                       |
| orden  | integer | Posición de la columna en el tablero       |

## Flujo de Datos

1. El usuario interactúa con la interfaz (vista)
2. La vista llama a métodos del controlador (`controller_views.js`)
3. El controlador procesa la solicitud y llama a métodos del modelo (`model_views.js`)
4. El modelo interactúa con Supabase usando la configuración de `supabase.js`
5. Los datos fluyen de vuelta siguiendo la misma ruta en sentido inverso

### Diagrama de Secuencia

```
┌─────────┐          ┌─────────────┐          ┌────────────┐          ┌──────────┐
│  Vista  │          │ Controlador │          │   Modelo   │          │ Supabase │
└────┬────┘          └──────┬──────┘          └─────┬──────┘          └────┬─────┘
     │                      │                       │                      │
     │ solicita columnas    │                       │                      │
     │─────────────────────>│                       │                      │
     │                      │ getColumns()          │                      │
     │                      │──────────────────────>│                      │
     │                      │                       │ validateTable()      │
     │                      │                       │─────────────────────>│
     │                      │                       │<─────────────────────│
     │                      │                       │                      │
     │                      │                       │ select * from columnas
     │                      │                       │─────────────────────>│
     │                      │                       │<─────────────────────│
     │                      │<──────────────────────│                      │
     │<─────────────────────│                       │                      │
     │                      │                       │                      │
```

## Políticas de Seguridad

La tabla 'columnas' en Supabase tiene configuradas políticas de seguridad a nivel de fila (RLS) que requieren autenticación para realizar operaciones. Para cumplir con estas políticas:

1. El token de autenticación se establece en el cliente Supabase después del inicio de sesión
   ```javascript
   // En controller_login.js
   if (response.success) {
     localStorage.setItem('token', response.token);
     localStorage.setItem('user', JSON.stringify(response.user));
     
     // Establecer el token para las solicitudes de Supabase
     setSupabaseToken(response.token);
     
     return { success: true };
   }
   ```

2. El componente `ProtectedRoute` asegura que el token se establezca al cargar componentes protegidos
   ```javascript
   // En ProtectedRoute.jsx
   useEffect(() => {
     // Establecer el token de Supabase si existe
     if (token) {
       setSupabaseToken(token);
     }
   }, [token]);
   ```

3. Todas las operaciones en la tabla 'columnas' se realizan con el usuario autenticado

### Configuración de RLS en Supabase

Para configurar correctamente las políticas RLS en Supabase, se recomienda:

1. Habilitar RLS en la tabla 'columnas'
2. Crear una política que permita operaciones SELECT, INSERT, UPDATE y DELETE solo a usuarios autenticados
3. Ejemplo de política SQL:
   ```sql
   CREATE POLICY "Usuarios autenticados pueden gestionar columnas" 
   ON "public"."columnas"
   FOR ALL
   TO authenticated
   USING (true);
   ```

## Solución de Problemas Comunes

### Error: "new row violates row-level security policy for table 'columnas'"

Este error ocurre cuando se intenta insertar o actualizar datos sin la autenticación adecuada. Soluciones:

1. Verificar que el usuario haya iniciado sesión correctamente
   - Comprobar que exista un token en localStorage
   - Verificar que el token sea válido

2. Comprobar que `setSupabaseToken()` se llame después del inicio de sesión
   - Revisar el flujo de autenticación en `controller_login.js`
   - Asegurarse de que se llame a `setSupabaseToken(token)` después de guardar el token en localStorage

3. Revisar las políticas RLS en el panel de administración de Supabase
   - Verificar que las políticas estén correctamente configuradas
   - Comprobar que la política permita las operaciones necesarias (SELECT, INSERT, UPDATE, DELETE)

4. Verificar la estructura de la tabla 'columnas'
   - Comprobar que la tabla tenga los campos esperados (id, nombre, orden)
   - Verificar que no haya restricciones adicionales que puedan causar el error

### Error: "Could not find the 'usuario_id' column of 'columnas' in the schema cache"

Este error puede ocurrir si se intenta acceder a una columna que no existe en la tabla. Soluciones:

1. Verificar la estructura de la tabla 'columnas' en Supabase
2. Actualizar el código para que coincida con la estructura real de la tabla
3. Si se requiere asociar columnas con usuarios, considerar añadir un campo 'usuario_id' a la tabla

## Recomendaciones para el Desarrollo

1. **Manejo de errores**: Implementar un sistema robusto de manejo de errores con mensajes claros para facilitar la depuración.

2. **Logging**: Mantener un registro detallado de las operaciones para facilitar la identificación de problemas.

3. **Pruebas unitarias**: Desarrollar pruebas para cada función del modelo y controlador para garantizar su correcto funcionamiento.

4. **Documentación**: Mantener actualizada esta documentación con cualquier cambio en la estructura o funcionamiento del módulo.

5. **Seguridad**: Revisar periódicamente las políticas de seguridad en Supabase para asegurar que solo los usuarios autorizados puedan acceder a los datos.

## Futuras Mejoras

1. **Caché de datos**: Implementar un sistema de caché para reducir las consultas a la base de datos.

2. **Sincronización en tiempo real**: Utilizar las capacidades de suscripción en tiempo real de Supabase para mantener sincronizados los datos entre múltiples clientes.

3. **Historial de cambios**: Registrar los cambios en las columnas para permitir la auditoría y posible reversión de acciones.

4. **Personalización avanzada**: Permitir a los usuarios personalizar más aspectos de las columnas, como colores, iconos o restricciones específicas.