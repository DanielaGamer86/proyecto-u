import React, { useEffect, useState } from 'react';
import { AreasModel } from '../../models/areas/model_areas';
import { CardsModel } from '../../models/cards/model_cards';

function Cards() {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newCard, setNewCard] = useState({
    titulo: '',
    descripcion: '',
    imagenes: [],
    comentarios: [],
    area_id: '',
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const areasData = await AreasModel.getAreas();
        setAreas(areasData);
        const cardsData = await CardsModel.getCards();
        setCards(cardsData);
        setFilteredCards(cardsData);
      } catch (err) {
        // Manejar error
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = cards;
    if (selectedArea) {
      filtered = filtered.filter(card => card.area_id === selectedArea);
    }
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(card =>
        (card.titulo && card.titulo.toLowerCase().includes(s)) ||
        (card.descripcion && card.descripcion.toLowerCase().includes(s))
      );
    }
    setFilteredCards(filtered);
  }, [selectedArea, search, cards]);

  const handleAreaChange = e => setSelectedArea(e.target.value);
  const handleSearchChange = e => setSearch(e.target.value);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleNewCardChange = e => {
    const { name, value } = e.target;
    setNewCard(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateCard = async e => {
    e.preventDefault();
    // Aquí puedes agregar validaciones
    try {
      const cardData = {
        area_id: newCard.area_id,
        contenido: {
          titulo: newCard.titulo,
          descripcion: newCard.descripcion,
          imagenes: [],
          comentarios: [],
        },
      };
      await CardsModel.createCard(cardData);
      closeModal();
      // Recargar cards
      const cardsData = await CardsModel.getCards();
      setCards(cardsData);
    } catch (err) {
      // Manejar error
    }
  };

  return (
    <div className="container-fluid p-4 min-h-screen bg-dark">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div className="d-flex align-items-center mb-2 mb-md-0">
          <select className="form-select bg-dark text-light me-2" value={selectedArea} onChange={handleAreaChange}>
            <option value="">Todas las áreas</option>
            {areas.map(area => (
              <option key={area.id} value={area.id}>{area.nombre}</option>
            ))}
          </select>
        </div>
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control bg-dark text-light me-2"
            placeholder="Buscar por título o descripción"
            value={search}
            onChange={handleSearchChange}
          />
          <button className="btn btn-secondary">Buscar</button>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" style={{ maxHeight: '65vh', overflowY: 'auto' }}>
        {loading ? (
          <div className="text-light">Cargando...</div>
        ) : filteredCards.length === 0 ? (
          <div className="text-light">No hay tarjetas para mostrar.</div>
        ) : (
          filteredCards.map(card => (
            <div className="col" key={card.id}>
              <div className="card bg-dark text-light border-secondary h-100">
                <div className="card-body">
                  <h5 className="card-title">{card.titulo || card.contenido?.titulo}</h5>
                  <p className="card-text">{card.descripcion || card.contenido?.descripcion}</p>
                  <span className="badge bg-info">{areas.find(a => a.id === card.area_id)?.nombre || 'Sin área'}</span>
                </div>
              </div>
            </div>
          ))
        )}
        {/* Card para crear nueva */}
        <div className="col">
          <div className="card bg-secondary text-light border-light h-100 d-flex align-items-center justify-content-center" style={{ cursor: 'pointer', minHeight: '150px' }} onClick={openModal}>
            <div className="card-body text-center">
              <span style={{ fontSize: '2rem' }}>+</span>
              <p className="mb-0">Crear nueva tarjeta</p>
            </div>
          </div>
        </div>
      </div>
      {/* Modal para crear nueva tarjeta */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content bg-dark text-light">
              <div className="modal-header">
                <h5 className="modal-title">Crear nueva tarjeta</h5>
                <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={closeModal}></button>
              </div>
              <form onSubmit={handleCreateCard}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Área</label>
                    <select className="form-select" name="area_id" value={newCard.area_id} onChange={handleNewCardChange} required>
                      <option value="">Seleccione un área</option>
                      {areas.map(area => (
                        <option key={area.id} value={area.id}>{area.nombre}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Título</label>
                    <input type="text" className="form-control" name="titulo" value={newCard.titulo} onChange={handleNewCardChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea className="form-control" name="descripcion" value={newCard.descripcion} onChange={handleNewCardChange} required />
                  </div>
                  {/* Aquí puedes agregar campos para imágenes y comentarios si lo deseas */}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
                  <button type="submit" className="btn btn-primary">Crear</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cards;
