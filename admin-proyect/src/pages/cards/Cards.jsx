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
      <div className="row g-4" style={{ maxHeight: '65vh', overflowY: 'auto' }}>
        {loading ? (
          <div className="text-light">Cargando...</div>
        ) : filteredCards.length === 0 ? (
          <div className="text-light">No hay tarjetas para mostrar.</div>
        ) : (
          filteredCards.map(card => (
            <div className="col-12 col-md-6 col-lg-4" key={card.id}>
              <div className="card bg-dark text-light border-secondary h-100">
                <div className="card-body">
                  <h5 className="card-title">{card.titulo}</h5>
                  <p className="card-text">{card.descripcion}</p>
                  <span className="badge bg-info">{areas.find(a => a.id === card.area_id)?.nombre || 'Sin área'}</span>
                  {/* Aquí puedes agregar más info, estado, botones, etc. */}
                </div>
              </div>
            </div>
          ))
        )}
        {/* Card para crear nueva */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card bg-secondary text-light border-light h-100 d-flex align-items-center justify-content-center" style={{ cursor: 'pointer', minHeight: '150px' }}>
            <div className="card-body text-center">
              <span style={{ fontSize: '2rem' }}>+</span>
              <p className="mb-0">Crear nueva tarjeta</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
