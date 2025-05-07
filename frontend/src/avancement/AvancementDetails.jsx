import React, { useState, useEffect } from 'react';
import { FaChartLine, FaCalendarAlt, FaChalkboardTeacher, FaBook, FaUsers, FaCheckCircle, FaTimesCircle, FaClipboardCheck, FaSave, FaEdit } from 'react-icons/fa';
import "../style/AvancementDetails.css";
import { useDarkMode } from '../DarkModeProvider/DarkModeContext';
import { useParams } from 'react-router-dom';
import apiService from '../Axios/apiService';

const AvancementDetails = () => {
  const { darkMode } = useDarkMode();
  const { groupe, module } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avancement, setAvancement] = useState(null);
  const [nweHoures, setNweHoures] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await apiService.getCsrfCookie();
        const response = await apiService.getAvancement(groupe, module);
        setAvancement(response.avancement);
        setNweHoures(response.avancement.nbh_par_semaine_total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [groupe, module]);

  
  const handlesouvgarder = async () => {
    if (!isNaN(nweHoures) && nweHoures !== 0) {
      try {
        await apiService.changeNbHeures({
          avancement: {
            code_module: module,
            code_groupe: groupe,
            matricule: avancement.matricule,
          },
          nbh_par_semaine: nweHoures,
        });
  
        // Fetch the updated data
        await apiService.getCsrfCookie();
        const response = await apiService.getAvancement(groupe, module);
        setAvancement(response.avancement);
        setNweHoures(response.avancement.nbh_par_semaine_total);
  
        setIsEditing(false);
        alert('Les heures ont été mises à jour avec succès.');
      } catch (err) {
        setError(err.message || 'Erreur lors de la mise à jour des heures.');
      }
    }
  };
  
  
  

  // const handlesouvgarder = () => {
  //   if (!(isNaN(nweHoures) && nweHoures !== 0)) {
  //     setAvancement(prev => ({ ...prev, nbh_par_semaine_total: nweHoures }));
  //     setIsEditing(false);
  //     // Here you would typically call an API to save the changes
  //   }
  // };

  const handelModifier = () => {
    setIsEditing(true);
  };

  if (loading) return <div className="avancement-container">Loading...</div>;
  if (error) return <div className="avancement-container">Error: {error}</div>;
  if (!avancement) return <div className="avancement-container">No data found</div>;

  return (
    <div className="avancement-container">
      <div className={darkMode ? "top-section" : "top-section top-section-dark-mode-section"}>
        <h1 className="page-title color-all-text">Groupe : {avancement.code_groupe}</h1>

        <div className="stats-grid">
          {/* Module Information */}
          <div className="stat-card">
            <div className="stat-icon">
              <FaBook />
            </div>
            <div className="stat-content">
              <h3 className='color-all-text'>Module</h3>
              <p className='color-all-text'>{avancement.code_module || 'Not specified'}</p>
            </div>
          </div>

          {/* Filière Information */}
          <div className="stat-card">
            <div className="stat-icon">
              <FaChalkboardTeacher />
            </div>
            <div className="stat-content">
              <h3 className='color-all-text'>Filière</h3>
              <p className='color-all-text'>{avancement.code_filiere || 'Not specified'}</p>
            </div>
          </div>

          {/* Groupe Information */}
          <div className="stat-card">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <div className="stat-content">
              <h3 className='color-all-text'>Groupe</h3>
              <p className='color-all-text'>{avancement.code_groupe || 'Not specified'}</p>
            </div>
          </div>

          {/* Contrôle Continue Information */}
          <div className="stat-card">
            <div className="stat-icon">
              <FaClipboardCheck />
            </div>
            <div className="stat-content">
              <h3 className='color-all-text'>Contrôle Continue</h3>
              <p className="highlight color-all-text">{avancement.nbcc_realisee}</p>
              <p className="subtext color-all-text">Réalisé(s)</p>
            </div>
          </div>

          {/* Schedule Information */}
          <div className="stat-card">
            <div className="stat-icon">
              <FaCalendarAlt />
            </div>
            <div className="stat-content">
              <h3 className='color-all-text'>Schedule</h3>
              <p className='color-all-text'>
                date debut: {avancement.debut_module
                  ? new Date(avancement.debut_module).toLocaleDateString()
                  : 'No start date'}
              </p>
              <p className='color-all-text'>
                date fin: {avancement.fin_module
                  ? new Date(avancement.fin_module).toLocaleDateString()
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
              <h3 className='color-all-text'>Hours Completed</h3>
              <div className="hours-grid">
                <div>
                  <p className='color-all-text'>Weekly</p>
                  <p className="highlight color-all-text">{avancement.nbh_par_semaine_total} h</p>
                </div>
                <div>
                  <p className='color-all-text'>Presential</p>
                  <p className="highlight color-all-text">{avancement.nbhp_realisee} h</p>
                </div>
                <div>
                  <p className='color-all-text'>Sync</p>
                  <p className="highlight color-all-text">{avancement.nbhsync_realisee} h</p>
                </div>
                <div>
                  <p className='color-all-text'>Total</p>
                  <p className="highlight color-all-text">{avancement.nbh_total_realisee} h</p>
                </div>
              </div>
            </div>
          </div>

          {/* EFM Status */}
          <div className="stat-card">
            <div className="stat-icon">
              {avancement.efm_realise === "oui" ? <FaCheckCircle /> : <FaTimesCircle />}
            </div>
            <div className="stat-content">
              <h3 className='color-all-text'>EFM Status</h3>
              <p className={avancement.efm_realise === "oui" ? 'status-completed color-all-text' : 'status-pending color-all-text'}>
                {avancement.efm_realise === "oui" ? 'Completed' : 'Pending'}
              </p>
              <p className="subtext color-all-text">CC: {avancement.nbcc_realisee}</p>
            </div>
          </div>

          {/* Hours Modification Section */}
          <div className={darkMode ? "hours-modification-section" : "hours-modification-section hours-modification-section-dark-mode"}>
            <h3 className='color-all-text'>Modifier Nombre d&apos;heures par semaine :</h3>
            <div className="hours-modification-controls">
              {isEditing ? (
                <>
                  <input
                    type="number"
                    value={nweHoures}
                    onChange={(e) => setNweHoures(Number(e.target.value))}
                    min="1"
                    className="hours-input"
                  />
                  <button className="btn-save-hours" onClick={handlesouvgarder}>
                    <FaSave /> Enregistrer
                  </button>
                </>
              ) : (
                <>
                  <span className="current-hours">{avancement.nbh_par_semaine_total} heures</span>
                  <button className="btn-modifier-hours" onClick={handelModifier}>
                    <FaEdit /> Modifier
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvancementDetails;
