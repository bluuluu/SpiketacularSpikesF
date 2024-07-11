import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
import volleyballImage from './People-beach-volleyball.webp';
import logo from './pngtree-volleyball-player-spiking-ball-crest-illustration-spiker-spike-vector-picture-image_9421056.png';

import About from './About';
import Staff from './Staff';
import Programs from './Programs';
import Blog from './Blog';
import Bookcourt from './Bookcourt';
import Bookclass from './Bookclass';
import Checkout from './Checkout';
import Confirmation from './Confirmation';

const translations = {
  en: {
    welcome: "Welcome to Spiketacular Spikes!",
    tagline: "Ottawa’s biggest volleyball club. We are open 24/7, open to all ages.",
    joinUs: "Want to join us?",
    viewPrograms: "View Programs",
    bookClass: "Book a Class",
    bookCourt: "Want to book a court?",
    viewCourts: "View Courts",
    bookCourtBtn: "Book a Court",
    home: "Home",
    about: "About",
    staff: "Staff",
    programs: "Programs",
    blog: "Blog",
    checkout: "Checkout",
    confirmation: "Confirmation",
  },
  fr: {
    welcome: "Bienvenue à Spiketacular Spikes!",
    tagline: "Le plus grand club de volleyball d'Ottawa. Nous sommes ouverts 24h/24 et 7j/7, pour tous les âges.",
    joinUs: "Voulez-vous nous rejoindre?",
    viewPrograms: "Voir les programmes",
    bookClass: "Réserver une classe",
    bookCourt: "Vous voulez réserver un terrain?",
    viewCourts: "Voir les terrains",
    bookCourtBtn: "Réserver un terrain",
    home: "Accueil",
    about: "À propos",
    staff: "Personnel",
    programs: "Programmes",
    blog: "Blog",
    checkout: "Passer à la caisse",
    confirmation: "Confirmation",
  },
};

function Home({ language }) {
  const navigate = useNavigate();
  const t = translations[language];

  return (
    <>
      <div className="photo-section">
        <div className="overlay">
          <h1>{t.welcome}</h1>
          <p>{t.tagline}</p>
        </div>
        <img src={volleyballImage} alt="Volleyball" className="single-image" />
      </div>
      <div className="info-section">
        <div className="join-us">
          <h2>{t.joinUs}</h2>
          <p>At Spiketacular Spikes, we offer a variety of programs and classes with different skill levels.</p>
          <div className="button-group">
            <button className="info-button" onClick={() => navigate('/programs')}>{t.viewPrograms}</button>
            <button className="info-button" onClick={() => navigate('/bookclass')}>{t.bookClass}</button>
          </div>
        </div>
        <div className="book-court">
          <h2>{t.bookCourt}</h2>
          <p>At Spiketacular Spikes, we offer 3 courts for you to book for you and your family and friends.</p>
          <div className="button-group">
            <button className="info-button" onClick={() => navigate('/about')}>{t.viewCourts}</button>
            <button className="info-button" onClick={() => navigate('/book')}>{t.bookCourtBtn}</button>
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'fr' : 'en'));
  };

  const t = translations[language];

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="navbar">
            <div className="navbar-brand">
              <Link to="/">
                <img src={logo} alt="Logo" className="logo" />
              </Link>
              Spiketacular Spikes
            </div>
            <ul className="nav-links">
              <li><Link to="/" className="nav-link">{t.home}</Link></li>
              <li><Link to="/about" className="nav-link">{t.about}</Link></li>
              <li><Link to="/staff" className="nav-link">{t.staff}</Link></li>
              <li><Link to="/programs" className="nav-link">{t.programs}</Link></li>
              <li><Link to="/blog" className="nav-link">{t.blog}</Link></li>
            </ul>
            <button onClick={toggleLanguage} className="language-toggle">
              {language === 'en' ? 'FR' : 'EN'}
            </button>
          </nav>
          <Routes>
            <Route exact path="/" element={<Home language={language} />} />
            <Route path="/about" element={<About language={language} />} />
            <Route path="/staff" element={<Staff language={language} />} />
            <Route path="/programs" element={<Programs language={language} />} />
            <Route path="/blog" element={<Blog language={language} />} />
            <Route path="/book" element={<Bookcourt language={language} />} />
            <Route path="/bookclass" element={<Bookclass language={language} />} />
            <Route path="/checkout" element={<Checkout language={language}  />} />
            <Route path="/confirmation" element={<Confirmation language={language}/>} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
