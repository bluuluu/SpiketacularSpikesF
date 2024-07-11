import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Confirmation.css'; 
import checkmarkImage from './White_check_mark_in_dark_green_rounded_square.svg.png'; 

function Confirmation({ language = 'en' }) {
  const translations = {
    en: {
      confirmation: "CONFIRMATION",
      paymentAccepted: "Payment has been accepted",
      transactionNumber: "Transaction Number",
      playerInfo: "Player Information",
      name: "Name",
      phoneNumber: "Phone Number",
      emailAddress: "Email Address",
      returnHome: "Return to Home",
      anyQuestions: "Any Questions?",
      callUs: "Call us",
      emailUs: "Email us",
    },
    fr: {
      confirmation: "CONFIRMATION",
      paymentAccepted: "Le paiement a été accepté",
      transactionNumber: "Numéro de transaction",
      playerInfo: "Informations sur le joueur",
      name: "Nom",
      phoneNumber: "Numéro de téléphone",
      emailAddress: "Adresse e-mail",
      returnHome: "Retourner à l'accueil",
      anyQuestions: "Des questions?",
      callUs: "Appelez-nous",
      emailUs: "Envoyez-nous un e-mail",
    }
  };

  const t = translations[language];

  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="confirmation-page">
      <div className="confirmation-header">
        <h2>{t.confirmation}</h2>
      </div>
      <div className="confirmation-content">
        <div className="checkmark-container">
          <img src={checkmarkImage} alt="Checkmark" className="checkmark-image" />
        </div>
        <div className="confirmation-details">
          <h3>{t.paymentAccepted}</h3>
          <p>{t.transactionNumber}: N8J9N0K02</p>
          <h3>{t.playerInfo}</h3>
          <p>{t.name}: XXXXXXX XXXXX</p>
          <p>{t.phoneNumber}: XXX-XXX-XXXX</p>
          <p>{t.emailAddress}: XXXX@XXX.com</p>
          <button className="return-button" onClick={handleReturnHome}>{t.returnHome}</button>
        </div>
      </div>
      <div className="footer">
        <h3>{t.anyQuestions}</h3>
        <p>{t.callUs}: 613 843 4328</p>
        <p>{t.emailUs}: spike@volleyball.ca</p>
      </div>
    </div>
  );
}

export default Confirmation;
