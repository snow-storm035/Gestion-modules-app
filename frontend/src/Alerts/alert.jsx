import { useEffect, useState } from 'react';
// import { FaChalkboardTeacher, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import "../style/alert.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from "../DarkModeProvider/DarkModeContext";
import { data, useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiService from '../Axios/apiService';
const Alerts = () => {
    // code fech data from database
    const [documentsAlerts, setDocumentsAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const { darkMode } = useDarkMode();
    const [filters, setFilters] = useState({
        filiere: '',
        niveau: '',
        regional: ''
    });


    // const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const postPerPage = 8;
    const lastPostindex = currentPage * postPerPage;
    const firstPostindex = lastPostindex - postPerPage;

        // Data fetching
        useEffect(() => {
            console.log("sdfghjkl;'")
            const fetchData = async () => {
                try {
                    setLoading(true);
                    await apiService.getCsrfCookie();
                    const response = await apiService.getAlerts();
                    console.log("alerts",response.alerts)
                    setDocumentsAlerts(response.alerts || []);
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

      
  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;
    //   end code fetch data



    // Sample data - replace with your actual data


    // const documentsAlerts = [
    //     {
    //         id: 1,
    //         filiere: { code: 'FIL101', nom: 'Développement Digital' },
    //         module: { code: 'M301', nom: 'JavaScript Avancé' },
    //         groupe: { code: 'GRP01', nom: 'Groupe A', annee_formation: '2023-2024' },
    //         niveau: 'TS',
    //         status: 'En cours',
    //         regional: "oui",
    //         mh_restante: 18,
    //         date_fin_prevu: '2023-12-30',
    //         create_at:"2023-12-30"
            
    //     },

    //     {
    //         id: 2,
    //         filiere: { code: 'FIL102', nom: 'Réseaux Informatiques' },
    //         module: { code: 'M302', nom: 'Cisco CCNA' },
    //         groupe: { code: 'GRP02', nom: 'Groupe B', annee_formation: '2023-2024' },
    //         niveau: 'T',
    //         status: 'Planifié',
    //         regional: "non",
    //         mh_restante: 120,
    //         date_fin_prevu: '2024-03-01',
    //         create_at:"2023-12-30"
    //     },
    //     {
    //         id: 3,
    //         filiere: { code: 'FIL103', nom: 'Data Science' },
    //         module: { code: 'M303', nom: 'Machine Learning' },
    //         groupe: { code: 'GRP03', nom: 'Groupe C', annee_formation: '2023-2024' },
    //         niveau: 'TS',
    //         status: 'Terminé',
    //         regional: "oui",
    //         mh_restante: 0,
    //         date_fin_prevu: '2024-02-10',
    //         create_at:"2023-12-30"
    //     },
    //     {
    //         id: 4,
    //         filiere: { code: 'FIL104', nom: 'Design Graphique' },
    //         module: { code: 'M304', nom: 'UI/UX Design' },
    //         groupe: { code: 'GRP04', nom: 'Groupe D', annee_formation: '2024-2025' },
    //         niveau: 'T',
    //         status: 'En cours',
    //         regional: "non",
    //         mh_restante: 25,
    //         date_fin_prevu: '2024-05-15',
    //         create_at:"2023-12-30"
    //     },
    //     {
    //         id: 5,
    //         filiere: { code: 'FIL105', nom: 'Marketing Digital' },
    //         module: { code: 'M305', nom: 'SEO Avancé' },
    //         groupe: { code: 'GRP05', nom: 'Groupe E', annee_formation: '2024-2025' },
    //         niveau: 'TS',
    //         status: 'En cours',
    //         regional: "oui",
    //         mh_restante: 40,
    //         date_fin_prevu: '2024-06-01',
    //         create_at:"2023-12-30"
    //     },
    //     {
    //         id: 6,
    //         filiere: { code: 'FIL106', nom: 'Bureautique' },
    //         module: { code: 'M306', nom: 'Excel Expert' },
    //         groupe: { code: 'GRP06', nom: 'Groupe F', annee_formation: '2024-2025' },
    //         niveau: 'T',
    //         status: 'En cours',
    //         regional: "non",
    //         mh_restante: 55,
    //         date_fin_prevu: '2024-07-10',
    //         create_at:"2023-12-30"
    //     },
    //     {
    //         id: 7,
    //         filiere: { code: 'FIL107', nom: 'Cloud Computing' },
    //         module: { code: 'M307', nom: 'AWS Solutions' },
    //         groupe: { code: 'GRP07', nom: 'Groupe G', annee_formation: '2024-2025' },
    //         niveau: 'TS',
    //         status: 'En cours',
    //         regional: "oui",
    //         mh_restante: 12,
    //         date_fin_prevu: '2024-07-20',
    //         create_at:"2023-12-30"
    //     },
    //     {
    //         id: 8,
    //         filiere: { code: 'FIL108', nom: 'Cybersécurité' },
    //         module: { code: 'M308', nom: 'Ethical Hacking' },
    //         groupe: { code: 'GRP08', nom: 'Groupe H', annee_formation: '2024-2025' },
    //         niveau: 'TS',
    //         status: 'Terminé',
    //         regional: "oui",
    //         mh_restante: 0,
    //         date_fin_prevu: '2024-08-15',
    //         create_at:"2023-12-30"
    //     },
    //     {
    //         id: 9,
    //         filiere: { code: 'FIL109', nom: 'Gestion de Projet' },
    //         module: { code: 'M309', nom: 'Agile Scrum' },
    //         groupe: { code: 'GRP09', nom: 'Groupe I', annee_formation: '2024-2025' },
    //         niveau: 'T',
    //         status: 'En cours',
    //         regional: "non",
    //         mh_restante: 28,
    //         date_fin_prevu: '2024-09-30',
    //         create_at:"2023-12-30"
    //     },
    //     {
    //         id: 10,
    //         filiere: { code: 'FIL110', nom: 'DevOps' },
    //         module: { code: 'M310', nom: 'Docker & Kubernetes' },
    //         groupe: { code: 'GRP10', nom: 'Groupe J', annee_formation: '2024-2025' },
    //         niveau: 'TS',
    //         status: 'Planifié',
    //         regional: "oui",
    //         mh_restante: 80,
    //         date_fin_prevu: '2024-11-01',
    //         create_at:"2023-12-30"
    //     },
    //     {
    //         id: 11,
    //         filiere: { code: 'FIL101', nom: 'Développement Digital' },
    //         module: { code: 'M301', nom: 'JavaScript Avancé' },
    //         groupe: { code: 'GRP01', nom: 'Groupe A', annee_formation: '2023-2024' },
    //         niveau: 'TS',
    //         status: 'En cours',
    //         regional: "oui",
    //         mh_restante: 18,
    //         date_fin_prevu: '2023-12-30',
    //         create_at:"2023-12-30"
    //     },
    //     {
    //         id: 12,
    //         filiere: { code: 'FIL101', nom: 'Développement Digital' },
    //         module: { code: 'M301', nom: 'JavaScript Avancé' },
    //         groupe: { code: 'GRP01', nom: 'Groupe A', annee_formation: '2023-2024' },
    //         niveau: 'TS',
    //         status: 'En cours',
    //         regional: "oui",
    //         mh_restante: 18,
    //         date_fin_prevu: '2023-12-30',
    //         create_at:"2023-12-30"
    //     }
    // ];


    // Extract unique values for filters
    const filieres = [...new Set(documentsAlerts.map(doc => doc.filiere.nom))];
    //   const regionale = ["Oui","Non"];
    const niveaux = ['TS', 'T'];

    // Filter function
    const filterFiliere = documentsAlerts.filter(doc => {
        return (
            (filters.filiere === '' || doc.filiere.nom === filters.filiere) &&
            (filters.regional === '' || doc.regional === filters.regional) &&
            (filters.niveau === '' || doc.niveau === filters.niveau)
        );
    });
    // Handle filter change
    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
        setCurrentPage(1)
    }
    //   
    // const handleSearchChange = (e) => {
    //     setSearchTerm(e.target.value);
    //     setCurrentPage(1)
    // };
    // Reset all filters
    const resetFilters = () => {
        setFilters({
            filiere: '',
            niveau: '',
            regional: ''
        });
    };

    const filteredAlert = filterFiliere.filter(filterFilieremodelGroup =>
        filterFilieremodelGroup.filiere.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        filterFilieremodelGroup.groupe.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        filterFilieremodelGroup.module.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredAlertsWithsplice = filteredAlert.slice(firstPostindex, lastPostindex)
    return (
        <>

            <div className="container-fluid-alets">
                {/* <div className="filter-container"> */}
                <div className={darkMode ? "filter-container-alets" : "filter-container-alets filter-container-darkmode-alets"}>
                    <h2>Alerts:</h2>
                    {/* <div className="input-group mb-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search something here..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div> */}

                    <div className="filter-controls">
                        {/* filiere Filter */}
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
                                {/* <option value=""> Niveaux</option> */}
                                {filieres.map(filiere => (
                                    <option key={filiere} value={filiere} />
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
                                {/* <option value=""> Niveaux</option> */}
                                {niveaux.map(niveau => (
                                    <option key={niveau} value={niveau} />
                                ))}

                            </datalist>
                        </div>
                        {/* Regional filter */}
                        <div className="filter-group">

                            <input
                                list="regionalOptions"
                                id="regionalFilter"
                                name="regionalFilter"
                                value={filters.regional}
                                onChange={(e) => handleFilterChange('regional', e.target.value)}
                                className="filter-select"
                                placeholder="Sélectionner une région"
                            />
                            <datalist id="regionalOptions">
                                <option value="oui" />
                                <option value="non" />

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
                        <div className={darkMode ? "card-alets mb-4" : "card-alets mb-4 card-alets-dark-mode"}>
                            {/* <div className="card-body"> */}
                            <div className={darkMode ? "card-body-alets" : "card-body-alets card-body_dark_alets"}>
                                {/* <table className="table table-striped"> */}
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
                                            <th>dates d’alerte</th>
                                            <th>Actions </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAlertsWithsplice.length>0?filteredAlertsWithsplice.map((avince) => (
                                            <tr key={avince.id}>
                                                <td>{avince.filiere.code}</td>
                                                <td>{avince.code_groupe}</td>
                                                <td>{avince.code_module}</td>
                                                <td>{avince.regional}</td>
                                                <td>{avince.status}</td>
                                                <td>{avince.date_fin_prevu}</td>
                                                <td>{avince.created_at}</td>
                                                <td>{avince.mhrestante}</td>

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
                                        )):
                                        "loading..."}
                                    </tbody>
                                </table>
                            </div>

                            avancement_id
{/* : 
50
code_groupe
: 
"COMPT301"
code_module
: 
"M311"
created_at
: 
"2025-04-30T15:46:24.000000Z"
etat
: 
"presque fini"
id
: 
1
matricule
: 
"12201"
mhrestante
: 
0
updated_at
: 
"2025-04-30T15:46:24.000000Z" */}


                            <div className="pagination-container-alerts">
                                <button
                                    className="pagination-btn-alerts"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                >
                                    Previous
                                </button>
                                <span className="current-page-alerts">Page {currentPage}</span>
                                <button
                                    className="pagination-btn-alerts"
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}
export default Alerts;




