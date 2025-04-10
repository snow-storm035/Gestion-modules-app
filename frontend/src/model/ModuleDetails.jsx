import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/ModuleDetails.css';
  import { useDarkMode } from "../DarkModeProvider/DarkModeContext";
  

const ModuleDetails = () => {
    const { darkMode } = useDarkMode();

  const { id } = useParams();
  const navigate = useNavigate();
  
  // Sample data - replace with actual API call
  const moduleData = {
    id: 1,
    code_module: 'MATH101',
    libelle_module: 'Algorithem',
    code_filiere: 'CS101',
    regional: 'O',
    status: 'active',
    
    // Hours data
    nbh_p_s1: 30,
    nbh_sync_s1: 15,
    nbh_async_s1: 15,
    nbh_total_s1: 60,
    
    nbh_p_s2: 35,
    nbh_sync_s2: 15,
    nbh_async_s2: 10,
    nbh_total_s2: 60,
    
    nbh_p_total: 65,
    nbh_sync_total: 30,
    nbh_async_total: 25,
    nbh_total_global: 120,
    
    // New date fields (nullable)
    date_efm_normal: '2023-06-15', // Example normal exam date (YYYY-MM-DD format)
    date_efm_rattrapage: '2023-07-05', // Example retake exam date
    
    // Timestamps
    created_at: '2023-05-15T10:00:00Z',
    updated_at: '2023-05-20T14:30:00Z'
  };

  return (
    // <div className="module-details-container">
    <div className={darkMode ?"module-details-container":"module-details-container module-details-container-dark"}>
        <div className="module-scrollable-content">
      <div className="module-header">
        <h1>{moduleData.libelle_module}</h1>
        <div className="module-code">{moduleData.code_module}</div>
      </div>
      
      <div className="details-card">
        <h2 className="section-title">Basic Information</h2>
        <div className="detail-grid">
          <div className="detail-item">
            <div className="detail-label">Filiere Code</div>
            <div className="detail-value">{moduleData.code_filiere}</div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Regional</div>
            <div className="detail-value">
              {moduleData.regional === 'O' ? 'OUI' : 'NON'}
            </div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Status</div>
            <div className={`status-badge ${moduleData.status === 'active' ? 'status-active' : 'status-inactive'}`}>
              {moduleData.status}
            </div>
          </div>
   
          <div className="detail-item">
            <div className="detail-label">Date EFM Normal</div>
            <div className="detail-value">
              {/* {moduleData.date_efm_normal ? 'OUI' : 'NON'} */}
              {moduleData.date_efm_normal ? new Date(moduleData.date_efm_normal).toLocaleDateString():"pas encore définit"}
            </div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Date EFM Rattrapage</div>
            <div className="detail-value">
              {/* {moduleData.regional === 'O' ? 'OUI' : 'NON'} */}
              {moduleData.date_efm_rattrapage ? new Date(moduleData.date_efm_rattrapage).toLocaleDateString():"pas encore définit"}
            </div>

          </div>

        </div>
      </div>
      
      <div className="details-card">
        <h2 className="section-title">Semester 1 Hours</h2>
        <div className="detail-grid">
          <div className="detail-item">
            <div className="detail-label">Presentiel Hours</div>
            <div className="detail-value">{moduleData.nbh_p_s1}h</div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Synchronous Hours</div>
            <div className="detail-value">{moduleData.nbh_sync_s1}h</div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Asynchronous Hours</div>
            <div className="detail-value">{moduleData.nbh_async_s1}h</div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Total Hours</div>
            <div className="detail-value">{moduleData.nbh_total_s1}h</div>
          </div>
        </div>
      </div>
      
      <div className="details-card">
        <h2 className="section-title">Semester 2 Hours</h2>
        <div className="detail-grid">
          <div className="detail-item">
            <div className="detail-label">Presentiel Hours</div>
            <div className="detail-value">{moduleData.nbh_p_s2}h</div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Synchronous Hours</div>
            <div className="detail-value">{moduleData.nbh_sync_s2}h</div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Asynchronous Hours</div>
            <div className="detail-value">{moduleData.nbh_async_s2}h</div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Total Hours</div>
            <div className="detail-value">{moduleData.nbh_total_s2}h</div>
          </div>
        </div>
      </div>
      
      <div className="details-card">
        <h2 className="section-title">Global Totals</h2>
        <div className="detail-grid">
          <div className="detail-item">
            <div className="detail-label">Total Presentiel</div>
            <div className="detail-value">{moduleData.nbh_p_total}h</div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Total Synchronous</div>
            <div className="detail-value">{moduleData.nbh_sync_total}h</div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Total Asynchronous</div>
            <div className="detail-value">{moduleData.nbh_async_total}h</div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Global Total</div>
            <div className="detail-value">{moduleData.nbh_total_global}h</div>
          </div>
        </div>
      </div>
      
      <button className="back-button" onClick={() => navigate(-1)}>
        Back to Modules List
      </button>
    </div>
    </div>
  );
};

export default ModuleDetails;