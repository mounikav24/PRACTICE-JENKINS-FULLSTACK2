import React from 'react';

const DoctorCard = ({ doctor, onEdit, onDelete }) => {
  return (
    <div className="doctor-card">
      <h3>{doctor.name}</h3>
      <div className="doctor-details">
        <p><strong>Hospital:</strong> {doctor.hospitalName}</p>
        <p><strong>Department:</strong> {doctor.department}</p>
        <p><strong>Experience:</strong> {doctor.experience} years</p>
        <p><strong>Consultant Fee:</strong> ₹{doctor.consultantFee}</p>
      </div>
      <div className="card-actions">
        <button className="btn-edit" onClick={() => onEdit(doctor)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(doctor.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;