import React from 'react';
import '../style/GroupDetails.css';
  import { useDarkMode } from "../DarkModeProvider/DarkModeContext";

const GroupDetails = () => {

    const { darkMode } = useDarkMode();

  const group = {
    code_filiere: 'INFO101',
    nom_filiere:"Devlopment degital",
    code_groupe: 'G300A',
    niveau: '1ère année',
    effectif: 25,
    annee_formation: 2023,
    status_groupe: 'active',
    mode: 'présentiel',
    creneau: 'CDJ',
    created_at: '2023-01-10T08:00:00Z',
    updated_at: '2023-06-15T14:30:00Z',
    formateurs: [
      { 
        code_formateur: 'F001', 
        nom_formateur: 'Jean Dupont',
        modules: [
          { code_module: 'MATH101', libelle_module: 'Mathématiques Avancées', mh_presentiel: 30, mh_distance: 15 },
          { code_module: 'PROG101', libelle_module: 'Programmation Fondamentale', mh_presentiel: 40, mh_distance: 20 }
        ]
      },
      { 
        code_formateur: 'F002', 
        nom_formateur: 'Marie Lambert',
        modules: [
          { code_module: 'PROG101', libelle_module: 'Programmation Fondamentale', mh_presentiel: 40, mh_distance: 20 }
        ]
      }
    ],
    modules: [
      { code_module: 'MATH101', libelle_module: 'Mathématiques Avancées' },
      { code_module: 'PROG101', libelle_module: 'Programmation Fondamentale' }
    ]
  };

  return (
    // <div className="group-details-page">
    <div className={darkMode ?"group-details-page":"group-details-page group-details-page-darkmode"}>
      {/* Fixed Header */}
      <header className="group-header">
        <div className="header-content">
          <h1>{group.code_groupe}</h1>
          <div className="header-meta">
            <span className={`status-badge ${group.status_groupe}`}>
              {group.status_groupe === 'active' ? 'Actif' : 'Inactif'}
            </span>
            <span className="filiere-badge">{group.code_filiere}</span>
          </div>
        </div>
        
        <div className="header-stats">
          <div className="stat-card">
            {/* <h3>Niveau:</h3>
            <p>{group.niveau}</p> */}
            Niveau : {group.niveau}
          </div>
          <div className="stat-card">
            {/* <h3>Effectif:</h3>
            <p>{group.effectif} étudiants</p> */}
            Effectif : {group.effectif} étudiants
          </div>
          <div className="stat-card">
            {/* <h3>Année:</h3>
            <p>{group.annee_formation}</p> */}
            Année : {group.annee_formation}
          </div>
          <div className="stat-card">
            {/* <h3>Mode:</h3>
            <p>{group.mode}</p> */}
            Mode : {group.mode}
          </div>
          <div className="stat-card">
            {/* <h3>Créneau:</h3>
            <p>{group.creneau}</p> */}
            Créneau : {group.creneau}
          </div>
          <div className="stat-card">
            {/* <h3>Filiere:</h3>
            <p>{group.nom_filiere}</p> */}
            Filiere : {group.nom_filiere}
          </div>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="group-content">
        {/* Enhanced Formateurs Section with Modules */}
        <section className="content-section">
          <h2>
            <i className="fas fa-chalkboard-teacher"></i> Formateurs et Modules
          </h2>
          <div className="formateurs-modules-container">
            {group.formateurs.map(formateur => (
              <div key={formateur.code_formateur} className={darkMode ?"formateur-module-card":"formateur-module-card formateur-module-card-darkmode"}>
                <div className="formateur-header">
                  <h3>{formateur.nom_formateur}</h3>
                  <p className="formateur-code">{formateur.code_formateur}</p>
                </div>
                
                <div className="modules-taught">
                  <h4>Modules enseignés:</h4>
                  <ul>
                    {formateur.modules.map(module => (
                      <li key={module.code_module} className={darkMode ?"module-item":"module-item module-item-darkmode"}>
                        <div className="module-info">
                          <span className="module-name">{module.libelle_module}</span>
                          <span className="module-code">{module.code_module}</span>
                        </div>
                        <div className="module-hours">
                          <span>Présentiel: {module.mh_presentiel}h</span>
                          <span>Distance: {module.mh_distance}h</span>
                          <span>Total: {module.mh_presentiel + module.mh_distance}h</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* <div className="formateur-actions">
                  <button className="action-btn">
                    <i className="fas fa-envelope"></i> Contacter
                  </button>
                  <button className="action-btn">
                    <i className="fas fa-calendar-alt"></i> Disponibilité
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        </section>

        {/* History Section */}
        <section className="content-section">
          <h2>
            <i className="fas fa-history"></i> Historique
          </h2>
          <div className="history-timeline">
            <div className="timeline-item">
              <div className="timeline-date">
                {new Date(group.created_at).toLocaleDateString('fr-FR')}
              </div>
              <div className={darkMode ?"timeline-content":"timeline-content timeline-content-darkmode"}>
                <h3>Création du groupe</h3>
                <p>Groupe créé dans le système</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">
                {new Date(group.updated_at).toLocaleDateString('fr-FR')}
              </div>
              <div className={darkMode ?"timeline-content":"timeline-content timeline-content-darkmode"}>
                <h3>Dernière mise à jour</h3>
                <p>Modification des informations</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default GroupDetails;