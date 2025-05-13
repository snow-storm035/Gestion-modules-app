import { useState, useEffect } from 'react';
import { useDarkMode } from "../DarkModeProvider/DarkModeContext";
import "../style/CalendrierEfm.css";
import apiService from "../Axios/apiService"; // Make sure apiService is correctly imported
import { Loader } from 'lucide-react';

const CalendrierEfm = () => {
    const [calendrierEfms, setCalendrierEfms] = useState([]);
    const [filtersData, setFiltersData] = useState({
        filieres: [],
        niveaux: [],
        annees_formation: []
    });
    const [filters, setFilters] = useState({
        code_filiere: '',
        niveau: '',
        annee_formation: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const { darkMode } = useDarkMode();
    const [currentPage, setCurrentPage] = useState(1);
    const postPerPage = 8;
    const lastPostindex = currentPage * postPerPage;
    const firstPostindex = lastPostindex - postPerPage;

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await apiService.getCsrfCookie(); // If Laravel Sanctum is used
                const response = await apiService.getCalendrierEfms();
                // console.log("response:", response)
                setCalendrierEfms(response.calendrierEfms || []);
                setFiltersData({
                    filieres: response.filters?.filieres || [],
                    niveaux: Object.values(response.filters?.niveaux || {}),
                    annees_formation: Object.values(response.filters?.annees_formation || {})
                });
            } catch (err) {
                console.error('Erreur API :', err);
                setError('Erreur lors du chargement des données.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    // useEffect(() => {
    //     console.log("test calendrierEfms", calendrierEfms)
    //     console.log("test filtersData", filtersData)
    // }, [calendrierEfms, filtersData])
    // Filter function based on the selected filters
    const calendrierEfmsfilterFiliere = calendrierEfms.filter(doc => {
        return (
            (filters.code_filiere === '' || doc.code_filiere === filters.code_filiere) &&
            (filters.annee_formation === '' || doc.annee_formation === filters.annee_formation) &&
            (filters.niveau === '' || doc.niveau === filters.niveau)
        );
    });

    // Filter data based on the search term
    const filterecalendrierEfmsfilterFiliere1 = calendrierEfmsfilterFiliere.filter(filterFilieremodelGroup =>
        filterFilieremodelGroup.code_filiere.toLowerCase().includes(searchTerm.toLowerCase()) ||
        filterFilieremodelGroup.code_module.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredcalandrerefmsWithsplice = filterecalendrierEfmsfilterFiliere1.slice(firstPostindex, lastPostindex);

    // Handle filter changes
    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
        setCurrentPage(1);
    };

    // Reset all filters
    const resetFilters = () => {
        setFilters({
            code_filiere: '',
            niveau: '',
            annee_formation: ''
        });
    };
    if (loading)
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Full height center
        flexDirection: "column",
        gap: "1rem",
        fontSize: "1.2rem",
        color: "#555",
      }}
    >
      <Loader className="animate-spin" size={48} />
      <span>Chargement de la page calendrier...</span>
    </div>
  );
    if (error) return <div>Error: {error}</div>;
    //  console.log("louding....",calendrierEfmsfilterFiliere)
    return (
        <div className="container-fluid-alets">
            <div className={darkMode ? "filter-container-alets" : "filter-container-alets filter-container-darkmode-alets"}>
                <h2>Dates EFMs régionaux :</h2>

                <div className="filter-controls">
                    {/* Filiere Filter */}
                    <div className="filter-group">
                        <input
                            list="filiere"
                            id="filiereFilter"
                            name="filiereFilter"
                            value={filters.filiere}
                            onChange={(e) => handleFilterChange('filiere', e.target.value)}
                            className="filter-select"
                            placeholder="Filiere"
                        />
                        <datalist id="filiere">
                            {filtersData.filieres.map(filiere => (
                                <option key={filiere.code_filiere} value={filiere.code_filiere} >{filiere.libelle}</option>
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
                            placeholder="Niveau"
                        />
                        <datalist id="niveau">
                            {filtersData.niveaux.map(niveau => (
                                <option key={niveau} value={niveau} />
                            ))}
                        </datalist>
                    </div>

                    {/* Annee Filter */}
                    <div className="filter-group">
                        <input
                            list="anneeOptions"
                            id="anneeFilter"
                            name="anneeFilter"
                            value={filters.annee_formation}
                            onChange={(e) => handleFilterChange('annee_formation', e.target.value)}
                            className="filter-select"
                            placeholder="Sélectionner Annee formation"
                        />
                        <datalist id="anneeOptions">
                            {filtersData.annees_formation.map(annee => (
                                <option key={annee} value={annee} />
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
                    <div className={darkMode ? "card-CalendrierEfm mb-4" : "card-CalendrierEfm mb-4 card-CalendrierEfm-dark-mode"}>
                        <div className={darkMode ? "card-body" : "card-body card-body_dark_alets"}>
                            {filteredcalandrerefmsWithsplice.length > 0 ?
                                <table className={darkMode ? "table table-striped" : "table table-dark table-striped"}>
                                    <thead>
                                        <tr>
                                            <th>code filière</th>
                                            <th>code groupe</th>
                                            <th>Code module</th>
                                            <th>régionale</th>
                                            <th>date efm prévu</th>
                                            <th>date efm réelle</th>
                                        </tr>
                                    </thead>
                                    {/* {filteredcalandrerefmsWithsplice.length > 0 ? (
                                        <tbody>
                                            {filteredcalandrerefmsWithsplice.map((avince) =>
                                                avince.map((sub, idx) => (
                                                    <tr key={`${sub.id}-${idx}`}>
                                                        <td>{sub.code_filiere}</td>
                                                        <td>{sub.code_groupe}</td>
                                                        <td>{sub.code_module}</td>
                                                        <td>{sub.regional}</td>
                                                        <td>{sub.date_efm_prevu}</td>
                                                        <td>{sub.date_efm_reelle ? sub.date_efm_reelle : "Date à déterminer"}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    ) : (
                                        "Not data"
                                    )} */}
                                    {filteredcalandrerefmsWithsplice.length > 0 ?

                                        <tbody>
                                            {filteredcalandrerefmsWithsplice.map((avince) => (
                                                <tr key={avince.id}>
                                                    <td>{avince.code_filiere}</td>
                                                    <td>{avince.code_groupe}</td>
                                                    <td>{avince.code_module}</td>
                                                    <td>{avince.regional}</td>

                                                    <td>{avince.date_efm_prevu ?avince.date_efm_prevu : "Date à déterminer"}</td>
                                                    <td>{avince.date_efm_reelle ?avince.date_efm_reelle : "Date à déterminer"}</td>
                                                </tr>
                                            ))}
                                        </tbody> :
                                        "Not data"
                                    }
                                </table> :
                                ""
                            }
                        </div>

                        <div className="pagination-container-CalendrierEfm">
                            <button
                                className="pagination-btn-CalendrierEfm"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                            >
                                Previous
                            </button>
                            <span className="current-page-CalendrierEfm">Page {currentPage}</span>
                            <button
                                className="pagination-btn-CalendrierEfm"
                                onClick={() => setCurrentPage(prev => prev + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendrierEfm;
