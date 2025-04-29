

import React, { useState } from 'react';
import { FaChartLine, FaCalendarAlt, FaChalkboardTeacher, FaBook, FaUsers, FaCheckCircle, FaTimesCircle, FaClipboardCheck, FaSave, FaEdit } from 'react-icons/fa';
import "../style/AvancementDetails.css";
import { useDarkMode } from '../DarkModeProvider/DarkModeContext';
const AvancementDetails = ({ moduleData }) => {
const {darkMode}=useDarkMode();
  const [GroupDet, setGroupDet] = useState({
    id: 10,
    groupe: {
      code: 'GRP10',
      nom: 'Groupe J',
      annee_formation: '2024-2025'
    },
    module: {
      code: 'M310',
      nom: 'Docker & Kubernetes'
    },
    filière: {
      code: 'FIL109',
      nom: 'Gestion de Projet'
    },
    nbh_par_semaine_realisee: 3,
    efm_realise: false,
    date_debut: '2025/03/01',
    date_fin: null,
    nbhp_realisee: 50,
    nbhsync_realisee: 10,
    nbh_total_realisee: 60,
    recommandation: 5,
    contrôle_continue_réalisé: 1,
    masse_horaire: {
      présentielle: 90,
      synchrone: 30,
      totale: 120
    }
  });

  const [nweHoures, setNweHoures] = useState(GroupDet.nbh_par_semaine_realisee);
  const [isEditing, setIsEditing] = useState(false);

  const handlesouvgarder = () => {
    if (!(isNaN(nweHoures) && nweHoures !== 0)) {
      setGroupDet((prv) => ({ ...prv, nbh_par_semaine_realisee: nweHoures }));
      setIsEditing(false);
    }
  };

  const handelModifier = () => {
    setIsEditing(true);
  };

  return (
    <div className="avancement-container">
      {/* Top Section */}
      <div className={darkMode?"top-section":"top-section top-section-dark-mode-section"} >
        <h1 className="page-title color-all-text">Groupe : {GroupDet.groupe.code}</h1>

        <div className="stats-grid">
          {/* Module Information */}
          <div className="stat-card">
            <div className="stat-icon">
              <FaBook />
            </div>
            <div className="stat-content">
              <h3 className='color-all-text'>Module</h3>
              <p className='color-all-text'>{GroupDet.module.code || 'Not specified'}</p>
              <p className="subtext color-all-text">{GroupDet.module.nom}</p>
            </div>
          </div>

          {/* Formateur Information - Removed as not in new structure */}
          <div className="stat-card">
            <div className="stat-icon">
              <FaChalkboardTeacher />
            </div>
            <div className="stat-content">
              <h3 className='color-all-text'>Filière</h3>
              <p className='color-all-text'>{GroupDet.filière.code || 'Not specified'}</p>
              <p className="subtext color-all-text">{GroupDet.filière.nom}</p>
            </div>
          </div>

          {/* Groupe Information */}
          <div className="stat-card">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <div className="stat-content">
              <h3 className='color-all-text'>Groupe</h3>
              <p className='color-all-text'>{GroupDet.groupe.code || 'Not specified'}</p>
              <p className="subtext color-all-text">{GroupDet.groupe.nom}</p>
            </div>
          </div>
          {/* Contrôle Continue Information */}
          <div className="stat-card">
            <div className="stat-icon">
              <FaClipboardCheck />
            </div>
            <div className="stat-content">
              <h3 className='color-all-text'>Contrôle Continue</h3>
              <p className="highlight color-all-text">{GroupDet.contrôle_continue_réalisé}</p>
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
                date debut: {GroupDet.date_debut
                  ? new Date(GroupDet.date_debut).toLocaleDateString()
                  : 'No start date'}
              </p>
              <p className='color-all-text'>
                date fin: {GroupDet.date_fin
                  ? new Date(GroupDet.date_fin).toLocaleDateString()
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
                  <p className="highlight color-all-text">{GroupDet.nbh_par_semaine_realisee} h</p>
                </div>
                <div>
                  <p className='color-all-text'>Presential</p>
                  <p className="highlight color-all-text">{GroupDet.nbhp_realisee} h</p>
                </div>
                <div>
                  <p className='color-all-text'>Sync</p>
                  <p className="highlight color-all-text">{GroupDet.nbhsync_realisee} h</p>
                </div>
                <div>
                  <p className='color-all-text'>Total</p>
                  <p className="highlight color-all-text">{GroupDet.nbh_total_realisee} h</p>
                </div>
              </div>
            </div>
          </div>

          {/* EFM Status */}
          <div className="stat-card">
            <div className="stat-icon">
              {GroupDet.efm_realise ? <FaCheckCircle /> : <FaTimesCircle />}
            </div>
            <div className="stat-content">
              <h3 className='color-all-text'>EFM Status</h3>
              <p className={GroupDet.efm_realise ? 'status-completed color-all-text' : 'status-pending color-all-text'}>
                {GroupDet.efm_realise ? 'Completed' : 'Pending'}
              </p>
              <p className="subtext color-all-text">CC: {GroupDet.contrôle_continue_réalisé}</p>
            </div>
          </div>

          {/* Masse Horaire Information */}
          <div className="stat-card wide">
            <div className="stat-icon">
              <FaChartLine />
            </div>
            <div className="stat-content">
              <h3 className='color-all-text'>Masse Horaire</h3>
              <div className="hours-grid">
                <div>
                  <p className='color-all-text'>Présentielle</p>
                  <p className="highlight color-all-text">{GroupDet.masse_horaire.présentielle} h</p>
                </div>
                <div>
                  <p className='color-all-text'>Synchrone</p>
                  <p className="highlight color-all-text">{GroupDet.masse_horaire.synchrone} h</p>
                </div>
                <div>
                  <p className='color-all-text'>Totale</p>
                  <p className="highlight color-all-text">{GroupDet.masse_horaire.totale} h</p>
                </div>
              </div>
            </div>
          </div>
          {/* &apos; */}
          {/* Hours Modification Section */}
          <div className={darkMode?"hours-modification-section ":"hours-modification-section hours-modification-section-dark-mode"}>
            <h3 className='color-all-text'>Modifier Nombre  d&apos;heures par semaine :</h3>
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
                  <span className="current-hours">{GroupDet.nbh_par_semaine_realisee} heures</span>
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