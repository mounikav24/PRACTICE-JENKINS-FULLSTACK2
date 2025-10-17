import React from 'react';

const Navigation = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="navigation">
      <button 
        className={`nav-btn ${activeTab === 'view' ? 'active' : ''}`}
        onClick={() => setActiveTab('view')}
      >
        View Doctor
      </button>
      <button 
        className={`nav-btn ${activeTab === 'add' ? 'active' : ''}`}
        onClick={() => setActiveTab('add')}
      >
        Add Doctor
      </button>
      <button 
        className={`nav-btn ${activeTab === 'search' ? 'active' : ''}`}
        onClick={() => setActiveTab('search')}
      >
        Search Doctor
      </button>
    </nav>
  );
};

export default Navigation;