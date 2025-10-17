import React, { useState, useEffect } from 'react';

const DoctorForm = ({ onSubmit, editingDoctor, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    hospitalName: '',
    department: '',
    experience: '',
    consultantFee: ''
  });

  useEffect(() => {
    if (editingDoctor) {
      setFormData(editingDoctor);
    } else {
      setFormData({
        name: '',
        hospitalName: '',
        department: '',
        experience: '',
        consultantFee: ''
      });
    }
  }, [editingDoctor]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      hospitalName: '',
      department: '',
      experience: '',
      consultantFee: ''
    });
  };

  return (
    <form className="doctor-form" onSubmit={handleSubmit}>
      <h2>{editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}</h2>
      
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Hospital Name:</label>
        <input
          type="text"
          name="hospitalName"
          value={formData.hospitalName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Department:</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Experience (years):</label>
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
          min="0"
        />
      </div>

      <div className="form-group">
        <label>Consultant Fee (₹):</label>
        <input
          type="number"
          name="consultantFee"
          value={formData.consultantFee}
          onChange={handleChange}
          required
          min="0"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {editingDoctor ? 'Update' : 'Add'} Doctor
        </button>
        {editingDoctor && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default DoctorForm;