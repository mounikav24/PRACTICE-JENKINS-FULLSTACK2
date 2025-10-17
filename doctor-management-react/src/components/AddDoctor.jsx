import React from 'react';
import DoctorForm from './DoctorForm';

const AddDoctor = ({ onSubmit, editingDoctor, onCancel }) => {
  return (
    <div className="add-doctor">
      <DoctorForm 
        onSubmit={onSubmit} 
        editingDoctor={editingDoctor} 
        onCancel={onCancel} 
      />
    </div>
  );
};

export default AddDoctor;