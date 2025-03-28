import "../style/styleHome.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser, faGreaterThan, faBell } from '@fortawesome/free-solid-svg-icons';


export default function Home() {
  return <>
    {/* four div about number moudil and goroub and professoure  */}
    <div className="header">
      <div>
        <span>20</span>
        <FontAwesomeIcon className="faChalkboardUser" icon={faChalkboardUser} />
        <FontAwesomeIcon className="faGreaterThan" icon={faGreaterThan} />
      </div>
      <div>
        <span>20</span>
        <FontAwesomeIcon className="faChalkboardUser" icon={faChalkboardUser} />
        <FontAwesomeIcon className="faGreaterThan" icon={faGreaterThan} />
      </div>
      <div>
        <span>20</span>
        <FontAwesomeIcon className="faChalkboardUser" icon={faChalkboardUser} />
        <FontAwesomeIcon className="faGreaterThan" icon={faGreaterThan} />
      </div>

      <div>
        <span>20</span>
        <FontAwesomeIcon className="faChalkboardUser" icon={faChalkboardUser} />
        <FontAwesomeIcon className="faGreaterThan" icon={faGreaterThan} />
      </div>

    </div>
    {/* this parter exest tow div asise and articl */}


    <div className="informtionCountner">
      <div className="aside">
        <div className="alert-container">
          <p>Alert</p>
          <button className="btn-notification">
            <FontAwesomeIcon icon={faBell} />
            <span className="notification-badge">1</span>
          </button>
        </div>
        <div className="module-progress-card">
          <h2 className="module-progress-title">Progès des modules</h2>

          <div className="progress-highlight">
            <span className="progress-percentage">75%</span>
            <span className="progress-label">highest progress</span>
          </div>

          <div className="module-details">
            <p className="module-name">Module : développement frontend</p>
          </div>

          <button className="view-details-btn">
            Détails <FontAwesomeIcon icon={faGreaterThan} />
          </button>
        </div>

        <div className="completed-modules-container">
          <p>Modules terminés</p>
          <button className="navigation-button">
            <FontAwesomeIcon icon={faGreaterThan} />
            <FontAwesomeIcon icon={faGreaterThan} />
          </button>
        </div>
      </div>
      {/* <div className="article"> */}

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

          <button className="view-details-btn">
            Details <FontAwesomeIcon icon={faGreaterThan} />
          </button>
        </div>
      </div>
    {/* </div> */}
  </>
}