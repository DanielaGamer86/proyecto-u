import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faSearch, 
  faUser, 
  faEdit, 
  faTrash, 
  faSpinner,
  faTimes,
  faBuilding,
  faFilter
} from '@fortawesome/free-solid-svg-icons';
import { AreasController } from '../../controllers/Areas/controller_areas';
import './Areas.css';

// Componente para el modal de crear/editar área
const AreaModal = ({ isOpen, onClose, onSubmit, editingArea = null }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    jefe_encargado: '',
    color: '#3182ce'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingArea) {
      setFormData({
        nombre: editingArea.nombre || '',
        jefe_encargado: editingArea.jefe_encargado || '',
        color: editingArea.color || '#3182ce'
      });
    } else {
      setFormData({
        nombre: '',
        jefe_encargado: '',
        color: '#3182ce'
      });
    }
  }, [editingArea, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.jefe_encargado.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error al enviar formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="modal-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="modal-title">
            {editingArea ? 'Editar Área' : 'Crear Nueva Área'}
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre" className="form-label">
              Nombre del Área
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="form-input"
                placeholder="Ingrese el nombre del área"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="jefe_encargado" className="form-label">
                Jefe Encargado
              </label>
              <input
                type="text"
                id="jefe_encargado"
                name="jefe_encargado"
                value={formData.jefe_encargado}
                onChange={handleChange}
                className="form-input"
                placeholder="Ingrese el nombre del jefe encargado"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="color" className="form-label">
                Color del Área
              </label>
              <input
                type="color"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="color-input"
              />
            </div>
            
            <div className="modal-actions">
              <button
                type="button"
                onClick={onClose}
                className="modal-btn cancel-btn"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="modal-btn submit-btn"
                disabled={isSubmitting || !formData.nombre.trim() || !formData.jefe_encargado.trim()}
              >
                {isSubmitting ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                    {editingArea ? 'Actualizando...' : 'Creando...'}
                  </>
                ) : (
                  editingArea ? 'Actualizar' : 'Crear'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Componente para la tarjeta de área
const AreaCard = ({ area, onEdit, onDelete }) => {
  return (
    <motion.div 
      className="area-card"
      style={{ '--area-color': area.color }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      layout
    >
      <div className="area-header">
        <div 
          className="area-color-indicator"
          style={{ backgroundColor: area.color }}
        />
        <div className="area-actions">
          <button 
            className="action-btn edit-btn"
            onClick={() => onEdit(area)}
            title="Editar área"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button 
            className="action-btn delete-btn"
            onClick={() => onDelete(area.id)}
            title="Eliminar área"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      
      <h3 className="area-name">{area.nombre}</h3>
      
      <div className="area-manager">
        <FontAwesomeIcon icon={faUser} className="manager-icon" />
        <span>{area.jefe_encargado}</span>
      </div>
    </motion.div>
  );
};

// Componente para el botón de crear área
const CreateAreaCard = ({ onClick }) => {
  return (
    <motion.div 
      className="create-area-card"
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className="create-icon"
        animate={{ rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <FontAwesomeIcon icon={faPlus} />
      </motion.div>
      <p className="create-text">Crear Nueva Área</p>
    </motion.div>
  );
};

function Areas() {
  const [areas, setAreas] = useState([]);
  const [filteredAreas, setFilteredAreas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArea, setEditingArea] = useState(null);
  
  // Estados para filtros
  const [filters, setFilters] = useState({
    search: '',
    manager: ''
  });

  // Cargar áreas al montar el componente
  useEffect(() => {
    loadAreas();
  }, []);

  // Aplicar filtros cuando cambien las áreas o los filtros
  useEffect(() => {
    applyFilters();
  }, [areas, filters]);

  const loadAreas = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await AreasController.getAreas();
      
      if (result.success) {
        setAreas(result.data || []);
      } else {
        setError(result.error || 'Error al cargar las áreas');
      }
    } catch (err) {
      setError('Error al cargar las áreas: ' + err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...areas];

    // Filtro por búsqueda (nombre del área)
    if (filters.search.trim()) {
      filtered = filtered.filter(area => 
        area.nombre.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filtro por jefe encargado
    if (filters.manager.trim()) {
      filtered = filtered.filter(area => 
        area.jefe_encargado.toLowerCase().includes(filters.manager.toLowerCase())
      );
    }

    setFilteredAreas(filtered);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      manager: ''
    });
  };

  const handleCreateArea = async (areaData) => {
    try {
      const result = await AreasController.createArea(areaData);
      
      if (result.success) {
        setAreas(prev => [...prev, result.data]);
        setIsModalOpen(false);
      } else {
        setError(result.error || 'Error al crear el área');
      }
    } catch (err) {
      setError('Error al crear el área: ' + err.message);
      console.error(err);
    }
  };

  const handleEditArea = async (areaData) => {
    try {
      const result = await AreasController.updateArea(editingArea.id, areaData);
      
      if (result.success) {
        setAreas(prev => prev.map(area => 
          area.id === editingArea.id ? result.data : area
        ));
        setEditingArea(null);
        setIsModalOpen(false);
      } else {
        setError(result.error || 'Error al actualizar el área');
      }
    } catch (err) {
      setError('Error al actualizar el área: ' + err.message);
      console.error(err);
    }
  };

  const handleDeleteArea = async (areaId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta área?')) {
      return;
    }

    try {
      const result = await AreasController.deleteArea(areaId);
      
      if (result.success) {
        setAreas(prev => prev.filter(area => area.id !== areaId));
      } else {
        setError(result.error || 'Error al eliminar el área');
      }
    } catch (err) {
      setError('Error al eliminar el área: ' + err.message);
      console.error(err);
    }
  };

  const openCreateModal = () => {
    setEditingArea(null);
    setIsModalOpen(true);
  };

  const openEditModal = (area) => {
    setEditingArea(area);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingArea(null);
  };

  if (isLoading) {
    return (
      <div className="areas-container">
        <div className="loading-container">
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <FontAwesomeIcon icon={faSpinner} />
          </motion.div>
          <p className="loading-text">Cargando áreas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="areas-container">
      <div className="areas-header">
        <div className="header-content">
          <h1 className="areas-title">
            <FontAwesomeIcon icon={faBuilding} className="mr-3" />
            Gestión de Áreas
          </h1>
          <button 
            className="create-area-btn"
            onClick={openCreateModal}
            title="Crear nueva área"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Crear Área
          </button>
        </div>
      </div>

      {error && (
        <motion.div 
          className="error-container"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="error-text">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="action-btn"
            style={{ float: 'right', marginTop: '8px' }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </motion.div>
      )}

      {/* Filtros */}
      <motion.div 
        className="filters-container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="filters-row">
          <div className="filter-group">
            <label className="filter-label">
              <FontAwesomeIcon icon={faSearch} className="mr-2" />
              Buscar por nombre
            </label>
            <input
              type="text"
              className="filter-input"
              placeholder="Buscar área..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <label className="filter-label">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Filtrar por jefe
            </label>
            <input
              type="text"
              className="filter-input"
              placeholder="Buscar jefe encargado..."
              value={filters.manager}
              onChange={(e) => handleFilterChange('manager', e.target.value)}
            />
          </div>
          
          {(filters.search || filters.manager) && (
            <button 
              className="clear-filters-btn"
              onClick={clearFilters}
            >
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              Limpiar filtros
            </button>
          )}
        </div>
      </motion.div>

      {/* Cuadrícula de áreas */}
      {filteredAreas.length === 0 && !isLoading ? (
        <motion.div 
          className="empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <FontAwesomeIcon icon={faBuilding} className="empty-icon" />
          <h3 className="empty-title">
            {areas.length === 0 ? 'No hay áreas creadas' : 'No se encontraron áreas'}
          </h3>
          <p className="empty-description">
            {areas.length === 0 
              ? 'Comienza creando tu primera área de trabajo'
              : 'Intenta ajustar los filtros de búsqueda'
            }
          </p>
        </motion.div>
      ) : (
        <div className="areas-grid">
          <AnimatePresence>
            {filteredAreas.map((area) => (
              <AreaCard
                key={area.id}
                area={area}
                onEdit={openEditModal}
                onDelete={handleDeleteArea}
              />
            ))}
          </AnimatePresence>
          
          {/* Botón de crear área */}
          <CreateAreaCard onClick={openCreateModal} />
        </div>
      )}

      {/* Modal de crear/editar área */}
      <AreaModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingArea ? handleEditArea : handleCreateArea}
        editingArea={editingArea}
      />
    </div>
  );
}

export default Areas;
