// src/components/Layout.js
import { NavLink, Outlet } from "react-router-dom";
import "./styleLayout.css";
import LogoOfppt from "../image/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCodeBranch, faBook, faUserGroup, faCircleExclamation, faBell } from '@fortawesome/free-solid-svg-icons';
import Logout from "./Logout";
import DarkMode from "./DarkMode";
import { useDarkMode } from '../DarkModeProvider/DarkModeContext';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate=useNavigate();
  const [notification,setNotification] = useState({
    model: "devlopment",
    notification:false
  })
  const [heddin, setHeddin] = useState(true)

  const handelHeddin = () => {
    if (heddin == true) {
      setHeddin(false)
    } else {
      setHeddin(true)
    }

  }
  const handleClick=()=>{
    handelHeddin();
    navigate("/alerts")

  }
  // handel function heddin alert

  const handleheddinalert=()=>{
 
    setNotification((prv)=>({...prv,notification:false}))
  }
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
              <li><NavLink className={({ isActive }) => isActive ? "link_dashbord active-link" : "link_dashbord"} to="/app"> <FontAwesomeIcon className="icon-fontawesome" icon={faHouse} />Acceuil</NavLink></li>
              <li><NavLink className={({ isActive }) => isActive ? "link_dashbord active-link" : "link_dashbord"} to="/app/etatmodel"><FontAwesomeIcon className="icon-fontawesome" icon={faBook} />États modules</NavLink></li>
              <li className="avancements-nav">Avancements</li>
              <li><NavLink className={({ isActive }) => isActive ? "link_dashbord active-link" : "link_dashbord"} to="/app/avancemnetGroup"><FontAwesomeIcon className="icon-fontawesome" icon={faUserGroup} />Groupes</NavLink></li>
              <li><NavLink className={({ isActive }) => isActive ? "link_dashbord active-link" : "link_dashbord"} to="/app/avencementFiliere"><FontAwesomeIcon className="icon-fontawesome" icon={faCodeBranch} />Filières</NavLink></li>
              <div className="div-hr">

              </div>
              <li><NavLink className={({ isActive }) => isActive ? "link_dashbord active-link" : "link_dashbord"} to="/app/alerts"><FontAwesomeIcon className="icon-fontawesome" icon={faCircleExclamation} />Alerts</NavLink></li>
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

  {
    notification.notification?
    <div className="alert-bubble">
    {heddin ?
      <div className="alert-message-bubble">
        <p >le group DEV105 est en retard dans le module M105. <span><a className="btn-alert-details" href="/avancementDetail" onClick={handleheddinalert}>Voir dètails</a></span></p>

      </div >
      :
      ""
    }
    <button className="btn-bubble" onClick={ handleClick} >
      <div className="alert-icon">
        <div>
          <span className="alert-number"> 1 </span>
          <FontAwesomeIcon className="faBell" icon={faBell} />
        </div>

      </div>

    </button>
  </div>
  :
  ""
  }
    </div>

  );
};

export default Layout;