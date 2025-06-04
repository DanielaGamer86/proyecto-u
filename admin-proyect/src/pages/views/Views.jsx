import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faUser, faBuilding, faTags, faInbox, faSpinner, faPlus } from '@fortawesome/free-solid-svg-icons';
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
    <p>No hay actividades en "{title}"</p>
  </motion.div>
);

// Componente para el filtro
const FilterButton = ({ title, icon, options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="filter-menu">
      <button
        className="filter-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={icon} />
        {title}
      </button>
      {isOpen && (
        <div className="filter-dropdown">
          {options.map((option) => (
            <div
              key={option.id}
              className={`filter-option ${selected.includes(option.id) ? 'bg-blue-600' : ''}`}
              onClick={() => {
                onSelect(option.id);
                setIsOpen(false);
              }}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

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
    <div className="modal-overlay">
      <div className="modal-container">
        <h3 className="text-xl font-semibold text-gray-200 mb-4">Crear Nueva Columna</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="columnName" className="block text-gray-300 mb-2">Nombre de la columna</label>
            <input
              type="text"
              id="columnName"
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingrese el nombre de la columna"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function Views() {
  // Estado para los filtros
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
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

  // Datos de ejemplo para los filtros
  const areas = [
    { id: 'dev', name: 'Desarrollo' },
    { id: 'design', name: 'Diseño' },
    { id: 'marketing', name: 'Marketing' }
  ];

  const users = [
    { id: 'user1', name: 'Usuario 1' },
    { id: 'user2', name: 'Usuario 2' },
    { id: 'user3', name: 'Usuario 3' }
  ];

  const tags = [
    { id: 'urgent', name: 'Urgente' },
    { id: 'bug', name: 'Bug' },
    { id: 'feature', name: 'Nueva función' }
  ];
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-light text-2xl font-bold">Vista General</h2>
        <button 
          className="create-column-button"
          onClick={() => setIsModalOpen(true)}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Nueva Columna
        </button>
      </div>
      
      <div className="filters-container">
        <div className="filters-grid">
          <FilterButton
            title="Áreas"
            icon={faBuilding}
            options={areas}
            selected={selectedAreas}
            onSelect={(id) => setSelectedAreas(prev => 
              prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
            )}
          />
          <FilterButton
            title="Personas"
            icon={faUser}
            options={users}
            selected={selectedUsers}
            onSelect={(id) => setSelectedUsers(prev => 
              prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
            )}
          />
          <FilterButton
            title="Etiquetas"
            icon={faTags}
            options={tags}
            selected={selectedTags}
            onSelect={(id) => setSelectedTags(prev => 
              prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
            )}
          />
        </div>
      </div>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="task-columns-container">
          {Object.entries(columns)
            .sort(([, a], [, b]) => a.order - b.order)
            .map(([columnId, column]) => (
              <div key={columnId} className="task-column">
                <h3 className="text-xl font-semibold text-gray-200 mb-4">
                  {column.name}
                </h3>
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
