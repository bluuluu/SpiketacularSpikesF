import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './About.css';
import spikeStadium from './maxresdefault.jpg';
import spikeBeach from './200.jpg';
import spikeCourt from './pvs.jpg';

function About({ language }) {
  const growthData = [
    { year: 2010, Players: 1003 },
    { year: 2011, Players: 1502 },
    { year: 2012, Players: 2103 },
    { year: 2013, Players: 2703 },
    { year: 2014, Players: 3503 },
    { year: 2015, Players: 4403 },
    { year: 2016, Players: 5504 },
    { year: 2017, Players: 6704 },
    { year: 2018, Players: 8004 },
    { year: 2019, Players: 9403 },
    { year: 2020, Players: 10903 },
    { year: 2021, Players: 12504 },
    { year: 2022, Players: 14250 },
    { year: 2023, Players: 16003 },
    { year: 2024, Players: 17905 },
  ];

  const [startYear, setStartYear] = useState(2010);
  const [endYear, setEndYear] = useState(2024);

  const filteredData = growthData.filter(data => data.year >= startYear && data.year <= endYear);
  const averagePlayers = Math.round(filteredData.reduce((sum, data) => sum + data.Players, 0) / filteredData.length);
  const totalPlayers = filteredData.reduce((sum, data) => sum + data.Players, 0);

  const translations = {
    en: {
      about: "Spikestacular Spike",
      biggestClub: "Ottawa’s Biggest volleyball club. Train with the best of the best",
      openHours: "Open Hours",
      open24Hours: "Open 24 hours",
      contacts: "Contacts",
      phoneNumber: "Phone Number: 613 843 4328",
      email: "Email: spike@volleyball.ca",
      location: "Location",
      address: "2451 Riverside Dr K1H 7X7 Ottawa, Ontario",
      googleMaps: "Google Maps",
      ourCourts: "Our Courts",
      howToBook: "How to book a court?",
      bookCourt: "Book Court",
      growthOverYears: "Our Growth Over the Years",
      startYear: "Start Year",
      endYear: "End Year",
      players: "Players",
      averagePlayers: "Average Players",
      totalPlayers: "Total Players",
      year: "Year"
    },
    fr: {
      about: "Spikestacular Spike",
      biggestClub: "Le plus grand club de volley-ball d'Ottawa. Entraînez-vous avec les meilleurs",
      openHours: "Heures d'ouverture",
      open24Hours: "Ouvert 24 heures",
      contacts: "Contacts",
      phoneNumber: "Numéro de téléphone : 613 843 4328",
      email: "Email : spike@volleyball.ca",
      location: "Emplacement",
      address: "2451 Riverside Dr K1H 7X7 Ottawa, Ontario",
      googleMaps: "Google Maps",
      ourCourts: "Nos Terrains",
      howToBook: "Comment réserver un terrain?",
      bookCourt: "Réserver un terrain",
      growthOverYears: "Notre Croissance Au Fil Des Ans",
      startYear: "Année de début",
      endYear: "Année de fin",
      players: "Joueurs",
      averagePlayers: "Joueurs Moyens",
      totalPlayers: "Total Joueurs",
      year: "Année"
    }
  };

  const t = translations[language];

  return (
    <div className="about-page">
      <div className="about-section">
        <h2>{t.about}</h2>
        <p>{t.biggestClub}</p>
        <h3>{t.openHours}</h3>
        <p>{t.open24Hours}</p>
        <h3>{t.contacts}</h3>
        <p>{t.phoneNumber}</p>
        <p>{t.email}</p>
        <h3>{t.location}</h3>
        <p>{t.address}</p>
        <div className="maps-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.8358315767383!2d-75.6924926844994!3d45.39200397910096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce05a55ebba6ef%3A0x115a4c65c77bdeaf!2s2451%20Riverside%20Dr%2C%20Ottawa%2C%20ON%20K1H%207X7%2C%20Canada!5e0!3m2!1sen!2sus!4v1625514599336!5m2!1sen!2sus"
            width="600"
            height="450"
            allowFullScreen=""
            loading="lazy"
            title="Google Map"
          ></iframe>
        </div>
      </div>
      <div className="courts-section">
        <h3>{t.ourCourts}</h3>
        <div className="courts-images">
          <div className="court">
            <img src={spikeStadium} alt="Spike Stadium" className="court-photo" />
            <p className="court-name">Spike Stadium</p>
          </div>
          <div className="court">
            <img src={spikeBeach} alt="Spike Beach" className="court-photo" />
            <p className="court-name">Spike Beach</p>
          </div>
          <div className="court">
            <img src={spikeCourt} alt="Spike Court" className="court-photo" />
            <p className="court-name">Spike Court</p>
          </div>
        </div>
        <h3>{t.howToBook}</h3>
        <Link to="/book" className="book-button">{t.bookCourt}</Link>
      </div>
      <div className="growth-section">
        <h3>{t.growthOverYears}</h3>
        <div className="filter-form">
          <label>
            {t.startYear}:
            <input type="number" value={startYear} onChange={(e) => setStartYear(Number(e.target.value))} min="2010" max="2024" />
          </label>
          <label>
            {t.endYear}:
            <input type="number" value={endYear} onChange={(e) => setEndYear(Number(e.target.value))} min="2010" max="2024" />
          </label>
        </div>
        <div className="growth-data">
          {filteredData.map((data, index) => (
            <div key={index} className="growth-item">
              <p>{data.year}</p>
              <p>{data.Players} {t.players}</p>
            </div>
          ))}
        </div>
        <div className="average-players">
          <h4>{t.averagePlayers}: {averagePlayers}</h4>
        </div>
        <div className="total-players">
          <h4>{t.totalPlayers}: {totalPlayers}</h4>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                label={{ value: t.year, position: 'insideBottomRight', offset: 0, fill: 'white' }}
                stroke="white"
              />
              <YAxis 
                label={{ value: t.players, angle: -90, position: 'insideLeft', fill: 'white' }} 
                stroke="white"
              />
              <Tooltip />
              <Legend formatter={(value) => (value === "Players" ? t.players : value)} />
              <Bar dataKey="Players" name={t.players} fill="darkblue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default About;
