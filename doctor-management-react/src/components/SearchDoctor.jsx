import React, { useState } from 'react';
import DoctorCard from './DoctorCard';

const SearchDoctor = ({ doctors, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('name');

  const filteredDoctors = doctors.filter(doctor => {
    const value = doctor[searchBy]?.toString().toLowerCase() || '';
    return value.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="search-doctor">
      <h2>Search Doctors</h2>
      
      <div className="search-container">
        <div className="search-controls">
          <select 
            value={searchBy} 
            onChange={(e) => setSearchBy(e.target.value)}
            className="search-select"
          >
            <option value="name">Name</option>
            <option value="hospitalName">Hospital</option>
            <option value="department">Department</option>
            <option value="experience">Experience</option>
          </select>
          
          <input
            type="text"
            placeholder={`Search by ${searchBy}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="search-results">
          {searchTerm && (
            <p className="results-count">
              Found {filteredDoctors.length} doctor(s)
            </p>
          )}
          
          {filteredDoctors.length === 0 && searchTerm ? (
            <p className="no-results">No doctors found matching your search.</p>
          ) : (
            <div className="doctors-grid">
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchDoctor;