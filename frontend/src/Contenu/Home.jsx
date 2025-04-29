import "../style/styleHome2.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faGreaterThan, faBook, faCodeBranch ,faUserGroup} from '@fortawesome/free-solid-svg-icons';
import CircularProgress from "../CircularProgress/CircularProgress";
import downloadImage from "../image/download.png";
import ProgressModules from "../CircularProgress/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../DarkModeProvider/DarkModeContext";
// onClick={toggleDarkMode}
// className="darkmode"
// aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}

export default function Home() {
  const navigate=useNavigate();
  const { darkMode } = useDarkMode();



  return <>
    <div className="articl-dates-card-section-header-all-div">

      {/* four div about number moudil and goroub and professoure  */}
      <div className="section-header">

        <div className="header">
          <div>
            <span>20</span>
            <FontAwesomeIcon className="faCodeBranch" icon={faCodeBranch} />
            <FontAwesomeIcon className="faGreaterThan" icon={faGreaterThan} />
          </div>
          <div>
            <span>20</span>
           
            <FontAwesomeIcon className="faUserGroup" icon={faUserGroup} />
            <FontAwesomeIcon className="faGreaterThan" icon={faGreaterThan} />
          </div>


        </div>
        <div className="informtionCountner">
          <div className="aside">
            <div  className={darkMode?"alert-container":"alert-container alert-container-dark-mode"}>

              {/* <div className="button-container"> */}
                <button className="status-button presque-finis " onClick={()=>navigate("/app/alerts")}>
                  <span className="count">5</span>
                  <span className="label">Modules presque finis</span>
                </button>

                <button className="status-button en-retards" onClick={()=>navigate("/app/alerts")}>
                  <span className="count">3</span>
                  <span className="label">Modules en retard</span>
                </button>
              {/* </div> */}
            </div>
            <div className={darkMode ? "module-progress-card" : "module-progress-card module-progress-card-dark"}>

              <h2 className="module-progress-title">Progès des modules</h2>

              <ProgressModules />
            </div>

            <div className={darkMode ? "completed-modules-container" : "completed-modules-container completed-modules-container-dark"}>
              <p>États modules</p>
              <button className="navigation-button details-button-date" onClick={()=>navigate("/app/etatmodel")}>
               {">>"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* this parter exest tow div asise and articl */}


      <div className="articl-dates-card">
        <div className="dates-efms-card article">

          <h3 className="dates-efms-title">DATES EFMS</h3>

          <ul className="module-dates-list">
            <li className="module-date-item">
              <span className="module-code">DEVOWFS&gt;M205</span>
              <span className="module-date">20/11/2024</span>
            </li>
            <li className="module-date-item">
              <span className="module-code">ID&gt;M103</span>
              <span className="module-date">20/11/2024</span>
            </li>
            <li className="module-date-item">
              <span className="module-code">GEOGC&gt;M201</span>
              <span className="module-date">15/01/2025</span>
            </li>
            <li className="module-date-item">
              <span className="module-code">AA&gt;M107</span>
              <span className="module-date">05/03/2025</span>
            </li>
            <li className="module-date-item">
              <span className="module-code">DD&gt;M108</span>
              <span className="module-date">15/05/2025</span>
            </li>
          </ul>

          <button className=" view-details-btn details-button-date" onClick={()=>navigate("/app/calendrierEfm")}>
          Détails {">>"} 
          </button>
        </div>
        <a href="app/importerfichierexcel" className="link-go-page-avoncemnt">
          <div className="import-file-exele-avoncement">
            <img src={downloadImage} alt="download" className="image-download" />
            <p>
              Importer les avancements
            </p>
          </div>
        </a>
      </div>
      {/* </div> */}
    </div>
  </>
}