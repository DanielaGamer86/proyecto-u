import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox, faSpinner, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ViewsController } from '../../controllers/views/controller_views';
import './Views.css';

// Componente para las tarjetas vacías
const EmptyColumn = ({ title }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="empty-column"
  >
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <FontAwesomeIcon icon={faInbox} size="3x" className="mb-3" />
    </motion.div>
    <p>No hay actividades</p>
  </motion.div>
);

// Componente para la tarjeta de tarea
const TaskCard = ({ task, index }) => (
  <Draggable draggableId={task.id} index={index}>
    {(provided, snapshot) => (
      <motion.div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="task-card"
      >
        <h4 className="font-medium text-gray-200">{task.title}</h4>
        <div className="mt-2 text-sm text-gray-400">{task.description}</div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium text-gray-200 bg-dark-600 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center">
            <img
              src={task.assignee.avatar}
              alt={task.assignee.name}
              className="w-6 h-6 rounded-full"
            />
          </div>
        </div>
      </motion.div>
    )}
  </Draggable>
);

// Componente para el botón de crear columna (como una columna)
const CreateColumnButton = ({ onClick }) => (
  <motion.div 
    className="add-column-container"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" }}
    whileTap={{ scale: 0.97 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    onClick={onClick}
  >
    <motion.div
      className="add-column-icon"
      animate={{ rotate: [0, 90, 180, 270, 360] }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    >
      <FontAwesomeIcon icon={faPlus} size="2x" />
    </motion.div>
    <motion.p
      className="add-column-text"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      Crear Nueva Columna
    </motion.p>
  </motion.div>
);

// Componente para el modal de crear columna
const CreateColumnModal = ({ isOpen, onClose, onCreateColumn }) => {
  const [columnName, setColumnName] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (columnName.trim()) {
      onCreateColumn(columnName.trim());
      setColumnName('');
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ zIndex: 9999 }}
        >
          <motion.div 
            className="modal-container"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: { 
                type: "spring", 
                damping: 20, 
                stiffness: 300,
                duration: 0.4 
              }
            }}
            exit={{ 
              scale: 0.8, 
              opacity: 0,
              transition: { duration: 0.3 } 
            }}
          >
            <motion.h3 
              className="text-2xl font-semibold text-gray-200 mb-8 text-center"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
            >
             <h2> Crear nueva columna</h2>
            </motion.h3>
            
            <form onSubmit={handleSubmit}>
              <motion.div 
                className="mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
              >
                <label htmlFor="columnName" className="block text-gray-300 mb-4 text-lg font-medium">
                <h5>Nombre de la columna</h5>
                </label>
                <input
                  type="text"
                  id="columnName"
                  value={columnName}
                  style={{ marginBottom: "30px"}}
                  onChange={(e) => setColumnName(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  placeholder="Ej: Finalizado"
                  autoFocus
                  required
                />
              </motion.div>
              
              <motion.div 
                className="flex justify-center space-x-6 mt-10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
              >
                <motion.button
                  type="button"
                  onClick={onClose}
                  style={{ backgroundColor: "rgb(179, 8, 31)", color: "rgba(255, 255, 255, 0.9)" }}
                  className="px-8 py-4 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors text-lg font-medium"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 77, 101, 0.88)", color: "rgba(255, 255, 255, 0.88)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  type="submit"
                  style={{ backgroundColor: "rgb(133, 156, 6)", color: "rgba(255, 255, 255, 0.9)", width: "75px"}}
                  className="px-8 py-4 bg-blue-600 rounded-lg transition-colors text-lg font-medium"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(219, 243, 88, 0.9)" }}
                  whileTap={{ scale: 0.95}}
                >
                  Crear
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function Views() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Estado para las columnas y tareas
  const [columns, setColumns] = useState({});
  // Estado para el modal de crear columna
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar columnas desde la base de datos
  useEffect(() => {
    loadColumns();
  }, []);

  const loadColumns = async () => {
    try {
      console.log('Views: Iniciando carga de columnas...');
      setIsLoading(true);
      const result = await ViewsController.getColumns();
      console.log('Views: Resultado recibido:', result);
      
      if (!result.success) {
        throw new Error(result.error);
      }

      // Convertir el array de columnas a un objeto con el formato necesario
      const columnsObject = result.data.reduce((acc, column) => {
        acc[`column-${column.id}`] = {
          id: column.id,
          name: column.nombre,
          order: column.orden,
          tasks: [] // Inicialmente sin tareas
        };
        return acc;
      }, {});

      setColumns(columnsObject);
    } catch (err) {
      setError('Error al cargar las columnas: ' + err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateColumn = async (columnName) => {
    try {
      setIsLoading(true);
      const result = await ViewsController.createColumn(columnName);
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      // Añadir la nueva columna al estado
      const newColumn = result.data;
      setColumns(prev => ({
        ...prev,
        [`column-${newColumn.id}`]: {
          id: newColumn.id,
          name: newColumn.nombre,
          order: newColumn.orden,
          tasks: []
        }
      }));
      
      console.log('Columna creada exitosamente:', newColumn);
    } catch (err) {
      setError('Error al crear la columna: ' + err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteColumn = async (columnId) => {
    try {
      setIsLoading(true);
      const result = await ViewsController.deleteColumn(columnId);
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      // Eliminar la columna del estado
      setColumns(prev => {
        const newColumns = { ...prev };
        delete newColumns[columnId];
        return newColumns;
      });
      
      console.log('Columna eliminada exitosamente');
    } catch (err) {
      setError('Error al eliminar la columna: ' + err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceTasks = Array.from(sourceColumn.tasks);
    const destTasks = Array.from(destColumn.tasks);
    const [removed] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceTasks
        }
      });
    } else {
      destTasks.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceTasks
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destTasks
        }
      });

      // Aquí puedes agregar la lógica para actualizar el estado de la tarea en la base de datos
    }
  };

  if (isLoading) {
    return (
      <div className="container-fluid p-4">
        <div className="text-light text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="loading-spinner"
          >
            <FontAwesomeIcon icon={faSpinner} size="3x" />
          </motion.div>
          <p className="mt-4 text-xl">Cargando columnas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid p-4">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <h2 className="text-light text-2xl font-bold mb-6">Vista General</h2>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="task-columns-container">
          {Object.entries(columns)
            .sort(([, a], [, b]) => a.order - b.order)
            .map(([columnId, column]) => (
              <div key={columnId} className="task-column">
                <h3 className="text-xl font-semibold text-gray-200 mb-4">
                  {column.name}
                </h3>
                {column.tasks.length === 0 && (
                  <motion.button
                    className="delete-column-button"
                    onClick={() => handleDeleteColumn(columnId)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </motion.button>
                )}
                <Droppable droppableId={columnId}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="min-h-[500px]"
                    >
                      <AnimatePresence>
                        {column.tasks.length === 0 ? (
                          <EmptyColumn title={column.name} />
                        ) : (
                          column.tasks.map((task, index) => (
                            <TaskCard key={task.id} task={task} index={index} />
                          ))
                        )}
                      </AnimatePresence>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
            
          {/* Columna para añadir nueva columna */}
          <CreateColumnButton onClick={() => setIsModalOpen(true)} />
        </div>
      </DragDropContext>
      
      <CreateColumnModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreateColumn={handleCreateColumn} 
      />
    </div>
  );
}

export default Views;
