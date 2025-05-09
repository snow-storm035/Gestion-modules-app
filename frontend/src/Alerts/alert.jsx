

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from "../DarkModeProvider/DarkModeContext";
import { useNavigate } from 'react-router-dom';
import apiService from '../Axios/apiService';
import "../style/alert.css"
const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtersData, setFiltersData] = useState({
    filieres: [],
    niveaux: [],
    regional: []
  });
  const [filters, setFilters] = useState({
    code_filiere: '',
    niveau: '',
    
    regional: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 8;
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await apiService.getCsrfCookie();
        const response = await apiService.getAlerts();
        const receivedAlerts = response.alerts || [];
        const receivedFilters = response.filters || {
          filieres: [],
          groupes: [],
          niveaux: {},
          regional: []
        };

        const filieresWithCodes = receivedFilters.filieres.map(f => ({
          ...f,
          groupes: receivedFilters.groupes
            ? receivedFilters.groupes.filter(g => g.code_groupe.startsWith(f.code_filiere.split('_')[1]))
            : []
        }));

        setAlerts(receivedAlerts);
        setFiltersData({
          filieres: filieresWithCodes,
          niveaux: Object.values(receivedFilters.niveaux || {}),
          regional: receivedFilters.regional || []
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (filterName, value) => {
    console.log("filters:",filters)
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  const filteredAlerts = alerts.filter(alert =>
    (filters.code_filiere === '' || alert.code_filiere === filters.code_filiere) &&
    (filters.niveau === '' || alert.niveau === filters.niveau) &&
    (filters.regional === '' || alert.regional === filters.regional)
  );
  

  const paginatedAlerts = filteredAlerts.slice(
    (currentPage - 1) * postPerPage,
    currentPage * postPerPage
  );
  const totalPages = Math.ceil(filteredAlerts.length / postPerPage);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {alerts.length > 0 && (
        <div className={`container-fluid-alets ${darkMode ? 'dark-mode' : ''}`}>
          {filtersData.filieres.length > 0 && (
            <div className={darkMode ? "filter-container-alets" : "filter-container-alets filter-container-darkmode-alets"}>
              <h2>Alerts:</h2>
              <div className="filter-controls">
                <div className="filter-group">
                  <input
                    list="filieres"
                    id="filiereFilter"
                    name="filiereFilter"
                    value={filters.code_filiere}
                    onChange={(e) => handleFilterChange('code_filiere', e.target.value)}
                    className="filter-select"
                    placeholder="Code Filière"
                  />
                  <datalist id="filieres">
                    {filtersData.filieres.map(f => (
                      <option key={f.code_filiere} value={f.code_filiere} />
                    ))}
                  </datalist>
                </div>

                <div className="filter-group">
                  <input
                    list="niveaux"
                    id="niveauFilter"
                    name="niveauFilter"
                    value={filters.niveau}
                    onChange={(e) => handleFilterChange('niveau', e.target.value)}
                    className="filter-select"
                    placeholder="Niveau"
                  />
                  <datalist id="niveaux">
                    {filtersData.niveaux.map((n, index) => (
                      <option key={`niveau-${index}`} value={n} />
                    ))}
                  </datalist>
                </div>

                <div className="filter-group">
                  <input
                    list="regionalOptions"
                    id="regionalFilter"
                    name="regionalFilter"
                    value={filters.regional}
                    onChange={(e) => handleFilterChange('regional', e.target.value)}
                    className="filter-select"
                    placeholder="Regional"
                  />
                  <datalist id="regionalOptions">
                    {filtersData.regional.map((r, index) => (
                      <option key={`regional-${index}`} value={r} />
                    ))}
                  </datalist>
                </div>

                <button
                  onClick={() => setFilters({
                    code_filiere: '',
                    niveau: '',
                    regional: ''
                  })}
                  className="reset-btn"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          )}

          <div className="row">
            <div className="col-12">
              <div className={darkMode ? "card-alets mb-4" : "card-alets mb-4 card-alets-dark-mode"}>
                <div className={darkMode ? "card-body-alets" : "card-body-alets card-body_dark_alets"}>
                  <div className="table-responsive">
                    <table className={darkMode ? "table table-striped" : "table table-dark table-striped"}>
                      <thead>
                        <tr>
                          <th>code filière</th>
                          <th>Code groupe</th>
                          <th>Code module</th>
                          <th>régionale</th>
                          <th>état</th>
                          <th>date fin prévu</th>
                          <th>mh restante</th>
                          <th>dates d'alerte</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedAlerts.length > 0 ? (
                          paginatedAlerts.map(alert => (
                            <tr key={alert.id}>
                              <td>{alert.code_filiere}</td>
                              <td>{alert.code_groupe}</td>
                              <td>{alert.code_module}</td>
                              <td>{alert.regional || 'N/A'}</td>
                              <td>{alert.etat}</td>
                              <td>{alert.date_fin_prevu}</td>
                              <td>{alert.mhrestante}</td>
                              <td>{new Date(alert.created_at).toLocaleDateString()}</td>
                              <td>
                                <button
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => navigate('/avancementDetail')}
                                >
                                  <FontAwesomeIcon icon={faEye} />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="9" className="text-center">No alerts found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

 
                              <div className="pagination-container-alerts1">
              <button
                className="pagination-btn-alerts1"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Précédent
              </button>
              <span className="current-page-alerts1">Page {currentPage}</span>
              <button
                className="pagination-btn-alerts1"
                disabled={currentPage > totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Suivant
              </button>
            </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alerts;
