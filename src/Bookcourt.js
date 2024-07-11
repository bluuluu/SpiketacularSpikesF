import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bookcourt.css';

import spikeStadium from './Web__FillWzI0MDAsMTA2Nl0.jpg';
import spikeBeach from './Beach-Volleyball-2-scaled.jpg';
import spikeCourt from './com-volleyball-gallery-3.webp';

const courts = [
  { name: 'Spike Stadium', price: 200, unavailableDays: [1, 2, 3], image: spikeStadium }, 
  { name: 'Spike Beach', price: 300, unavailableDays: [5, 6], image: spikeBeach }, 
  { name: 'Spike Court', price: 150, unavailableDays: [0], image: spikeCourt } 
];

function Bookcourt() {
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
      <h2>Court Booking</h2>
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
            Court selection:
            <select value={selectedCourt.name} onChange={handleCourtChange}>
              {courts.map(court => (
                <option key={court.name} value={court.name}>{court.name}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="date-time-selection">
          <div>
            <label>Date:</label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
            />
          </div>
          <div>
            <label>Time:</label>
            <input 
              type="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
            />
          </div>
        </div>
        <div className="status-total">
          <div className="status" style={{ color: status === 'Available' ? 'green' : 'red' }}>
            <label>Status:</label>
            <span>{status}</span>
          </div>
          <div className="total">
            <label>Total:</label>
            <span>${selectedCourt.price}</span>
          </div>
        </div>
        <button 
          className="checkout-button" 
          disabled={isCheckoutDisabled}
          onClick={() => navigate('/checkout')}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Bookcourt;
