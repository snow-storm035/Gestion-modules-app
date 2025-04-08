import React, { useState } from 'react';
import "../style/ProfeseurList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye ,faPlus} from '@fortawesome/free-solid-svg-icons';
  import { useDarkMode } from "../DarkModeProvider/DarkModeContext";
  import { Button } from 'react-bootstrap';// onClick={toggleDarkMode}
// className="darkmode"
// aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
import { useNavigate } from 'react-router-dom';

// Inside your component function:

const ProfesseurList = () => {
  const navigate = useNavigate();
  
    const { darkMode } = useDarkMode();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 9;
  const lastPostindex=currentPage * postPerPage ;
  const firstPostindex=lastPostindex - postPerPage ;
  
  // Sample data - replace with your actual data
  const formateurs = [
    { id:1,
      code_formateur: 'F001',
      nom_formateur: 'Smith',
      created_at: '2023-01-15T10:00:00Z',
      updated_at: '2023-01-15T10:00:00Z'
    },
    { 
        id:2,
      code_formateur: 'F002',
      nom_formateur: 'Johnson',
      created_at: '2023-01-16T11:30:00Z',
      updated_at: '2023-01-16T11:30:00Z'
    },
    { 
        id:3,
      code_formateur: 'F003',
      nom_formateur: 'Williams',
      created_at: '2023-01-17T09:15:00Z',
      updated_at: '2023-01-17T09:15:00Z'
    },
    { 
        id:4,
      code_formateur: 'F004',
      nom_formateur: 'Brown',
      created_at: '2023-01-18T14:20:00Z',
      updated_at: '2023-01-18T14:20:00Z'
    },
    { 
        id:5,
        code_formateur: 'F005',
        nom_formateur: 'Jones',
        created_at: '2023-01-19T08:45:00Z',
        updated_at: '2023-01-19T08:45:00Z'
      },
      { 
        id:6,
        code_formateur: 'F006',
        nom_formateur: 'Miller',
        created_at: '2023-01-20T13:10:00Z',
        updated_at: '2023-01-20T13:10:00Z'
      },
      { 
        id:7,
        code_formateur: 'F007',
        nom_formateur: 'Davis',
        created_at: '2023-01-21T16:30:00Z',
        updated_at: '2023-01-21T16:30:00Z'
      },
      { 
        id:8,
        code_formateur: 'F008',
        nom_formateur: 'Garcia',
        created_at: '2023-01-22T10:15:00Z',
        updated_at: '2023-01-22T10:15:00Z'
      },
      { 
        id:9,
        code_formateur: 'F009',
        nom_formateur: 'Rodriguez',
        created_at: '2023-01-23T11:45:00Z',
        updated_at: '2023-01-23T11:45:00Z'
      },
      { 
        id:10,
        code_formateur: 'F010',
        nom_formateur: 'Wilson',
        created_at: '2023-01-24T09:30:00Z',
        updated_at: '2023-01-24T09:30:00Z'
      },
      { 
        id:11,
        code_formateur: 'F011',
        nom_formateur: 'Wilson',
        created_at: '2023-01-24T09:30:00Z',
        updated_at: '2023-01-24T09:30:00Z'
      },
      { 
        id:12,
        code_formateur: 'F012',
        nom_formateur: 'Wilson',
        created_at: '2023-01-24T09:30:00Z',
        updated_at: '2023-01-24T09:30:00Z'
      },
      { 
        id:13,
        code_formateur: 'F013',
        nom_formateur: 'Wilson',
        created_at: '2023-01-24T09:30:00Z',
        updated_at: '2023-01-24T09:30:00Z'
      },
      { 
        id:14,
        code_formateur: 'F014',
        nom_formateur: 'Wilson',
        created_at: '2023-01-24T09:30:00Z',
        updated_at: '2023-01-24T09:30:00Z'
      },
      { 
        id:15,
        code_formateur: 'F015',
        nom_formateur: 'Wilson',
        created_at: '2023-01-24T09:30:00Z',
        updated_at: '2023-01-24T09:30:00Z'
      },
      { 
        id:17,
        code_formateur: 'F016',
        nom_formateur: 'Wilson',
        created_at: '2023-01-24T09:30:00Z',
        updated_at: '2023-01-24T09:30:00Z'
      },
      { 
        id:18,
        code_formateur: 'F018',
        nom_formateur: 'Wilson',
        created_at: '2023-01-24T09:30:00Z',
        updated_at: '2023-01-24T09:30:00Z'
      },
    ];

//  this is function use in iput update state 
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1)
  };
  const filteredformateurs = formateurs.filter(formateur =>
    formateur.code_formateur.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formateur. nom_formateur.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredformateursWithsplice =filteredformateurs.slice(firstPostindex ,lastPostindex)

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            {/* <div className="card-body"> */}
            <div className={darkMode ? "card-body":"card-body card-body_dark_formateur"}>
              <div className='flex-ajouter-formateur'>
              <h2 className="pb-3 font-weight-bold text-primary">List formateurs</h2>
              <Button 
                  variant="primary" 
                  className="ml-2"
                  onClick={() => {
                    navigate("/addformateurForm");
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  
                  Ajouter formateur
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
                       
                      <th>code formateur</th>
                      <th>nom formateur</th>
                      <th>more</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredformateursWithsplice.map((formateur) => (
                      <tr key={formateur.id}>
                      
                        <td>{formateur.code_formateur}</td>
                        <td>{formateur.nom_formateur}</td>

                        <td>
                          <button className="btn btn-sm btn-outline-secondary">
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

export default ProfesseurList;