import { useState } from 'react';
import "../style/Filieres.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye ,faPlus} from '@fortawesome/free-solid-svg-icons';
  import { useDarkMode } from "../DarkModeProvider/DarkModeContext";
  import { Button } from 'react-bootstrap';// onClick={toggleDarkMode}
// className="darkmode"
// aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
import { useNavigate } from 'react-router-dom';
const FiliereList = () => {
  const navigate=useNavigate();
  
    const { darkMode } = useDarkMode();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 9;
  const lastPostindex=currentPage * postPerPage ;
  const firstPostindex=lastPostindex - postPerPage ;
  
  // Sample data - replace with your actual data
  const filieres = [
    {
      code_filiere: 'INFO101',
      nom_filiere: 'Informatique Fondamentale',
      type_formation: 'Initiale',
      secteur: 'Technologie',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      code_filiere: 'MECA202',
      nom_filiere: 'Génie Mécanique',
      type_formation: 'Continue',
      secteur: 'Industrie',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      code_filiere: 'ELEC303',
      nom_filiere: 'Génie Électrique',
      type_formation: 'Initiale',
      secteur: 'Énergie',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      code_filiere: 'BIO404',
      nom_filiere: 'Biotechnologie',
      type_formation: 'Alternance',
      secteur: 'Santé',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      code_filiere: 'MARK505',
      nom_filiere: 'Marketing Digital',
      type_formation: 'Continue',
      secteur: 'Commerce',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      code_filiere: 'GEST606',
      nom_filiere: 'Gestion d\'Entreprise',
      type_formation: 'Initiale',
      secteur: 'Management',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      code_filiere: 'DESI707',
      nom_filiere: 'Design Graphique',
      type_formation: 'Alternance',
      secteur: 'Création',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      code_filiere: 'ARCH808',
      nom_filiere: 'Architecture',
      type_formation: 'Initiale',
      secteur: 'Bâtiment',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      code_filiere: 'AGRO909',
      nom_filiere: 'Agronomie',
      type_formation: 'Continue',
      secteur: 'Agriculture',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      code_filiere: 'DRO101',
      nom_filiere: 'Droit des Affaires',
      type_formation: 'Initiale',
      secteur: 'Juridique',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      code_filiere: 'TOUR202',
      nom_filiere: 'Tourisme et Hôtellerie',
      type_formation: 'Alternance',
      secteur: 'Services',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      code_filiere: 'MED303',
      nom_filiere: 'Médecine Générale',
      type_formation: 'Initiale',
      secteur: 'Santé',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      code_filiere: 'PHAR404',
      nom_filiere: 'Pharmacie',
      type_formation: 'Continue',
      secteur: 'Santé',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      code_filiere: 'EDUC505',
      nom_filiere: 'Sciences de l\'Éducation',
      type_formation: 'Initiale',
      secteur: 'Éducation',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      code_filiere: 'LANG606',
      nom_filiere: 'Linguistique Appliquée',
      type_formation: 'Continue',
      secteur: 'Lettres',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
//  this is function use in iput update state 
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1)
  };
  const filteredFiliere = filieres.filter(filiere =>
    filiere.code_filiere.toLowerCase().includes(searchTerm.toLowerCase()) ||
    filiere.nom_filiere.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredFilieresWithsplice =filteredFiliere.slice(firstPostindex ,lastPostindex)

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            {/* <div className="card-body"> */}
            <div className={darkMode ? "card-body":"card-body card-body-dark-filiere"}>
              <div className='flex-ajouter-filiere'>
              <h2 className="pb-3 font-weight-bold text-primary">List filiéres</h2>
              <Button 
                  variant="primary" 
                  className="ml-2"
                onClick={()=>{
                  navigate("/addFiliereForm")
                }}
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Ajouter filiére
                </Button>

              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search something here..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

   

              <div className="table-responsive">
                {/* <table className="table table-striped"> */}
                <table className={darkMode ?"table table-striped" :"table table-dark table-striped"}>
                  <thead>
                    <tr>
                      <th>Code filiere</th>
                      <th>Nom filiere</th>
                      <th>Type formation</th>              
                      <th>Secteur</th>              

                    </tr>
                  </thead>
                  <tbody>
                    {filteredFilieresWithsplice.map((filiere) => (
                      <tr key={filiere.id}>
                        <td>{filiere.code_filiere}</td>
                        <td>{filiere.nom_filiere}</td>
                        <td>{filiere.type_formation}</td>
                        <td>{filiere.secteur}</td>
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

export default FiliereList;