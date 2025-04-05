import React from 'react';
import "../style/FormateursDetails.css"
  import { useDarkMode } from "../DarkModeProvider/DarkModeContext";


const FormateursDetails = () => {
    const { darkMode } = useDarkMode();

    const formateurs = [
        {
          code_formateur: 'F001',
          nom_formateur: 'Jean Dupont',
          modules: [
            {
              libelle_module: 'Mathématiques Avancées',
              groupes: ['G101', 'G102', 'G103']
            },
            {
              libelle_module: 'Algorithmique',
              groupes: ['G201', 'G202']
            }
          ],
          created_at: '2023-05-10T08:30:00Z',
          updated_at: '2023-06-15T14:20:00Z'
        }


      ];
    return (
    //   <div className="">
      <div className={darkMode ?"formateurs-container":"formateurs-container formateurs-container-dark"}>
        <div className='module-scrollable-content'>

       
        <h2>Détails de Formateur</h2>
        <div className="formateurs-list">
          {formateurs.map(formateur => (
            <div key={formateur.code_formateur} className="formateur-card">
              <h3>{formateur.nom_formateur} ({formateur.code_formateur})</h3>
              <p>
                <strong>Créé le:</strong> {new Date(formateur.created_at).toLocaleDateString('fr-FR')}<br />
                <strong>Mis à jour le:</strong> {new Date(formateur.updated_at).toLocaleDateString('fr-FR')}
              </p>
              
              <h4>Modules enseignés:</h4>
              <ul className="modules-list">
                {formateur.modules.map((module, index) => (
                  <li key={index}>
                    <strong>{module.libelle_module}</strong>
                    <div className="groupes-list">
                      Groupes: {module.groupes.join(', ')}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      </div>
    );
  };

  export default FormateursDetails ;