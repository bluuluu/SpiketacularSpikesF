import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bookcourt.css';

import spikeStadium from './Web__FillWzI0MDAsMTA2Nl0.jpg';
import spikeBeach from './Beach-Volleyball-2-scaled.jpg';
import spikeCourt from './com-volleyball-gallery-3.webp';

const courts = [
  { name: 'Spike Stadium', price: 200, unavailableDays: [1, 2, 3], image: spikeStadium, description: { en: 'A large stadium with seating for spectators.', fr: 'Un grand stade avec des sièges pour les spectateurs.' } }, 
  { name: 'Spike Beach', price: 300, unavailableDays: [5, 6], image: spikeBeach, description: { en: 'A beach volleyball court with a sand surface.', fr: 'Un terrain de beach-volley avec une surface de sable.' } }, 
  { name: 'Spike Court', price: 150, unavailableDays: [0], image: spikeCourt, description: { en: 'A standard indoor volleyball court.', fr: 'Un terrain de volley-ball intérieur standard.' } } 
];

function Bookcourt({ language = 'en' }) {
  const [selectedCourt, setSelectedCourt] = useState(courts[0]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('Available');
  const navigate = useNavigate();

  useEffect(() => {
    if (date) {
      const selectedDate = new Date(date);
      const dayOfWeek = selectedDate.getDay();
      if (selectedCourt.unavailableDays.includes(dayOfWeek)) {
        setStatus('Unavailable');
      } else {
        setStatus('Available');
      }
    }
  }, [date, selectedCourt]);

  const handleCourtChange = (e) => {
    const court = courts.find(c => c.name === e.target.value);
    setSelectedCourt(court);
    setDate('');
    setStatus('Available');
  };

  const isCheckoutDisabled = status === 'Unavailable' || !date || !time;

  return (
    <div className="bookcourt-page">
      <h2>{language === 'en' ? 'Court Booking' : 'Réservation de terrain'}</h2>
      <div className="court-photo">
        <img 
          src={selectedCourt.image} 
          alt={selectedCourt.name} 
          className="court-image"
        />
      </div>
      <div className="form-container">
        <div className="court-selection">
          <label>
            {language === 'en' ? 'Court selection:' : 'Sélection du terrain:'}
            <select value={selectedCourt.name} onChange={handleCourtChange}>
              {courts.map(court => (
                <option key={court.name} value={court.name}>{court.name}</option>
              ))}
            </select>
          </label>
          <p className="court-description">{selectedCourt.description[language]}</p>
        </div>
        <div className="date-time-selection">
          <div>
            <label>{language === 'en' ? 'Date:' : 'Date:'}</label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
            />
          </div>
          <div>
            <label>{language === 'en' ? 'Time:' : 'Heure:'}</label>
            <input 
              type="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
            />
          </div>
        </div>
        <div className="status-total">
          <div className="status" style={{ color: status === 'Available' ? 'green' : 'red' }}>
            <label>{language === 'en' ? 'Status:' : 'Statut:'}</label>
            <span>{status}</span>
          </div>
          <div className="total">
            <label>{language === 'en' ? 'Total:' : 'Total:'}</label>
            <span>${selectedCourt.price}</span>
          </div>
        </div>
        <button 
          className="checkout-button" 
          disabled={isCheckoutDisabled}
          onClick={() => navigate('/checkout')}
        >
          {language === 'en' ? 'Checkout' : 'Passer à la caisse'}
        </button>
      </div>
    </div>
  );
}

export default Bookcourt;
