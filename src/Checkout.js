import React, { useState, useEffect } from 'react';
import './Checkout.css';
import { useNavigate } from 'react-router-dom';

function Checkout({ language = 'en' }) {  // Set default value for language
  const translations = {
    en: {
      checkout: "Checkout",
      cartSummary: "Cart Summary",
      item1: "#Item 1",
      price: "Price",
      total: "Total",
      personalInfo: "Personal Information",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      phoneNumber: "Phone number",
      paymentInfo: "Payment Information",
      cardNumber: "Card Number",
      expiryDate: "Expiry Date",
      cvs: "CVS",
      cancelOrder: "Cancel Order",
      confirmOrder: "Confirm Order",
      errorMessage: "Please fill out all fields correctly.",
      clearAll: "Clear All",
      firstNameError: "Please enter your first name.",
      lastNameError: "Please enter your last name.",
      emailError: "Please enter a valid email address.",
      phoneNumberError: "Please enter a valid 10-digit phone number.",
      cardNumberError: "Please enter a valid 16-digit card number.",
      expiryDateError: "Please enter a valid expiry date in MM/YY format.",
      cvsError: "Please enter a valid 3-digit CVS."
    },
    fr: {
      checkout: "Passer à la caisse",
      cartSummary: "Résumé du panier",
      item1: "#Article 1",
      price: "Prix",
      total: "Total",
      personalInfo: "Informations personnelles",
      firstName: "Prénom",
      lastName: "Nom de famille",
      email: "Email",
      phoneNumber: "Numéro de téléphone",
      paymentInfo: "Informations de paiement",
      cardNumber: "Numéro de carte",
      expiryDate: "Date d'expiration",
      cvs: "CVS",
      cancelOrder: "Annuler la commande",
      confirmOrder: "Confirmer la commande",
      errorMessage: "Veuillez remplir tous les champs correctement.",
      clearAll: "Tout effacer",
      firstNameError: "Veuillez entrer votre prénom.",
      lastNameError: "Veuillez entrer votre nom de famille.",
      emailError: "Veuillez entrer une adresse e-mail valide.",
      phoneNumberError: "Veuillez entrer un numéro de téléphone valide à 10 chiffres.",
      cardNumberError: "Veuillez entrer un numéro de carte valide à 16 chiffres.",
      expiryDateError: "Veuillez entrer une date d'expiration valide au format MM/AA.",
      cvsError: "Veuillez entrer un CVS valide à 3 chiffres."
    }
  };

  const t = translations[language];

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvs, setCvs] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhoneNumber = (number) => {
    return /^\d{10}$/.test(number);
  };

  const validateCardNumber = (number) => {
    return /^\d{16}$/.test(number);
  };

  const validateExpiryDate = (date) => {
    const regex = /^(0[1-9]|1[0-2])\/([2-9][3-9])$/;
    return regex.test(date);
  };

  const formatExpiryDate = (date) => {
    if (date.length === 4) {
      return `${date.substring(0, 2)}/${date.substring(2, 4)}`;
    }
    return date;
  };

  const validateCvs = (number) => {
    return /^\d{3}$/.test(number);
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!firstName) newErrors.firstName = t.firstNameError;
    if (!lastName) newErrors.lastName = t.lastNameError;
    if (!validateEmail(email)) newErrors.email = t.emailError;
    if (!validatePhoneNumber(phoneNumber)) newErrors.phoneNumber = t.phoneNumberError;
    if (!validateCardNumber(cardNumber)) newErrors.cardNumber = t.cardNumberError;
    if (!validateExpiryDate(expiryDate)) newErrors.expiryDate = t.expiryDateError;
    if (!validateCvs(cvs)) newErrors.cvs = t.cvsError;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate('/confirmation');
    }
  };

  const clearAllInputs = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setCardNumber('');
    setExpiryDate('');
    setCvs('');
    setErrors({});
  };

  const isFormValid = 
    firstName &&
    lastName &&
    validateEmail(email) &&
    validatePhoneNumber(phoneNumber) &&
    validateCardNumber(cardNumber) &&
    validateExpiryDate(expiryDate) &&
    validateCvs(cvs);

  useEffect(() => {
    if (expiryDate.length === 4) {
      setExpiryDate(formatExpiryDate(expiryDate));
    }
  }, [expiryDate]);

  return (
    <div className="checkout-page">
      <h2>{t.checkout}</h2>
      <button className="clear-button" onClick={clearAllInputs}>{t.clearAll}</button>
      <form className="checkout-form" onSubmit={handleConfirmOrder}>
        <div className="cart-summary">
          <h3>{t.cartSummary}</h3>
          <p>{t.item1}</p>
          <p>{t.price}: $XXX.XX</p>
          <p>{t.total}: $XXX.XX</p>
        </div>
        <div className="personal-info">
          <h3>{t.personalInfo}</h3>
          <div className="input-group">
            <label>{t.firstName}</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required placeholder="John" />
            {errors.firstName && <p className="error-message">{errors.firstName}</p>}
          </div>
          <div className="input-group">
            <label>{t.lastName}</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required placeholder="Doe" />
            {errors.lastName && <p className="error-message">{errors.lastName}</p>}
          </div>
          <div className="input-group">
            <label>{t.email}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="john.doe@example.com" />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="input-group">
            <label>{t.phoneNumber}</label>
            <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} maxLength="10" required placeholder="1234567890" />
            {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
          </div>
        </div>
        <div className="payment-info">
          <h3>{t.paymentInfo}</h3>
          <div className="input-group">
            <label>{t.cardNumber}</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength="16"
              required
              placeholder="1234567812345678"
            />
            {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}
          </div>
          <div className="input-group">
            <label>{t.expiryDate}</label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              maxLength="5"
              placeholder="MM/YY"
              required
            />
            {errors.expiryDate && <p class="error-message">{errors.expiryDate}</p>}
          </div>
          <div className="input-group">
            <label>{t.cvs}</label>
            <input
              type="text"
              value={cvs}
              onChange={(e) => setCvs(e.target.value)}
              maxLength="3"
              required
              placeholder="123"
            />
            {errors.cvs && <p className="error-message">{errors.cvs}</p>}
          </div>
        </div>
        <div className="checkout-buttons">
          <button type="button" onClick={() => navigate('/')}>{t.cancelOrder}</button>
          <button type="submit" disabled={!isFormValid}>{t.confirmOrder}</button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
