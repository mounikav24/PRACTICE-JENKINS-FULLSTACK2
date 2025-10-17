import React, { useState, useEffect, useCallback } from 'react';
import Navigation from './Navigation';
import AddDoctor from './AddDoctor';
import ViewDoctor from './ViewDoctor'; 
import SearchDoctor from './SearchDoctor';
import axios from 'axios';
import config from '../config';

const AdminPanel = () => {

  const API_URL = `${config.url}/doctors`; // Define API_URL

  const [doctors, setDoctors] = useState([]);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('view');

  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setDoctors(response.data);
      setError(null);
    } catch {
      setError('Backend API not available. Running in local mode.');
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleAddDoctor = async (doctorData) => {
    try {
      const response = await axios.post(API_URL, {
        ...doctorData,
        id: Date.now()
      });
      setDoctors([...doctors, response.data]);
      setError(null);
      setActiveTab('view');
    } catch {
      const newDoctor = { ...doctorData, id: Date.now() };
      setDoctors([...doctors, newDoctor]);
      setError('Added locally. API not available.');
      setActiveTab('view');
    }
  };

  const handleEditDoctor = async (doctorData) => {
    try {
      const response = await axios.put(`${API_URL}/${doctorData.id}`, doctorData);
      setDoctors(doctors.map(doc => doc.id === doctorData.id ? response.data : doc));
      setEditingDoctor(null);
      setError(null);
      setActiveTab('view');
    } catch {
      setDoctors(doctors.map(doc => doc.id === doctorData.id ? doctorData : doc));
      setEditingDoctor(null);
      setError('Updated locally. API not available.');
      setActiveTab('view');
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setDoctors(doctors.filter(doc => doc.id !== id));
        setError(null);
      } catch {
        setDoctors(doctors.filter(doc => doc.id !== id));
        setError('Deleted locally. API not available.');
      }
    }
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setActiveTab('add');
  };

  const handleSubmit = (doctorData) => {
    if (editingDoctor) {
      handleEditDoctor(doctorData);
    } else {
      handleAddDoctor(doctorData);
    }
  };

  const handleCancel = () => {
    setEditingDoctor(null);
    setActiveTab('view');
  };

  return (
    <div className="admin-panel">
      <h1>Doctor Management System</h1>
      
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">Loading...</div>}
      
      {activeTab === 'view' && (
        <ViewDoctor // Corrected component name
          doctors={doctors} 
          onEdit={handleEdit} 
          onDelete={handleDeleteDoctor} 
        />
      )}
      
      {activeTab === 'add' && (
        <AddDoctor 
          onSubmit={handleSubmit} 
          editingDoctor={editingDoctor} 
          onCancel={handleCancel} 
        />
      )}
      
      {activeTab === 'search' && (
        <SearchDoctor 
          doctors={doctors} 
          onEdit={handleEdit} 
          onDelete={handleDeleteDoctor} 
        />
      )}
    </div>
  );
};

export default AdminPanel;