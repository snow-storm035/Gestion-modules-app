import { useState } from 'react';
import "../style/listgroup.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye ,faPlus} from '@fortawesome/free-solid-svg-icons';
  import { useDarkMode } from "../DarkModeProvider/DarkModeContext";
  import { Button } from 'react-bootstrap';// onClick={toggleDarkMode}
// className="darkmode"
// aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
import { useNavigate } from 'react-router-dom';
const GroupsList = () => {
  const navigate=useNavigate();
  
    const { darkMode } = useDarkMode();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 9;
  const lastPostindex=currentPage * postPerPage ;
  const firstPostindex=lastPostindex - postPerPage ;
  
  // Sample data - replace with your actual data
  const groups = [
    {
      code_filiere: 'INFO101',
      code_groupe: 'G300A',
      niveau: '1ère année',
      effectif: 25,
      annee_formation: 2023,
      status_groupe: 'active',
      mode: 'présentiel',
      creneau: '08:00-10:00',
      created_at: '2023-01-10T08:00:00Z',
      updated_at: '2023-06-15T14:30:00Z'
    },
    {
      code_filiere: 'INFO101',
      code_groupe: 'G300B',
      niveau: '1ère année',
      effectif: 28,
      annee_formation: 2023,
      status_groupe: 'active',
      mode: 'hybride',
      creneau: '10:30-12:30',
      created_at: '2023-01-10T08:00:00Z',
      updated_at: '2023-06-15T14:30:00Z'
    },
    {
      code_filiere: 'INFO101',
      code_groupe: 'G300C',
      niveau: '1ère année',
      effectif: 22,
      annee_formation: 2023,
      status_groupe: 'active',
      mode: 'distanciel',
      creneau: '14:00-16:00',
      created_at: '2023-01-10T08:00:00Z',
      updated_at: '2023-06-15T14:30:00Z'
    },
    {
      code_filiere: 'INFO201',
      code_groupe: 'G222A',
      niveau: '2ème année',
      effectif: 30,
      annee_formation: 2023,
      status_groupe: 'active',
      mode: 'présentiel',
      creneau: '08:00-10:00',
      created_at: '2023-01-15T08:00:00Z',
      updated_at: '2023-06-20T10:15:00Z'
    },
    {
      code_filiere: 'INFO201',
      code_groupe: 'G222B',
      niveau: '2ème année',
      effectif: 27,
      annee_formation: 2023,
      status_groupe: 'active',
      mode: 'hybride',
      creneau: '13:00-15:00',
      created_at: '2023-01-15T08:00:00Z',
      updated_at: '2023-06-20T10:15:00Z'
    },
    {
      code_filiere: 'INFO301',
      code_groupe: 'G400A',
      niveau: '3ème année',
      effectif: 24,
      annee_formation: 2023,
      status_groupe: 'active',
      mode: 'présentiel',
      creneau: '09:00-11:00',
      created_at: '2023-01-20T08:00:00Z',
      updated_at: '2023-06-25T11:30:00Z'
    },
    {
      code_filiere: 'INFO301',
      code_groupe: 'G400B',
      niveau: '3ème année',
      effectif: 26,
      annee_formation: 2023,
      status_groupe: 'inactive',
      mode: 'distanciel',
      creneau: '15:00-17:00',
      created_at: '2023-01-20T08:00:00Z',
      updated_at: '2023-06-25T11:30:00Z'
    },
    {
      code_filiere: 'MATH101',
      code_groupe: 'G500A',
      niveau: '1ère année',
      effectif: 32,
      annee_formation: 2023,
      status_groupe: 'active',
      mode: 'présentiel',
      creneau: '10:00-12:00',
      created_at: '2023-02-05T08:00:00Z',
      updated_at: '2023-07-10T09:45:00Z'
    },
    {
      code_filiere: 'MATH101',
      code_groupe: 'G500B',
      niveau: '1ère année',
      effectif: 29,
      annee_formation: 2023,
      status_groupe: 'active',
      mode: 'hybride',
      creneau: '16:00-18:00',
      created_at: '2023-02-05T08:00:00Z',
      updated_at: '2023-07-10T09:45:00Z'
    },
    {
      code_filiere: 'PHYS101',
      code_groupe: 'G600A',
      niveau: '1ère année',
      effectif: 23,
      annee_formation: 2023,
      status_groupe: 'active',
      mode: 'présentiel',
      creneau: '11:00-13:00',
      created_at: '2023-02-10T08:00:00Z',
      updated_at: '2023-07-15T14:20:00Z'
    }
  ];
//  this is function use in iput update state 
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1)
  };
  const filteredGroup = groups.filter(group =>
    group.code_filiere.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.code_groupe.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredgroupsWithsplice =filteredGroup.slice(firstPostindex ,lastPostindex)

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            {/* <div className="card-body"> */}
            <div className={darkMode ? "card-body":"card-body card-body_dark_group"}>
              <div className='flex-ajouter-group'>
              <h2 className="pb-3 font-weight-bold text-primary">List modules</h2>
              <Button 
                  variant="primary" 
                  className="ml-2"
                onClick={()=>{
                  navigate("/addGroupform")
                }}
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Ajouter group
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
                      <th>code_filiere</th>
                      <th>code_groupe</th>
                      <th>annee formation</th>              
                      <th>more</th>              

                    </tr>
                  </thead>
                  <tbody>
                    {filteredgroupsWithsplice.map((group) => (
                      <tr key={group.id}>
                        <td>{group.code_filiere}</td>
                        <td>{group.code_groupe}</td>
                        <td>{group.annee_formation}</td>
                        <td>
                          <button onClick={() => navigate('/groupdetail')} className="btn btn-sm btn-outline-secondary">
                            <FontAwesomeIcon icon={faEye} />
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

export default GroupsList;