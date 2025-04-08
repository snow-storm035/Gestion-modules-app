import React from 'react';
import { FaChartLine, FaCalendarAlt, FaChalkboardTeacher, FaBook, FaUsers, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import "../style/Avancement.css";

const Avancement = ({ moduleData }) => {
  // Sample data structure matching your schema
  const defaultData = {
    id: 1,
    code_module: '300',
    code_filiere: '',
    code_formateur: 'none',
    code_groupe: '',
    nbh_par_semaine_realisee: 2.5,
    date_debut: null,
    date_fin: null,
    nbhp_realisee: 0,
    nbhsync_realisee: 0,
    nbh_total_realisee: 0,
    nbcc_realisee: 0,
    efm_realise: 'non',
    regionale: 'NON',
    mh_presentiel: 7,
    mh_distance: 4,
    nombre_total: 3,
    ...moduleData // Override with passed props
  };

  return (
    <div className="avancement-container">
      {/* Top Section */}
      <div className="top-section">
        <h1 className="page-title">Module Progress Tracking</h1>
        
        <div className="stats-grid">
          {/* Module Information */}
          <div className="stat-card">
            <div className="stat-icon">
              <FaBook />
            </div>
            <div className="stat-content">
              <h3>Module</h3>
              <p>{defaultData.code_module || 'Not specified'}</p>
              <p className="subtext">{defaultData.code_filiere || 'No filiere'}</p>
            </div>
          </div>

          {/* Formateur Information */}
          <div className="stat-card">
            <div className="stat-icon">
              <FaChalkboardTeacher />
            </div>
            <div className="stat-content">
              <h3>Formateur</h3>
              <p>{defaultData.code_formateur === 'none' ? 'Not assigned' : defaultData.code_formateur}</p>
            </div>
          </div>

          {/* Groupe Information */}
          <div className="stat-card">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <div className="stat-content">
              <h3>Groupe</h3>
              <p>{defaultData.code_groupe || 'Not specified'}</p>
            </div>
          </div>

          {/* Schedule Information */}
          <div className="stat-card">
            <div className="stat-icon">
              <FaCalendarAlt />
            </div>
            <div className="stat-content">
              <h3>Schedule</h3>
              <p>
                {defaultData.date_debut 
                  ? new Date(defaultData.date_debut).toLocaleDateString() 
                  : 'No start date'}
              </p>
              <p className="subtext">
                {defaultData.date_fin 
                  ? new Date(defaultData.date_fin).toLocaleDateString() 
                  : 'No end date'}
              </p>
            </div>
          </div>

          {/* Hours Information */}
          <div className="stat-card wide">
            <div className="stat-icon">
              <FaChartLine />
            </div>
            <div className="stat-content">
              <h3>Hours Completed</h3>
              <div className="hours-grid">
                <div>
                  <p>Weekly</p>
                  <p className="highlight">{defaultData.nbh_par_semaine_realisee} h</p>
                </div>
                <div>
                  <p>Presential</p>
                  <p className="highlight">{defaultData.nbhp_realisee} h</p>
                </div>
                <div>
                  <p>Sync</p>
                  <p className="highlight">{defaultData.nbhsync_realisee} h</p>
                </div>
                <div>
                  <p>Total</p>
                  <p className="highlight">{defaultData.nbh_total_realisee} h</p>
                </div>
              </div>
            </div>
          </div>

          {/* EFM Status */}
          <div className="stat-card">
            <div className="stat-icon">
              {defaultData.efm_realise === 'oui' ? <FaCheckCircle /> : <FaTimesCircle />}
            </div>
            <div className="stat-content">
              <h3>EFM Status</h3>
              <p className={defaultData.efm_realise === 'oui' ? 'status-completed' : 'status-pending'}>
                {defaultData.efm_realise === 'oui' ? 'Completed' : 'Pending'}
              </p>
              <p className="subtext">CC: {defaultData.nbcc_realisee}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of your dashboard content can go here */}
      {/* You can include your existing DashboardAvencement component */}
    </div>
  );
};

export default Avancement;