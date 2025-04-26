import { useState } from 'react';
import "../style/avencementFilieres.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from "../DarkModeProvider/DarkModeContext";
import { Button } from 'react-bootstrap';// onClick={toggleDarkMode}
// className="darkmode"
// aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
import { useNavigate } from 'react-router-dom';
const AvencementFiliere = () => {
  const navigate = useNavigate();

  const { darkMode } = useDarkMode();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 9;
  const lastPostindex = currentPage * postPerPage;
  const firstPostindex = lastPostindex - postPerPage;
  const [filters, setFilters] = useState({
    nom_filiere: '',
  });
  // Sample data - replace with your actual data
  const filieres_detels = [
    {
      code_filiere: 'INFO101',
      nom_filiere: 'Informatique Fondamentale',
      code_module: 'MOD101',
      taux_avancement: 75
    },
    {
      code_filiere: 'MECA202',
      nom_filiere: 'Génie Mécanique',
      code_module: 'MOD202',
      taux_avancement: 60
    },
    {
      code_filiere: 'ELEC303',
      nom_filiere: 'Génie Électrique',
      code_module: 'MOD303',
      taux_avancement: 80
    },
    {
      code_filiere: 'BIO404',
      nom_filiere: 'Biotechnologie',
      code_module: 'MOD404',
      taux_avancement: 45
    },
    {
      code_filiere: 'MARK505',
      nom_filiere: 'Marketing Digital',
      code_module: 'MOD505',
      taux_avancement: 70
    },
    {
      code_filiere: 'GEST606',
      nom_filiere: 'Gestion d\'Entreprise',
      code_module: 'MOD606',
      taux_avancement: 65
    },
    {
      code_filiere: 'DESI707',
      nom_filiere: 'Design Graphique',
      code_module: 'MOD707',
      taux_avancement: 55
    },
    {
      code_filiere: 'ARCH808',
      nom_filiere: 'Architecture',
      code_module: 'MOD808',
      taux_avancement: 85
    },
    {
      code_filiere: 'AGRO909',
      nom_filiere: 'Agronomie',
      code_module: 'MOD909',
      taux_avancement: 50
    },
    {
      code_filiere: 'DRO101',
      nom_filiere: 'Droit des Affaires',
      code_module: 'MOD110',
      taux_avancement: 75
    },
    {
      code_filiere: 'TOUR202',
      nom_filiere: 'Tourisme et Hôtellerie',
      code_module: 'MOD211',
      taux_avancement: 40
    },
    {
      code_filiere: 'MED303',
      nom_filiere: 'Médecine Générale',
      code_module: 'MOD312',
      taux_avancement: 90
    },
    {
      code_filiere: 'PHAR404',
      nom_filiere: 'Pharmacie',
      code_module: 'MOD413',
      taux_avancement: 70
    },
    {
      code_filiere: 'EDUC505',
      nom_filiere: 'Sciences de l\'Éducation',
      code_module: 'MOD514',
      taux_avancement: 60
    },
    {
      code_filiere: 'LANG606',
      nom_filiere: 'Linguistique Appliquée',
      code_module: 'MOD615',
      taux_avancement: 55
    }
  ];
  // nom filieres
  const filieres = [...new Set(filieres_detels.map(doc => doc.nom_filiere))];

  const filtercode_model_group_filiere_reg = filieres_detels.filter(doc => {
    return (
      (filters.nom_filiere === '' || doc.nom_filiere === filters.nom_filiere)
    );
  });

  const resetFilters = () => {
    setFilters({
      nom_filiere: '',

    })
  };
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setCurrentPage(1)
  }
  //  this is function use in iput update state 
  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  //   setCurrentPage(1)
  // };
  const filteredFiliere = filtercode_model_group_filiere_reg.filter(filiere =>
    filiere.nom_filiere.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredFilieresWithsplice = filteredFiliere.slice(firstPostindex, lastPostindex)

  return (
    <div className="container-fluid">
      <div className={darkMode?"avancements-h2":"avancements-h2 avancements-h2-dark-mode"}>
      <h2>Liste des avancements par Filières:</h2>
      </div>
      <div className="row">
        
        <div className="col-12">
          
          <div className={darkMode?"card-Filiere mb-4":"card-Filiere mb-4 card-Filiere-dark-mode"}>
         

            {/* <div className="card-body"> */}
            <div className={darkMode ? "card-body-Filiere" : "card-body-Filiere card-body-dark-filiere"}>
              {/* Niveau Filter */}
              <div className="filter-group">

                <input
               
                  list="filiere"
                  id="filiereFilter"
                  name="filiereFilter"
                  value={filters.nom_filiere}
                  onChange={(e) => handleFilterChange('nom_filiere', e.target.value)}
                  className="filter-select"
                  placeholder="filieres"
                />
                <datalist id="filiere">
                  {filieres.map(filiere => (
                    <option key={filiere} value={filiere} />
                  ))}

                </datalist>
              </div>
              {/* Reset Button */}
              <button onClick={resetFilters} className="reset-btn-filiere">
                Réinitialiser
              </button>
            </div>



            <div className="table-responsive">
              {/* <table className="table table-striped"> */}
              <table className={darkMode ? "table table-striped" : "table table-dark table-striped"}>
                <thead>
                  <tr>
                    <th>code filière</th>
                    <th>code module</th>
                    <th>taux avancement</th>
                    <th>action</th>

                  </tr>
                </thead>
                <tbody>
                  {filteredFilieresWithsplice.map((filiere) => (
                    <tr key={filiere.id}>
                      <td>{filiere.code_filiere}</td>
                      <td>{filiere.nom_filiere}</td>
                      <td>{filiere.taux_avancement}</td>
                      <td><button className='btn-Detail-filiere' onClick={() => navigate("/avancemnetGroup")}>Détails</button></td>
                      {/* <td>
                          <button className="btn btn-sm btn-outline-secondary">
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                        </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination-container-filiere">
                  <button
                    className="pagination-btn-filiere"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    Previous
                  </button>
                  <span className="current-page-filiere">Page {currentPage}</span>
                  <button
                    className="pagination-btn-filiere"
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    Next
                  </button>
                </div>
          </div>
        </div>
      </div>
    </div>
    // </div>

  )
}

export default AvencementFiliere;