import { useEffect, useState } from 'react';
import { FaChalkboardTeacher, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';// import { useState } from 'react';
import "../style/AvancemnetGroup.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from "../DarkModeProvider/DarkModeContext";
import { Button } from 'react-bootstrap';// onClick={toggleDarkMode}
// className="darkmode"
// aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
import { useNavigate } from 'react-router-dom';
import apiService from '../Axios/apiService';
const AvancemnetGroup = () => {
  const [avvecwww, setAvvecwww] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { darkMode } = useDarkMode();


  // const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 8;
  const lastPostindex = currentPage * postPerPage;
  const firstPostindex = lastPostindex - postPerPage;


        // Data fetching
        useEffect(() => {
          console.log("avencement;'")
          const fetchData = async () => {
              try {
                  setLoading(true);
                  await apiService.getCsrfCookie();
                  const response = await apiService.getAvancements();
                  console.log("getAvancements:",response.avancements.data)
                  // setAvvecwww(response. || []);
                  // console.log("alerts:",alerts)
              } catch (err) {
                  setError(err.message);
                  console.error('Error fetching data:', err);
              } finally {
                  setLoading(false);
              }
          };
  
          fetchData();
      }, []); // Empty dependency array means it runs once on mount
      
 
        //   end code fetch data

  // Sample data - replace with your actual data


  const documentsAvencemnet = [
    {
      id: 1,
      filière: { code: 'FIL101', nom: 'Développement Digital' },
      module: { code: 'M301', nom: 'JavaScript Avancé' },
      groupe: { code: 'GRP01', nom: 'Groupe A', annee_formation: '2023-2024' },
      formateur: { code: 'FORM001', nom: 'Ahmed Khan', spécialité: 'Frontend', statut: 'Interne' },
      niveau: 'TS',
      nbh_par_semaine_realisee: 4.0,
      date_debut: '2023-09-01',
      date_fin: '2023-12-15',
      taux_realise: 82.5,
      semestre:"S1"
      
    },
    {
      id: 2,
      filière: { code: 'FIL102', nom: 'Réseaux Informatiques' },
      module: { code: 'M302', nom: 'Cisco CCNA' },
      groupe: { code: 'GRP02', nom: 'Groupe B', annee_formation: '2023-2024' },
      formateur: { code: 'FORM002', nom: 'Marie Dupont', spécialité: 'Réseaux', statut: 'Externe' },
      niveau: 'T',
      nbh_par_semaine_realisee: 3.5,
      date_debut: '2023-10-01',
      date_fin: '2024-01-20',
      taux_realise: 68.3,
      semestre:"S1"
    },
    {
      id: 3,
      filière: { code: 'FIL103', nom: 'Data Science' },
      module: { code: 'M303', nom: 'Machine Learning' },
      groupe: { code: 'GRP03', nom: 'Groupe C', annee_formation: '2023-2024' },
      formateur: { code: 'FORM003', nom: 'Carlos Silva', spécialité: 'AI', statut: 'Interne' },
      niveau: 'TS',
      nbh_par_semaine_realisee: 5.0,
      date_debut: '2023-11-01',
      date_fin: '2024-02-10',
      taux_realise: 91.2,
      semestre:"S2"
    },
    {
      id: 4,
      filière: { code: 'FIL104', nom: 'Design Graphique' },
      module: { code: 'M304', nom: 'UI/UX Design' },
      groupe: { code: 'GRP04', nom: 'Groupe D', annee_formation: '2024-2025' },
      formateur: { code: 'FORM004', nom: 'Sophie Martin', spécialité: 'Design', statut: 'Externe' },
      niveau: 'T',
      nbh_par_semaine_realisee: 2.5,
      date_debut: '2024-01-15',
      date_fin: '2024-04-30',
      taux_realise: 75.0,
      semestre:"S1"
    },
    {
      id: 5,
      filière: { code: 'FIL105', nom: 'Marketing Digital' },
      module: { code: 'M305', nom: 'SEO Avancé' },
      groupe: { code: 'GRP05', nom: 'Groupe E', annee_formation: '2024-2025' },
      formateur: { code: 'FORM005', nom: 'John Smith', spécialité: 'Marketing', statut: 'Interne' },
      niveau: 'TS',
      nbh_par_semaine_realisee: 3.0,
      date_debut: '2024-02-01',
      date_fin: '2024-05-15',
      taux_realise: 60.8,
      semestre:"S1"
    },
    {
      id: 6,
      filière: { code: 'FIL106', nom: 'Bureautique' },
      module: { code: 'M306', nom: 'Excel Expert' },
      groupe: { code: 'GRP06', nom: 'Groupe F', annee_formation: '2024-2025' },
      formateur: { code: 'FORM006', nom: 'Fatima Zahra', spécialité: 'Bureautique', statut: 'Interne' },
      niveau: 'T',
      nbh_par_semaine_realisee: 2.0,
      date_debut: '2024-03-10',
      date_fin: '2024-06-20',
      taux_realise: 45.5,
      semestre:"S1"
    },
    {
      id: 7,
      filière: { code: 'FIL107', nom: 'Cloud Computing' },
      module: { code: 'M307', nom: 'AWS Solutions' },
      groupe: { code: 'GRP07', nom: 'Groupe G', annee_formation: '2024-2025' },
      formateur: { code: 'FORM007', nom: 'David Wilson', spécialité: 'Cloud', statut: 'Externe' },
      niveau: 'TS',
      nbh_par_semaine_realisee: 4.5,
      date_debut: '2024-04-05',
      date_fin: '2024-07-10',
      taux_realise: 88.7,
      semestre:"S1"
    },
    {
      id: 8,
      filière: { code: 'FIL108', nom: 'Cybersécurité' },
      module: { code: 'M308', nom: 'Ethical Hacking' },
      groupe: { code: 'GRP08', nom: 'Groupe H', annee_formation: '2024-2025' },
      formateur: { code: 'FORM008', nom: 'Elena Petrova', spécialité: 'Sécurité', statut: 'Externe' },
      niveau: 'TS',
      nbh_par_semaine_realisee: 5.0,
      date_debut: '2024-05-01',
      date_fin: '2024-08-15',
      taux_realise: 95.3,
      semestre:"S2"
    },
    {
      id: 9,
      filière: { code: 'FIL109', nom: 'Gestion de Projet' },
      module: { code: 'M309', nom: 'Agile Scrum' },
      groupe: { code: 'GRP09', nom: 'Groupe I', annee_formation: '2024-2025' },
      formateur: { code: 'FORM009', nom: 'Mohammed Ali', spécialité: 'Management', statut: 'Interne' },
      niveau: 'T',
      nbh_par_semaine_realisee: 3.5,
      date_debut: '2024-06-01',
      date_fin: '2024-09-10',
      taux_realise: 72.1,
      semestre:"S2"
    },
    {
      id: 10,
      filière: { code: 'FIL110', nom: 'DevOps' },
      module: { code: 'M310', nom: 'Docker & Kubernetes' },
      groupe: { code: 'GRP10', nom: 'Groupe J', annee_formation: '2024-2025' },
      formateur: { code: 'FORM010', nom: 'Lina Chen', spécialité: 'DevOps', statut: 'Externe' },
      niveau: 'TS',
      nbh_par_semaine_realisee: 4.0,
      date_debut: '2024-07-01',
      date_fin: '2024-10-15',
      taux_realise: 79.9,
      semestre:"S1"
    }
  ];

    // Extract unique values for filters
    const filieres = [...new Set(documentsAvencemnet.map(doc => doc.filière.nom))];
    const modules = [...new Set(documentsAvencemnet.map(doc => doc.module.nom))];
    const groupes = [...new Set(documentsAvencemnet.map(doc => doc.groupe.nom))];
    const annee_formation = [...new Set(documentsAvencemnet.map(doc => doc.groupe.annee_formation))];
    const niveaux = ['TS', 'T'];
    const semestre = ['S1', 'S2'];
    const formateurs = [...new Set(documentsAvencemnet.map(doc => doc.formateur.nom))];
  
  const [filters, setFilters] = useState({
    filiere: '',
    module: '',
    groupe: '',
    niveau: '',
    formateur: '',
    annee_formation: '',
    semestre:''
    
  });


  // Filter function
  const filterFiliereModuleGroupniveauFourmateur = documentsAvencemnet.filter(doc => {
    return (
      (filters.filiere === '' || doc.filière.nom === filters.filiere) &&
      (filters.module === '' || doc.module.nom === filters.module) &&
      (filters.groupe === '' || doc.groupe.nom === filters.groupe) &&
      (filters.niveau === '' || doc.niveau === filters.niveau) &&
      (filters.formateur === '' || doc.formateur.nom === filters.formateur) &&
      (filters.annee_formation === '' || doc.groupe.annee_formation === filters.annee_formation)&&
      (filters.semestre === '' || doc.semestre === filters.semestre)
    );
  });
  // Handle filter change
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setCurrentPage(1)
  }
  // }
  // Reset all filters
  const resetFilters = () => {
    setFilters({
      filiere: '',
      module: '',
      groupe: '',
      niveau: '',
      annee_formation: '',
      formateur: '',
      semestre:''
    });
  };
  // code fellter by toux realise 
  // const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  console.log("filteredavoncesWithsplice####dddddddddddddddddddddddddddddd###############")
  const [sortDirection, setSortDirection] = useState('desc');

  const toggleSort = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const sortedDocuments = [...filterFiliereModuleGroupniveauFourmateur].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a.taux_realise - b.taux_realise;
    } else {
      return b.taux_realise - a.taux_realise;
    }
  });

  // Apply sorting to filtered documents


  const filteredavoncesWithsplice = sortedDocuments.slice(firstPostindex, lastPostindex)
  // console.log("filteredavoncesWithsplice################################################")
  // console.log(filteredavoncesWithsplice)
  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <>

      <div className="container-fluid-avancement">
        {/* <div className="filter-container"> */}
        <div className={darkMode ? "filter-container" : "filter-container filter-container-darkmode"}>
          <h2>Liste des avancements par groupe:</h2>
          <div className="filter-controls">
            {/* Filière Filter */}
            
            <div className="filter-group">
              <input
                list="filiere"
                id="filiereFilter"
                name="filiereFilter"
                value={filters.filiere}
                onChange={(e) => handleFilterChange('filiere', e.target.value)}
                className="filter-select"
                placeholder="filieres"
              />
              <datalist id="filiere">
                {filieres.map(module => (
                  <option key={module} value={module} />
                ))}

              </datalist>
            </div>


            {/* Module Filter */}


            <div className="filter-group">
              <input
                list="modules"
                id="modulesFilter"
                name="modulesFilter"
                value={filters.module}
                onChange={(e) => handleFilterChange('module', e.target.value)}
                className="filter-select"
                placeholder="modules"
              />
              <datalist id="modules">
                {modules.map(module => (
                  <option key={module} value={module} />
                ))}

              </datalist>
            </div>

            {/* Groupe Filter */}


            <div className="filter-group">
              <input
                list="groupes"
                id="groupesFilter"
                name="groupesFilter"
                value={filters.groupe}
                onChange={(e) => handleFilterChange('groupe', e.target.value)}
                className="filter-select"
                placeholder="groupes"
              />
              <datalist id="groupes">
                {groupes.map(groupe => (
                  <option key={groupe} value={groupe} />
                ))}

              </datalist>
            </div>


            {/* annee_formation Filter */}

            <div className="filter-group">
              <input
                list="annee_formation"
                id="annee_formationFilter"
                name="annee_formationFilter"
                value={filters.annee_formation}
                onChange={(e) => handleFilterChange('annee_formation', e.target.value)}
                className="filter-select"
                placeholder="Annee formation"
              />
              <datalist id="annee_formation">
                {annee_formation.map(annee => (
                  <option key={annee} value={annee} />
                ))}

              </datalist>
            </div>

            {/* Niveau Filter */}

            <div className="filter-group">

              <input
                list="niveau"
                id="niveauFilter"
                name="niveauFilter"
                value={filters.niveau}
                onChange={(e) => handleFilterChange('niveau', e.target.value)}
                className="filter-select"
                placeholder="niveaux"
              />
              <datalist id="niveau">
                {niveaux.map(niveau => (
                  <option key={niveau} value={niveau} />
                ))}

              </datalist>
            </div>

            {/* Formateur Filter */}
            <div className="filter-group">

              <input
                list="formateurs"
                id="formateursFilter"
                name="formateursFilter"
                value={filters.formateur}
                onChange={(e) => handleFilterChange('formateur', e.target.value)}
                className="filter-select"
                placeholder="formateurs"
              />
              <datalist id="formateurs">
                {formateurs.map(formateurs => (
                  <option key={formateurs} value={formateurs} />
                ))}

              </datalist>
            </div>
            {/* Formateur Filter */}
            <div className="filter-group">

              <input
                list="semestre"
                id="semestreFilter"
                name="semestreFilter"
                value={filters.formateur}
                onChange={(e) => handleFilterChange('semestre', e.target.value)}
                className="filter-select"
                placeholder="semestre"
              />
              <datalist id="semestre">
                {semestre.map(semestre => (
                  <option key={semestre} value={semestre} />
                ))}

              </datalist>
            </div>

            {/* Reset Button */}
            <button onClick={resetFilters} className="reset-btn">
              Réinitialiser
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className={darkMode?"card-groupes mb-4":"card-groupes mb-4 card-groupes-dark-mode"}>
              {/* <div className="card-body"> */}
              <div className={darkMode ? "card-body-group" : "card-body-group card-body_dark_avancement"}>
                {/* <div className='flex-ajouter-avancement'>
                <h2 className="pb-3 font-weight-bold text-primary">Liste des avancements par groupe:</h2>
                <Button
                  variant="primary"
                  className="ml-2"
                  onClick={() => {
                    navigate("/addmoduleFormateurGroupeForm")
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Ajouter avancement
                </Button>

              </div> */}

                <div className="table-responsive">
                  {/* <table className="table table-striped"> */}
                  <table className={darkMode ? "table table-striped" : "table table-dark table-striped"}>
                    <thead>
                      <tr>
                        <th>code filière</th>
                        <th>Code groupe</th>
                        <th>Code module</th>
                        <th>formateur</th>
                        <th>nbh_par_semaine</th>
  

                        <th
                          className="sortable-header"
                          onClick={toggleSort}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Taux Réalisé
                            {sortDirection === 'asc' ?
                              <FaSortAmountUp className="sort-icon active" /> :
                              <FaSortAmountDown className="sort-icon active" />
                            }
                          </div>
                        </th>

                        <th>Actions </th>


                      </tr>
                    </thead>
                    <tbody>
                      {filteredavoncesWithsplice.map((avince) => (
                        <tr key={avince.id}>
                          <td>{avince.filière.code}</td>
                          <td>{avince.groupe.code}</td>
                          <td>{avince.module.code}</td>
                          <td>{avince.formateur.nom}</td>
                          <td>{avince.nbh_par_semaine_realisee}</td>
                          <td>{avince.taux_realise}</td>
                          <td>
                            <button className="btn btn-sm btn-outline-secondary">
                              <FontAwesomeIcon
                                onClick={() => {
                                  navigate("/avancementDetail")
                                }}
                                icon={faEye} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pagination-container-groupe">
                  <button
                    className="pagination-btn-groupe"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    Previous
                  </button>
                  <span className="current-page-groupe">Page {currentPage}</span>
                  <button
                    className="pagination-btn-groupe"
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
export default AvancemnetGroup;