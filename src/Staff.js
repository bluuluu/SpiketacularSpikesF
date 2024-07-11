import React, { useState } from 'react';
import './Staff.css'; 

import image1 from './1331736876.avif';
import image2 from './636277790365561229-IMG-2097.webp';

const staffMembers = [
  { name: "John John", role: "Manager", level: "Recreational" },
  { name: "Kimmy Tim", role: "Manager", level: "Competitive" },
  { name: "Gil Albert", role: "Manager", level: "Competitive" },
  { name: "Chim Dim", role: "Coach", level: "Competitive" },
  { name: "Lucy Nucy", role: "Coach", level: "Competitive" },
  { name: "Kim Kim", role: "Coach", level: "Competitive" },
  { name: "Son Sonny", role: "Coach", level: "Recreational" },
  { name: "Jim Jum", role: "Coach", level: "Recreational" },
  { name: "Lola Bola", role: "Manager", level: "Recreational" }
];

const staffImages = [image1, image2];

function getRandomImage() {
  return staffImages[Math.floor(Math.random() * staffImages.length)];
}

function Staff({ language }) {
  const translations = {
    en: {
      filterByStaff: "Filter by Staff",
      role: "Role",
      coach: "Coach",
      manager: "Manager",
      level: "Level",
      recreational: "Recreational",
      competitive: "Competitive",
      clearFilter: "Clear Filter"
    },
    fr: {
      filterByStaff: "Filtrer par personnel",
      role: "Rôle",
      coach: "Entraîneur",
      manager: "Manager",
      level: "Niveau",
      recreational: "Récréatif",
      competitive: "Compétitif",
      clearFilter: "Effacer le filtre"
    }
  };

  const t = translations[language];

  const [filters, setFilters] = useState({
    role: {
      Coach: false,
      Manager: false
    },
    level: {
      Recreational: false,
      Competitive: false
    }
  });

  const handleFilterChange = (type, value) => {
    setFilters({
      ...filters,
      [type]: {
        ...filters[type],
        [value]: !filters[type][value]
      }
    });
  };

  const clearFilters = () => {
    setFilters({
      role: {
        Coach: false,
        Manager: false
      },
      level: {
        Recreational: false,
        Competitive: false
      }
    });
  };

  const filteredStaff = staffMembers.filter(member => {
    const roleFilter = filters.role.Coach || filters.role.Manager;
    const levelFilter = filters.level.Recreational || filters.level.Competitive;

    const roleMatch = !roleFilter || filters.role[member.role];
    const levelMatch = !levelFilter || filters.level[member.level];

    return roleMatch && levelMatch;
  });

  return (
    <div className="staff-page">
      <div className="filter-section">
        <h3>{t.filterByStaff}</h3>
        <div className="filters">
          <div className="filter-group">
            <p>{t.role}:</p>
            <label>
              <input
                type="checkbox"
                checked={filters.role.Coach}
                onChange={() => handleFilterChange("role", "Coach")}
              /> {t.coach}
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.role.Manager}
                onChange={() => handleFilterChange("role", "Manager")}
              /> {t.manager}
            </label>
          </div>
          <div className="filter-group">
            <p>{t.level}:</p>
            <label>
              <input
                type="checkbox"
                checked={filters.level.Recreational}
                onChange={() => handleFilterChange("level", "Recreational")}
              /> {t.recreational}
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.level.Competitive}
                onChange={() => handleFilterChange("level", "Competitive")}
              /> {t.competitive}
            </label>
          </div>
        </div>
        <button className="clear-filter-button" onClick={clearFilters}>{t.clearFilter}</button>
      </div>
      <div className="staff-container">
        {filteredStaff.map(member => (
          <div key={member.name} className="staff-card">
            <div className="staff-photo">
              <img src={getRandomImage()} alt="Staff" />
            </div>
            <div className="staff-info">
              <p>{language === 'en' ? 'Name' : 'Nom'}: {member.name}</p>
              <p>{language === 'en' ? 'Role' : 'Rôle'}: {member.role === 'Coach' ? t.coach : t.manager}</p>
              <p>{language === 'en' ? 'Level' : 'Niveau'}: {member.level === 'Recreational' ? t.recreational : t.competitive}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Staff;
