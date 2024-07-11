import React, { useState } from 'react';
import './Programs.css'; 

function Programs({ language }) {
  const [isOpen, setIsOpen] = useState({
    competitive: false,
    recreational: false,
    classes: false,
    dropIn: false
  });

  const toggleSection = (section) => {
    setIsOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const translations = {
    en: {
      programs: "Programs",
      competitiveLeague: "Competitive League",
      competitiveDescription: "Our Competitive League is designed for players looking to compete at a higher level. There are tryouts to join this league.",
      recreationalLeague: "Recreational League",
      recreationalDescription: "Join our Recreational League for a fun and engaging volleyball experience.",
      classes: "Volleyball Classes/Lessons",
      classesDescription: "At Spikestacular Spikes, we offer a variety of classes/lessons managed by one of our beloved coaches. These classes can help everyone in different skill groups.",
      dropIn: "Drop-in",
      dropInDescription: "Our drop-in sessions are open to everyone.",
      dontKnowSkill: "Don’t know where your skill stands?",
      watchVideo: "Watch a YouTube video to check out where your skill stands!",
      ages: "Ages",
      price: "Price",
      level: "Level",
      schedule: "Schedule",
      allLevels: "All Levels",
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
      everyday: "Everyday 24/7",
      seasonPrice: "$1000 for the season",
      seasonPriceRecreational: "$600 for the season",
      weekPrice: "$300.00 for 12 weeks"
    },
    fr: {
      programs: "Programmes",
      competitiveLeague: "Ligue compétitive",
      competitiveDescription: "Notre Ligue Compétitive est conçue pour les joueurs cherchant à rivaliser à un niveau plus élevé. Il y a des essais pour rejoindre cette ligue.",
      recreationalLeague: "Ligue récréative",
      recreationalDescription: "Rejoignez notre Ligue Récréative pour une expérience de volley-ball amusante et engageante.",
      classes: "Cours de Volleyball / Leçons",
      classesDescription: "À Spikestacular Spikes, nous offrons une variété de cours/lessons gérés par l'un de nos entraîneurs bien-aimés. Ces cours peuvent aider tout le monde dans différents groupes de compétences.",
      dropIn: "Sessions libres",
      dropInDescription: "Nos sessions libres sont ouvertes à tous.",
      dontKnowSkill: "Vous ne savez pas où se situe votre niveau de compétence?",
      watchVideo: "Regardez une vidéo YouTube pour vérifier où se situe votre niveau de compétence!",
      ages: "Âges",
      price: "Prix",
      level: "Niveau",
      schedule: "Horaire",
      allLevels: "Tous les niveaux",
      monday: "Lundi",
      tuesday: "Mardi",
      wednesday: "Mercredi",
      thursday: "Jeudi",
      friday: "Vendredi",
      saturday: "Samedi",
      sunday: "Dimanche",
      everyday: "Tous les jours 24/7",
      seasonPrice: "1000$ pour la saison",
      seasonPriceRecreational: "600$ pour la saison",
      weekPrice: "300,00$ pour 12 semaines"
    }
  };

  const t = translations[language];

  return (
    <div className="programs-page">
      <h1>{t.programs}</h1>
      <div className="program-section">
        <button onClick={() => toggleSection('competitive')} className="accordion">
          {t.competitiveLeague} <span className="arrow">{isOpen.competitive ? '▲' : '▼'}</span>
        </button>
        <div className={`panel ${isOpen.competitive ? 'open' : ''}`}>
          <p>{t.competitiveDescription}</p>
          <ul>
            <li>{t.ages}: 16+</li>
            <li>{t.price}: {t.seasonPrice}</li>
            <li>{t.level}: {t.allLevels}</li>
            <li>{t.schedule}: {t.monday} - {t.thursday} - {t.friday} - {t.sunday}</li>
          </ul>
        </div>
      </div>

      <div className="program-section">
        <button onClick={() => toggleSection('recreational')} className="accordion">
          {t.recreationalLeague} <span className="arrow">{isOpen.recreational ? '▲' : '▼'}</span>
        </button>
        <div className={`panel ${isOpen.recreational ? 'open' : ''}`}>
          <p>{t.recreationalDescription}</p>
          <ul>
            <li>{t.ages}: 16+</li>
            <li>{t.price}: {t.seasonPriceRecreational}</li>
            <li>{t.level}: {t.allLevels}</li>
            <li>{t.schedule}: {t.monday} - {t.tuesday} - {t.wednesday}</li>
          </ul>
        </div>
      </div>

      <div className="program-section">
        <button onClick={() => toggleSection('classes')} className="accordion">
          {t.classes} <span className="arrow">{isOpen.classes ? '▲' : '▼'}</span>
        </button>
        <div className={`panel ${isOpen.classes ? 'open' : ''}`}>
          <p>{t.classesDescription}</p>
          <ul>
            <li>{t.ages}: 5+</li>
            <li>{t.price}: {t.weekPrice}</li>
            <li>{t.level}: {t.allLevels}</li>
            <li>{t.schedule}: {t.monday} - {t.wednesday} - {t.friday}</li>
          </ul>
        </div>
      </div>

      <div className="program-section">
        <button onClick={() => toggleSection('dropIn')} className="accordion">
          {t.dropIn} <span className="arrow">{isOpen.dropIn ? '▲' : '▼'}</span>
        </button>
        <div className={`panel ${isOpen.dropIn ? 'open' : ''}`}>
          <p>{t.dropInDescription}</p>
          <ul>
            <li>{t.ages}: 12+</li>
            <li>{t.level}: {t.allLevels}</li>
            <li>{t.schedule}: {t.everyday}</li>
          </ul>
        </div>
      </div>

      <div className="youtube-section">
        <h2>{t.dontKnowSkill}</h2>
        <p>{t.watchVideo}</p>
        <a href="https://www.youtube.com/watch?v=DRV05ew_cqI&t=283s" target="_blank" rel="noopener noreferrer">
          <div className="youtube-placeholder">
            <img src="https://img.youtube.com/vi/DRV05ew_cqI/0.jpg" alt="YouTube Video" className="youtube-thumbnail" />
          </div>
        </a>
      </div>
    </div>
  );
}

export default Programs;
