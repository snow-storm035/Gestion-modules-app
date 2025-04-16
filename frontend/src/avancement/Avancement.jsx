import  { useState } from 'react';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';// import { useState } from 'react';
import "../style/avancement.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye ,faPlus} from '@fortawesome/free-solid-svg-icons';
  import { useDarkMode } from "../DarkModeProvider/DarkModeContext";
  import { Button } from 'react-bootstrap';// onClick={toggleDarkMode}
// className="darkmode"
// aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
import { useNavigate } from 'react-router-dom';
const AvancemnetList = () => {
  const navigate=useNavigate();
  
    const { darkMode } = useDarkMode();

<<<<<<< HEAD
  // const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 8;
  const lastPostindex=currentPage * postPerPage ;
  const firstPostindex=lastPostindex - postPerPage ;
  
  // Sample data - replace with your actual data
 

      const documentsAvencemnet = [
        {
          id: 1,
          filière: { code: 'FIL101', nom: 'Développement Digital' },
          module: { code: 'M301', nom: 'JavaScript Avancé' },
          groupe: { code: 'GRP01', nom: 'Groupe A' },
          formateur: { code: 'FORM001', nom: 'Ahmed Khan', spécialité: 'Frontend', statut: 'Interne' },
          niveau: 'TS',
          nbh_par_semaine_realisee: 4.0,
          date_debut: '2023-09-01',
          date_fin: '2023-12-15',
          taux_realise: 82.5
        },
        {
          id: 2,
          filière: { code: 'FIL102', nom: 'Réseaux Informatiques' },
          module: { code: 'M302', nom: 'Cisco CCNA' },
          groupe: { code: 'GRP02', nom: 'Groupe B' },
          formateur: { code: 'FORM002', nom: 'Marie Dupont', spécialité: 'Réseaux', statut: 'Externe' },
          niveau: 'T',
          nbh_par_semaine_realisee: 3.5,
          date_debut: '2023-10-01',
          date_fin: '2024-01-20',
          taux_realise: 68.3
        },
        {
          id: 3,
          filière: { code: 'FIL103', nom: 'Data Science' },
          module: { code: 'M303', nom: 'Machine Learning' },
          groupe: { code: 'GRP03', nom: 'Groupe C' },
          formateur: { code: 'FORM003', nom: 'Carlos Silva', spécialité: 'AI', statut: 'Interne' },
          niveau: 'TS',
          nbh_par_semaine_realisee: 5.0,
          date_debut: '2023-11-01',
          date_fin: '2024-02-10',
          taux_realise: 91.2
        },
        {
          id: 4,
          filière: { code: 'FIL104', nom: 'Design Graphique' },
          module: { code: 'M304', nom: 'UI/UX Design' },
          groupe: { code: 'GRP04', nom: 'Groupe D' },
          formateur: { code: 'FORM004', nom: 'Sophie Martin', spécialité: 'Design', statut: 'Externe' },
          niveau: 'T',
          nbh_par_semaine_realisee: 2.5,
          date_debut: '2024-01-15',
          date_fin: '2024-04-30',
          taux_realise: 75.0
        },
        {
          id: 5,
          filière: { code: 'FIL105', nom: 'Marketing Digital' },
          module: { code: 'M305', nom: 'SEO Avancé' },
          groupe: { code: 'GRP05', nom: 'Groupe E' },
          formateur: { code: 'FORM005', nom: 'John Smith', spécialité: 'Marketing', statut: 'Interne' },
          niveau: 'TS',
          nbh_par_semaine_realisee: 3.0,
          date_debut: '2024-02-01',
          date_fin: '2024-05-15',
          taux_realise: 60.8
        },
        {
          id: 6,
          filière: { code: 'FIL106', nom: 'Bureautique' },
          module: { code: 'M306', nom: 'Excel Expert' },
          groupe: { code: 'GRP06', nom: 'Groupe F' },
          formateur: { code: 'FORM006', nom: 'Fatima Zahra', spécialité: 'Bureautique', statut: 'Interne' },
          niveau: 'T',
          nbh_par_semaine_realisee: 2.0,
          date_debut: '2024-03-10',
          date_fin: '2024-06-20',
          taux_realise: 45.5
        },
        {
          id: 7,
          filière: { code: 'FIL107', nom: 'Cloud Computing' },
          module: { code: 'M307', nom: 'AWS Solutions' },
          groupe: { code: 'GRP07', nom: 'Groupe G' },
          formateur: { code: 'FORM007', nom: 'David Wilson', spécialité: 'Cloud', statut: 'Externe' },
          niveau: 'TS',
          nbh_par_semaine_realisee: 4.5,
          date_debut: '2024-04-05',
          date_fin: '2024-07-10',
          taux_realise: 88.7
        },
        {
          id: 8,
          filière: { code: 'FIL108', nom: 'Cybersécurité' },
          module: { code: 'M308', nom: 'Ethical Hacking' },
          groupe: { code: 'GRP08', nom: 'Groupe H' },
          formateur: { code: 'FORM008', nom: 'Elena Petrova', spécialité: 'Sécurité', statut: 'Externe' },
          niveau: 'TS',
          nbh_par_semaine_realisee: 5.0,
          date_debut: '2024-05-01',
          date_fin: '2024-08-15',
          taux_realise: 95.3
        },
        {
          id: 9,
          filière: { code: 'FIL109', nom: 'Gestion de Projet' },
          module: { code: 'M309', nom: 'Agile Scrum' },
          groupe: { code: 'GRP09', nom: 'Groupe I' },
          formateur: { code: 'FORM009', nom: 'Mohammed Ali', spécialité: 'Management', statut: 'Interne' },
          niveau: 'T',
          nbh_par_semaine_realisee: 3.5,
          date_debut: '2024-06-01',
          date_fin: '2024-09-10',
          taux_realise: 72.1
        },
        {
          id: 10,
          filière: { code: 'FIL110', nom: 'DevOps' },
          module: { code: 'M310', nom: 'Docker & Kubernetes' },
          groupe: { code: 'GRP10', nom: 'Groupe J' },
          formateur: { code: 'FORM010', nom: 'Lina Chen', spécialité: 'DevOps', statut: 'Externe' },
          niveau: 'TS',
          nbh_par_semaine_realisee: 4.0,
          date_debut: '2024-07-01',
          date_fin: '2024-10-15',
          taux_realise: 79.9
        }
      ];

  const [filters, setFilters] = useState({
    filiere: '',
    module: '',
    groupe: '',
    niveau: '',
    formateur: ''
  });

  // Extract unique values for filters
  const filieres = [...new Set(documentsAvencemnet.map(doc => doc.filière.nom))];
  const modules = [...new Set(documentsAvencemnet.map(doc => doc.module.nom))];
  const groupes = [...new Set(documentsAvencemnet.map(doc => doc.groupe.nom))];
  const niveaux = ['TS', 'T'];
  const formateurs = [...new Set(documentsAvencemnet.map(doc => doc.formateur.nom))];

  // Filter function
  const filterFiliereModuleGroupniveauFourmateur = documentsAvencemnet.filter(doc => {
    return (
      (filters.filiere === '' || doc.filière.nom === filters.filiere) &&
      (filters.module === '' || doc.module.nom === filters.module) &&
      (filters.groupe === '' || doc.groupe.nom === filters.groupe) &&
      (filters.niveau === '' || doc.niveau === filters.niveau) &&
      (filters.formateur === '' || doc.formateur.nom === filters.formateur)
    );
  });
  // Handle filter change
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setCurrentPage(1)
=======
const Avancement = ({ moduleData }) => {
  // Sample data structure matching your schema
  const defaultData = {
    id: 1,
    code_module: '300',
    code_filiere: '',
    matricule: 'none',
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
>>>>>>> 5ddc21d86a7024a6b85ba91f4f1d76a8cdb25be3
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      filiere: '',
      module: '',
      groupe: '',
      niveau: '',
      formateur: ''
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


const filteredavoncesWithsplice =sortedDocuments.slice(firstPostindex ,lastPostindex)
// console.log("filteredavoncesWithsplice################################################")
// console.log(filteredavoncesWithsplice)
  return (
    <div className="container-fluid-avancement">
      {/* <div className="filter-container"> */}
      <div className={darkMode ?"filter-container":"filter-container filter-container-darkmode"}>
       <h2>Filtres</h2>
      <div className="filter-controls">
        {/* Filière Filter */}
        <select 
          value={filters.filiere}
          onChange={(e) => handleFilterChange('filiere', e.target.value)}
          className="filter-select"
        >
          <option value="">Toutes filières</option>
          {filieres.map(filiere => (
            <option key={filiere} value={filiere}>{filiere}</option>
          ))}
        </select>

<<<<<<< HEAD
        {/* Module Filter */}
        <select 
          value={filters.module}
          onChange={(e) => handleFilterChange('module', e.target.value)}
          className="filter-select"
        >
          <option value="">Tous modules</option>
          {modules.map(module => (
            <option key={module} value={module}>{module}</option>
          ))}
        </select>
=======
          {/* Formateur Information */}
          <div className="stat-card">
            <div className="stat-icon">
              <FaChalkboardTeacher />
            </div>
            <div className="stat-content">
              <h3>Formateur</h3>
              <p>{defaultData.matricule === 'none' ? 'Not assigned' : defaultData.matricule}</p>
            </div>
          </div>
>>>>>>> 5ddc21d86a7024a6b85ba91f4f1d76a8cdb25be3

        {/* Groupe Filter */}
        <select 
          value={filters.groupe}
          onChange={(e) => handleFilterChange('groupe', e.target.value)}
          className="filter-select"
        >
          <option value="">Tous groupes</option>
          {groupes.map(groupe => (
            <option key={groupe} value={groupe}>{groupe}</option>
          ))}
        </select>

        {/* Niveau Filter */}
        <select 
          value={filters.niveau}
          onChange={(e) => handleFilterChange('niveau', e.target.value)}
          className="filter-select"
        >
          <option value="">Tous niveaux</option>
          {niveaux.map(niveau => (
            <option key={niveau} value={niveau}>{niveau}</option>
          ))}
        </select>

        {/* Formateur Filter */}
        <select 
          value={filters.formateur}
          onChange={(e) => handleFilterChange('formateur', e.target.value)}
          className="filter-select"
        >
          <option value="">Tous formateurs</option>
          {formateurs.map(formateur => (
            <option key={formateur} value={formateur}>{formateur}</option>
          ))}
        </select>

        {/* Reset Button */}
        <button onClick={resetFilters} className="reset-btn">
          Réinitialiser
        </button>
      </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            {/* <div className="card-body"> */}
            <div className={darkMode ? "card-body":"card-body card-body_dark_avancement"}>
              <div className='flex-ajouter-avancement'>
              <h2 className="pb-3 font-weight-bold text-primary">Liste des avancements :</h2>
              <Button 
                  variant="primary" 
                  className="ml-2"
                onClick={()=>{
                  navigate("/addmoduleFormateurGroupeForm")
                }}
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Ajouter avancement
                </Button>

              </div>

              <div className="table-responsive">
                {/* <table className="table table-striped"> */}
                <table className={darkMode ?"table table-striped" :"table table-dark table-striped"}>
                  <thead>
                    <tr>
                      <th>Code groupe</th>
                      <th>Code module</th>
                      <th>Formateur</th>              
                      <th>Heures/semaine</th>              

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
                        <td>{avince.module.code}</td>
                        <td>{avince.formateur.nom}</td>
                        <td>{avince.nbh_par_semaine_realisee}</td>
                        <td>{avince.taux_realise}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-secondary">
                            <FontAwesomeIcon 
                                            onClick={()=>{
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

              <div className="d-flex justify-content-between mt-3">
                <button 
                  className="btn btn-outline-primary" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                >
                  Previous
                </button>
                {/* <span>Page {currentPage}</span> */}
                <span style={{color:"red"}}>Page {currentPage}</span>
                <button 
                  className="btn btn-outline-primary"
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
  );
};

export default AvancemnetList