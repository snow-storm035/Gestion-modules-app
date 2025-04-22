import { useState } from 'react';
import { FaChalkboardTeacher, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import "../style/dateEfmRegainal.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from "../DarkModeProvider/DarkModeContext";
// import { Button } from 'react-bootstrap';// onClick={toggleDarkMode}
// className="darkmode"
// aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
import { useNavigate } from 'react-router-dom';
const DatesEFMsReg = () => {
    // const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const { darkMode } = useDarkMode();


    // const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const postPerPage = 8;
    const lastPostindex = currentPage * postPerPage;
    const firstPostindex = lastPostindex - postPerPage;

    // Sample data - replace with your actual data

    const DateEfmRg = [
        {
            id: 1,
            filiere: { code: 'FIL101', nom: 'Développement Digital' },
            module: { code: 'M301', nom: 'JavaScript Avancé' },
            niveau: 'TS',
            regional: "oui",
            date_fin_prevu: '2023-12-30',
            annee_formation: '2023-2024',
            date_efm_reelle: '2023-12-15',
            taux_avancement: 85
        },
        {
            id: 2,
            filiere: { code: 'FIL102', nom: 'Réseaux Informatiques' },
            module: { code: 'M302', nom: 'Cisco CCNA' },
            niveau: 'T',
            regional: "non",
            date_fin_prevu: '2024-03-01',
            annee_formation: '2023-2024',
            date_efm_reelle: null,
            taux_avancement: 0
        },
        {
            id: 3,
            filiere: { code: 'FIL103', nom: 'Data Science' },
            module: { code: 'M303', nom: 'Machine Learning' },
            niveau: 'TS',
            regional: "oui",
            date_fin_prevu: '2024-02-10',
            annee_formation: '2023-2024',
            date_efm_reelle: '2024-02-05',
            taux_avancement: 100
        },
        {
            id: 4,
            filiere: { code: 'FIL104', nom: 'Design Graphique' },
            module: { code: 'M304', nom: 'UI/UX Design' },
            niveau: 'T',
            regional: "non",
            date_fin_prevu: '2024-05-15',
            annee_formation: '2024-2025',
            date_efm_reelle: null,
            taux_avancement: 60
        },
        {
            id: 5,
            filiere: { code: 'FIL105', nom: 'Marketing Digital' },
            module: { code: 'M305', nom: 'SEO Avancé' },
            niveau: 'TS',
            regional: "oui",
            date_fin_prevu: '2024-06-01',
            annee_formation: '2024-2025',
            date_efm_reelle: null,
            taux_avancement: 70
        },
        {
            id: 6,
            filiere: { code: 'FIL106', nom: 'Bureautique' },
            module: { code: 'M306', nom: 'Excel Expert' },
            niveau: 'T',
            regional: "non",
            date_fin_prevu: '2024-07-10',
            annee_formation: '2024-2025',
            date_efm_reelle: null,
            taux_avancement: 55
        },
        {
            id: 7,
            filiere: { code: 'FIL107', nom: 'Cloud Computing' },
            module: { code: 'M307', nom: 'AWS Solutions' },
            niveau: 'TS',
            regional: "oui",
            date_fin_prevu: '2024-07-20',
            annee_formation: '2024-2025',
            date_efm_reelle: null,
            taux_avancement: 12
        },
        {
            id: 8,
            filiere: { code: 'FIL108', nom: 'Cybersécurité' },
            module: { code: 'M308', nom: 'Ethical Hacking' },
            niveau: 'TS',
            regional: "oui",
            date_fin_prevu: '2024-08-15',
            annee_formation: '2024-2025',
            date_efm_reelle: '2024-08-10',
            taux_avancement: 100
        },
        {
            id: 9,
            filiere: { code: 'FIL109', nom: 'Gestion de Projet' },
            module: { code: 'M309', nom: 'Agile Scrum' },
            niveau: 'T',
            regional: "non",
            date_fin_prevu: '2024-09-30',
            annee_formation: '2024-2025',
            date_efm_reelle: null,
            taux_avancement: 28
        },
        {
            id: 10,
            filiere: { code: 'FIL110', nom: 'DevOps' },
            module: { code: 'M310', nom: 'Docker & Kubernetes' },
            niveau: 'TS',
            regional: "oui",
            date_fin_prevu: '2024-11-01',
            annee_formation: '2024-2025',
            date_efm_reelle: null,
            taux_avancement: 80
        },
        {
            id: 11,
            filiere: { code: 'FIL101', nom: 'Développement Digital' },
            module: { code: 'M301', nom: 'JavaScript Avancé' },
            niveau: 'TS',
            regional: "oui",
            date_fin_prevu: '2023-12-30',
            annee_formation: null,
            date_efm_reelle: null,
            taux_avancement: 0
        },
        {
            id: 12,
            filiere: { code: 'FIL101', nom: 'Développement Digital' },
            module: { code: 'M301', nom: 'JavaScript Avancé' },
            niveau: 'TS',
            regional: "oui",
            date_fin_prevu: '2023-12-30',
            annee_formation: '2023-2024',
            date_efm_reelle: '2023-12-15',
            taux_avancement: 85
        }
    ];

    const [filters, setFilters] = useState({
        filiere: '',
        niveau: '',
        annee_formation: ''
    });

    // Extract unique values for filters
    const filieres = [...new Set(DateEfmRg.map(doc => doc.filiere.nom))];
    const annee = [...new Set(DateEfmRg.map(doc => doc.annee_formation))];
    //   const regionale = ["Oui","Non"];
    const niveaux = ['TS', 'T'];

    // Filter function
    const filterFiliere = DateEfmRg.filter(doc => {
        return (
            (filters.filiere === '' || doc.filiere.nom === filters.filiere) &&
            (filters.annee_formation === '' || doc.annee_formation === filters.annee_formation) &&
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
            annee_formation: ''
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
            <div className='header-alets'>
                <div><span>M105 :</span><p> presque finit</p></div>
                <div><span>M105 :</span><p> presque finit</p></div>
            </div>
            <div className="container-fluid-alets">
                {/* <div className="filter-container"> */}
                <div className={darkMode ? "filter-container-alets" : "filter-container-alets filter-container-darkmode-alets"}>
                    <h2>Dates EFMs régionaux :</h2>
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
                                <option key={filiere} value={filiere}/>
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
                                <option key={niveau} value={niveau}/>
                            ))}

                            </datalist>
                        </div>
                        {/* Regional filter */}
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
                            {annee.map(annee => (
                                <option key={annee} value={annee}/>
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
                        <div className="card mb-4">
                            {/* <div className="card-body"> */}
                            <div className={darkMode ? "card-body" : "card-body card-body_dark_alets"}>
                                {/* <table className="table table-striped"> */}
                                <table className={darkMode ? "table table-striped" : "table table-dark table-striped"}>
                                    <thead>
                                        <tr>
                                            <th>code filière</th>
                                            <th>Code module</th>
                                            <th>régionale</th>
                                            <th>taux avancement</th>
                                            <th>date efm prévu</th>                                        
                                            <th>date efm réelle</th>                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAlertsWithsplice.map((avince) => (
                                            <tr key={avince.id}>
                                                <td>{avince.filiere.code}</td>
                                                <td>{avince.module.code}</td>
                                                <td>{avince.regional}</td>
                                                <td>{avince.taux_avancement}</td>
                                                <td>{avince.date_fin_prevu}</td>
                                                <td>{avince.date_efm_reelle?avince.annee_formation:"Date à déterminer"}</td>


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
                                <span style={{ color: "red" }}>Page: {currentPage}</span>
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


        </>
    );
}
export default DatesEFMsReg;