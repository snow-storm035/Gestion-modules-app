import React, { useState } from 'react';
import "../style/stylelist_model.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye ,faPlus} from '@fortawesome/free-solid-svg-icons';
  import { useDarkMode } from "../DarkModeProvider/DarkModeContext";
  import { Button } from 'react-bootstrap';// onClick={toggleDarkMode}
// className="darkmode"
// aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}

const ModuleList = () => {
    const { darkMode } = useDarkMode();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 9;
  const lastPostindex=currentPage * postPerPage ;
  const firstPostindex=lastPostindex - postPerPage ;
  
  // Sample data - replace with your actual data
  const modules = [
    { id: 1, code_module: '300', regionale: 'NON', mh_presentiel: 7, mh_distance: 4, nombre_total: 3 },
    { id: 2, code_module: '300', regionale: 'NON', mh_presentiel: 7, mh_distance: 4, nombre_total: 3 },
    { id: 3, code_module: '300', regionale: 'NON', mh_presentiel: 7, mh_distance: 4, nombre_total: 3 },
    { id: 4, code_module: '300', regionale: 'NON', mh_presentiel: 7, mh_distance: 4, nombre_total: 3 },
    { id: 5, code_module: '300', regionale: 'NON', mh_presentiel: 7, mh_distance: 4, nombre_total: 3 },
    { id: 6, code_module: '300', regionale: 'OUI', mh_presentiel: 7, mh_distance: 4, nombre_total: 3 },
    { id: 7, code_module: '300', regionale: 'OUI', mh_presentiel: 7, mh_distance: 4, nombre_total: 3 },
    { id: 8, code_module: '300', regionale: 'OUI', mh_presentiel: 7, mh_distance: 4, nombre_total: 3 },
    { id: 9, code_module: '222', regionale: 'OUI', mh_presentiel: 7, mh_distance: 4, nombre_total: 3 },
    { id: 10, code_module: '222', regionale: 'OUI', mh_presentiel: 7, mh_distance: 4, nombre_total: 3 },
    { id: 11, code_module: '222', regionale: 'NON', mh_presentiel: 7, mh_distance: 4, nombre_total: 3 },
    { id: 12, code_module: '222', regionale: 'NON', mh_presentiel: 7, mh_distance: 4, nombre_total: 3 },
    { id: 13, code_module: '222', regionale: 'NON', mh_presentiel: 7, mh_distance: 4, nombre_total: 3 },
    { id: 14, code_module: '222', regionale: 'NON', mh_presentiel: 7, mh_distance: 4, nombre_total: 3 },
    { id: 15, code_module: '222', regionale: 'OUI', mh_presentiel: 7, mh_distance: 4, nombre_total: 3 },
    { id: 16, code_module: '222', regionale: 'OUI', mh_presentiel: 7, mh_distance: 4, nombre_total: 3 },
    { id: 17, code_module: '222', regionale: 'OUI', mh_presentiel: 7, mh_distance: 4, nombre_total: 3 },
    { id: 18, code_module: '222', regionale: 'OUI', mh_presentiel: 7, mh_distance: 4, nombre_total: 3 },
    { id: 19, code_module: '222', regionale: 'OUI', mh_presentiel: 7, mh_distance: 4, nombre_total: 3 },
    { id: 20, code_module: '222', regionale: 'OUI', mh_presentiel: 7, mh_distance: 4, nombre_total: 3 },
    { id: 21, code_module: '222', regionale: 'OUI', mh_presentiel: 7, mh_distance: 4, nombre_total: 3 },
    { id: 22, code_module: '222', regionale: 'OUI', mh_presentiel: 7, mh_distance: 4, nombre_total: 3 },
    { id: 23, code_module: '222', regionale: 'OUI', mh_presentiel: 7, mh_distance: 4, nombre_total: 3 },
    { id: 24, code_module: '222', regionale: 'OUI', mh_presentiel: 7, mh_distance: 4, nombre_total: 3 },
  ];
//  this is function use in iput update state 
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1)
  };
  const filteredModules = modules.filter(module =>
    module.code_module.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.regionale.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredModulesWithsplice =filteredModules.slice(firstPostindex ,lastPostindex)

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            {/* <div className="card-body"> */}
            <div className={darkMode ? "card-body":"card-body card-body_dark_model"}>
              <div className='flex-ajouter-model'>
              <h2 className="pb-3 font-weight-bold text-primary">List modules</h2>
              <Button 
                  variant="primary" 
                  className="ml-2"
                  onClick={() => {
                    /* Add your modal open logic here */
                    console.log("Open add module modal");
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Ajouter model
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
                      <th>Code Module</th>
                      <th>module</th>
                      <th>Régional</th>
                      <th>MH Presentiel</th>
                      <th>MH distanciel</th>
                      <th>nombre horaire</th>
                      <th>more</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredModulesWithsplice.map((module) => (
                      <tr key={module.id}>
                        <td>{module.id}</td>
                        <td>{module.code_module}</td>
                        <td>{module.regionale}</td>
                        <td>{module.mh_presentiel}</td>
                        <td>{module.mh_distance}</td>
                        <td>{module.nombre_total}</td>
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

export default ModuleList;