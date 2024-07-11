import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bookclass.css';

function Bookclass({ language = 'en' }) {  // Set default value for language
  const translations = {
    en: {
      bookSession: "Book a Practice Session",
      class: "Class",
      startDate: "Start Date",
      programLength: "Program Length",
      total: "Total",
      priceNote: "*Depends on the program length",
      checkout: "Checkout",
      errorMessage: "Classes are only available on Monday, Wednesday, and Friday.",
      dropdownMenu: "Dropdown menu",
      beginner: "Beginner",
      intermediate: "Intermediate",
      pro: "Pro",
      weeks: "weeks"
    },
    fr: {
      bookSession: "Réservez une séance d'entraînement",
      class: "Classe",
      startDate: "Date de début",
      programLength: "Durée du programme",
      total: "Total",
      priceNote: "*Dépend de la durée du programme",
      checkout: "Passer à la caisse",
      errorMessage: "Les cours ne sont disponibles que le lundi, mercredi et vendredi.",
      dropdownMenu: "Menu déroulant",
      beginner: "Débutant",
      intermediate: "Intermédiaire",
      pro: "Pro",
      weeks: "semaines"
    }
  };

  const t = translations[language];

  const [selectedClass, setSelectedClass] = useState('');
  const [programLength, setProgramLength] = useState('');
  const [startDate, setStartDate] = useState('');
  const [isValidDate, setIsValidDate] = useState(true);
  const navigate = useNavigate();

  const classOptions = [
    { value: 'Beginner', label: t.beginner },
    { value: 'Intermediate', label: t.intermediate },
    { value: 'Pro', label: t.pro }
  ];
  
  const lengthOptions = [
    { value: '12 weeks', price: 300, label: `12 ${t.weeks}` },
    { value: '24 weeks', price: 550, label: `24 ${t.weeks}` },
    { value: '36 weeks', price: 700, label: `36 ${t.weeks}` },
  ];

  const getPrice = () => {
    const selectedOption = lengthOptions.find(option => option.value === programLength);
    return selectedOption ? selectedOption.price : 'XXX.XX';
  };

  const handleDateChange = (date) => {
    const selectedDay = new Date(date).getDay();
    const validDays = [2, 4, 0]; 
    if (validDays.includes(selectedDay)) {
      setIsValidDate(true);
      setStartDate(date);
    } else {
      setIsValidDate(false);
    }
  };

  const handleCheckout = () => {
    if (selectedClass && programLength && startDate && isValidDate) {
      navigate('/checkout');
    } else {
      alert('Please fill out all fields correctly.');
    }
  };

  return (
    <div className="bookclass-page">
      <h2>{t.bookSession}</h2>
      <div className="form-group">
        <label>{t.class}:</label>
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="">{t.dropdownMenu}</option>
          {classOptions.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>{t.programLength}:</label>
        <select value={programLength} onChange={(e) => setProgramLength(e.target.value)}>
          <option value="">{t.dropdownMenu}</option>
          {lengthOptions.map((option, index) => (
            <option key={index} value={option.value}>{option.label} (${option.price})</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>{t.startDate}:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => handleDateChange(e.target.value)}
          disabled={!selectedClass || !programLength}
          className="date-input"
        />
        {!isValidDate && <p className="error-message">{t.errorMessage}</p>}
      </div>
      <div className="form-group">
        <label>{t.total}:</label>
        <p>${getPrice()}<br /><span className="price-note">{t.priceNote}</span></p>
      </div>
      <button
        className="checkout-button"
        onClick={handleCheckout}
        disabled={!selectedClass || !programLength || !startDate || !isValidDate}
      >
        {t.checkout}
      </button>
    </div>
  );
}

export default Bookclass;
