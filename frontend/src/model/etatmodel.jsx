import React, { useState } from 'react';
import "../style/stylelist_model.css";
import { useDarkMode } from "../DarkModeProvider/DarkModeContext";


const Etatmodel = () => {
  const { darkMode } = useDarkMode();
  const [filters, setFilters] = useState({
    code_filiere: '',
    code_module: '',
    code_groupe: '',
    regionale: ''

  });

  // const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 9;
  const lastPostindex = currentPage * postPerPage;
  const firstPostindex = lastPostindex - postPerPage;

  // Sample data - replace with your actual data
  const modules_list = [
    {
      id: 1,
      code_module: '300',
      regionale: 'NON',
      libelle_module: 'Mathématiques Appliquées',
      code_filiere: 'INFO101',
      status: 'Actif',
      code_groupe: 'G1'
    },
    {
      id: 2,
      code_module: '301',
      regionale: 'OUI',
      libelle_module: 'Algorithmique',
      code_filiere: 'INFO102',
      status: 'Actif',
      code_groupe: 'G2'
    },
    {
      id: 3,
      code_module: '302',
      regionale: 'NON',
      libelle_module: 'Base de Données',
      code_filiere: 'INFO103',
      status: 'Inactif',
      code_groupe: 'G3'
    },
    {
      id: 4,
      code_module: '303',
      regionale: 'OUI',
      libelle_module: 'Réseaux',
      code_filiere: 'INFO104',
      status: 'Actif',
      code_groupe: 'G1'
    },
    {
      id: 5,
      code_module: '304',
      regionale: 'NON',
      libelle_module: 'Systèmes d’Exploitation',
      code_filiere: 'INFO105',
      status: 'Actif',
      code_groupe: 'G2'
    },
    {
      id: 6,
      code_module: '305',
      regionale: 'OUI',
      libelle_module: 'Programmation Web',
      code_filiere: 'INFO106',
      status: 'Inactif',
      code_groupe: 'G3'
    },
    {
      id: 7,
      code_module: '306',
      regionale: 'NON',
      libelle_module: 'Sécurité Informatique',
      code_filiere: 'INFO107',
      status: 'Actif',
      code_groupe: 'G1'
    },
    {
      id: 8,
      code_module: '307',
      regionale: 'OUI',
      libelle_module: 'Intelligence Artificielle',
      code_filiere: 'INFO108',
      status: 'Actif',
      code_groupe: 'G2'
    },
    {
      id: 9,
      code_module: '308',
      regionale: 'NON',
      libelle_module: 'Cloud Computing',
      code_filiere: 'INFO109',
      status: 'Inactif',
      code_groupe: 'G3'
    },
    {
      id: 10,
      code_module: '309',
      regionale: 'OUI',
      libelle_module: 'Big Data',
      code_filiere: 'INFO110',
      status: 'Actif',
      code_groupe: 'G1'
    },
    {
      id: 11,
      code_module: '310',
      regionale: 'NON',
      libelle_module: 'DevOps',
      code_filiere: 'INFO111',
      status: 'Actif',
      code_groupe: 'G2'
    },
    {
      id: 12,
      code_module: '311',
      regionale: 'OUI',
      libelle_module: 'Blockchain',
      code_filiere: 'INFO112',
      status: 'Inactif',
      code_groupe: 'G3'
    },
    {
      id: 13,
      code_module: '312',
      regionale: 'NON',
      libelle_module: 'IoT',
      code_filiere: 'INFO113',
      status: 'Actif',
      code_groupe: 'G1'
    },
    {
      id: 14,
      code_module: '313',
      regionale: 'OUI',
      libelle_module: 'UI/UX Design',
      code_filiere: 'INFO114',
      status: 'Actif',
      code_groupe: 'G2'
    },
    {
      id: 15,
      code_module: '314',
      regionale: 'NON',
      libelle_module: 'Cybersécurité',
      code_filiere: 'INFO115',
      status: 'Inactif',
      code_groupe: 'G3'
    },
    {
      id: 16,
      code_module: '315',
      regionale: 'OUI',
      libelle_module: 'Machine Learning',
      code_filiere: 'INFO116',
      status: 'Actif',
      code_groupe: 'G1'
    },
    {
      id: 17,
      code_module: '316',
      regionale: 'NON',
      libelle_module: 'Deep Learning',
      code_filiere: 'INFO117',
      status: 'Actif',
      code_groupe: 'G2'
    },
    {
      id: 18,
      code_module: '317',
      regionale: 'OUI',
      libelle_module: 'Data Science',
      code_filiere: 'INFO118',
      status: 'Inactif',
      code_groupe: 'G3'
    },
    {
      id: 19,
      code_module: '318',
      regionale: 'NON',
      libelle_module: 'Mobile Development',
      code_filiere: 'INFO119',
      status: 'Actif',
      code_groupe: 'G1'
    },
    {
      id: 20,
      code_module: '319',
      regionale: 'OUI',
      libelle_module: 'Game Development',
      code_filiere: 'INFO120',
      status: 'Actif',
      code_groupe: 'G2'
    }
  ];
  // felter 
  const filieres = [...new Set(modules_list.map(doc => doc.code_filiere))];
  const module = [...new Set(modules_list.map(doc => doc.code_module))];
  const groupes = [...new Set(modules_list.map(doc => doc.code_groupe))];
  const regionale = ['oui', 'non'];
  const filtercode_model_group_filiere_reg = modules_list.filter(doc => {
    return (
      (filters.code_filiere === '' || doc.code_filiere === filters.code_filiere) &&
      (filters.code_module === '' || doc.code_module === filters.code_module) &&
      (filters.code_groupe === '' || doc.code_groupe === filters.code_groupe) &&
      (filters.regionale === '' || doc.regionale.toUpperCase() === filters.regionale.toUpperCase())

    );
  });
  // Reset all filters
  const resetFilters = () => {
    setFilters({
      code_filiere: '',
      code_module: '',
      code_groupe: '',
      regionale: '',

    });
    console.log(filters)
  };
  // Handle filter change
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setCurrentPage(1)
  }
  //  this is function use in iput update state 
  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  //   setCurrentPage(1)
  // };

  const filteredcode_model_group_filiere_regWithsplice = filtercode_model_group_filiere_reg.slice(firstPostindex, lastPostindex)

  return (
    <div className="container-fluid-model">
      <div className={darkMode ? "filter-container" : "filter-container filter-container-darkmode"}>

        <div className="filter-controls">
          {/* Filière Filter */}

          <div className="filter-group">

            <input
              list="code_filiere"
              id="code_filiereFilter"
              name="code_filiereFilter"
              value={filters.code_filiere}
              onChange={(e) => handleFilterChange('code_filiere', e.target.value)}
              className="filter-select"
              placeholder="code filiere"
            />
            <datalist id="code_filiere">
              {filieres.map(filiere => (
                <option key={filiere} value={filiere} />
              ))}

            </datalist>
          </div>

          {/* Module Filter */}
          <div className="filter-group">

            <input
              list="code_module"
              id="code_moduleFilter"
              name="code_moduleFilter"
              value={filters.code_module}
              onChange={(e) => handleFilterChange('code_module', e.target.value)}
              className="filter-select"
              placeholder="code module"
            />
            <datalist id="code_module">
              {module.map(module => (
                <option key={module} value={module} />
              ))}

            </datalist>
          </div>
          {/* Groupe Filter */}
         
          <div className="filter-group">

            <input
              list="code_groupe"
              id="code_groupeFilter"
              name="code_groupeFilter"
              value={filters.code_groupe}
              onChange={(e) => handleFilterChange('code_groupe', e.target.value)}
              className="filter-select"
              placeholder="code groupe"
            />
            <datalist id="code_groupe">
              {groupes.map(groupe => (
                <option key={groupe} value={groupe} />
              ))}

            </datalist>
          </div>

          {/* Niveau Filter */}
          <div className="filter-group">

            <input
              list="regionale"
              id="regionaleFilter"
              name="regionaleFilter"
              value={filters.regionale}
              onChange={(e) => handleFilterChange('regionale', e.target.value)}
              className="filter-select"
              placeholder="Regionale"
            />
            <datalist id="regionale">
              {regionale.map(regionale => (
                <option key={regionale} value={regionale} />
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
          <div className={darkMode?"card-Etatmodel mb-4":"card-Etatmodel mb-4 card-Etatmodel-dark-Mode"}>
            {/* <div className="card-body"> */}
            <div className={darkMode ? "card-body-model" : "card-body-model card-body-model-darkmode"}>
              <div className='flex-ajouter-model'>
                <h2 className="pb-3 font-weight-bold ">États des modules</h2>


              </div>
              <div className="table-responsive">
                {/* <table className="table table-striped"> */}
                <table className={darkMode ? "table table-striped" : "table table-dark table-striped"}>
                  <thead>
                    <tr>
                      <th>Code Module</th>
                      <th>code groupe</th>
                      <th>code filiere</th>
                      <th>libelle</th>
                      <th>régionale</th>
                      <th>état</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredcode_model_group_filiere_regWithsplice.map((module) => (
                      <tr key={module.id}>
                        <td>{module.code_module}</td>
                        <td>{module.code_groupe}</td>
                        <td>{module.code_filiere}</td>
                        <td>{module.libelle_module}</td>
                        <td>{module.regionale}</td>
                        <td>{module.status}</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pagination-container-model">
                  <button
                    className="pagination-btn-model"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    Previous
                  </button>
                  <span className="current-page-model">Page {currentPage}</span>
                  <button
                    className="pagination-btn-model"
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

export default Etatmodel;