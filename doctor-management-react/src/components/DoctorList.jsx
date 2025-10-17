import React from 'react';
import DoctorCard from './DoctorCard';

const DoctorList = ({ doctors, onEdit, onDelete }) => {
  return (
    <div className="doctor-list">
      <h2>Doctors List</h2>
      {doctors.length === 0 ? (
        <p className="no-doctors">No doctors available</p>
      ) : (
        <div className="doctors-grid">
          {doctors.map((doctor) => (
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
  );
};

export default DoctorList;