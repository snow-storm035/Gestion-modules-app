// src/components/Layout.js
import { NavLink, Outlet } from "react-router-dom";
import "./styleLayout.css";
import LogoOfppt from "../image/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCodeBranch, faBook, faUserGroup, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import Logout from "./Logout";
import DarkMode from "./DarkMode";
import { useDarkMode } from '../DarkModeProvider/DarkModeContext';

const Layout = () => {
  const { darkMode } = useDarkMode();


  // onClick={toggleDarkMode}
  // className="darkmode"
  // aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}


  return (
    <div className="countiner">
      <div className="menu">
        {/* logo this is page dashbord  */}
        <div className="logo">
          <img src={LogoOfppt} alt="Office OFPPT" /> {/* Logo added */}
          <h2>Dashboard</h2>
        </div>
        {/* navbur  */}
        <div className="navbar">
          <nav>
            <ul>
              <li><NavLink className={({ isActive }) => isActive ? "link_dashbord active-link" : "link_dashbord"} to="/"> <FontAwesomeIcon className="icon-fontawesome" icon={faHouse} />Acceuil</NavLink></li>
              <li><NavLink className={({ isActive }) => isActive ? "link_dashbord active-link" : "link_dashbord"} to="/etatmodel"><FontAwesomeIcon className="icon-fontawesome" icon={faBook} />États modules</NavLink></li>
              <li className="avancements-nav">Avancements</li>
              <li><NavLink className={({ isActive }) => isActive ? "link_dashbord active-link" : "link_dashbord"} to="/avancemnetGroup"><FontAwesomeIcon className="icon-fontawesome" icon={faUserGroup} />Groupes</NavLink></li>
              <li><NavLink className={({ isActive }) => isActive ? "link_dashbord active-link" : "link_dashbord"} to="/avencementFiliere"><FontAwesomeIcon className="icon-fontawesome" icon={faCodeBranch} />Filières</NavLink></li>
              <div className="div-hr">

              </div>
              <li><NavLink className={({ isActive }) => isActive ? "link_dashbord active-link" : "link_dashbord"} to="/alerts"><FontAwesomeIcon className="icon-fontawesome" icon={faCircleExclamation} />Alerts</NavLink></li>
            </ul>

          </nav>
        </div>

        {/* dark mode and logout => deconection  */}
        <div className="darkModeAndlogout">
          <Logout />
          <DarkMode />
        </div>
      </div>
      {/* content  */}
      <div className={darkMode ? "contenu" : "contenu contenuDarkblack"}>

        <Outlet />
      </div>

        <div className="alert-puple">

        </div>
    </div>

  );
};

export default Layout;