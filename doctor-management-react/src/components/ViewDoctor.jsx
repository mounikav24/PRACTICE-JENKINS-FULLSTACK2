import React from 'react';
import DoctorList from './DoctorList';

const ViewDoctor = ({ doctors, onEdit, onDelete }) => {
  return (
    <div className="view-doctors">
      <DoctorList 
        doctors={doctors} 
        onEdit={onEdit} 
        onDelete={onDelete} 
      />
    </div>
  );
};

export default ViewDoctor;