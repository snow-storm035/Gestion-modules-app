// src/components/Layout.js
import { NavLink, Outlet } from "react-router-dom";
import "./styleLayout.css";
import LogoOfppt from "../image/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCodeBranch, faBook, faUserGroup, faCircleExclamation, faBell, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Logout from "./Logout";
import DarkMode from "./DarkMode";
import { useDarkMode } from '../DarkModeProvider/DarkModeContext';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import apiService from "../Axios/apiService"
import { AlertContext } from "../context/AlertContext";
const Layout = () => {
  const navigate = useNavigate();
  // const [notification, setNotification] = useState({
  //   model: "devlopment",
  //   notification: true
  // })
  const [heddin, setHeddin] = useState(true)
  // const [notification2, setNotification2] = useState([]);
  const { notification2, loading, error, setNotification2 } = useContext(AlertContext);
  
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // useEffect(() => {
  //   const fetchAlertCounts = async () => {
  //     try {
  //       setLoading(true); // optional, if you track global loading
  //       await apiService.getCsrfCookie(); // Laravel Sanctum support

  //       const [notification2] = await Promise.all([

  //         apiService.getNotifications(),
  //       ]);

  //       setNotification2(notification2 || []);
  //     } catch (err) {
  //       console.error("Erreur lors du chargement des alertes :", err);
  //       setError("Erreur lors du chargement des alertes."); // optional
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAlertCounts();
  // }, []);

  useEffect(() => {
    console.log("response notificatoun layout:", notification2)
  }, [notification2])
  const handelHeddin = () => {
    if (heddin == true) {
      setHeddin(false)
    } else {
      setHeddin(true)
    }

  }

  const handleClick = () => {
    handelHeddin();
    navigate("/app/alerts")

  }
  // handel function heddin alert

  const handleheddinalert = () => {
    setNotification((prv) => ({ ...prv, notification: false }))
  }
  const { darkMode } = useDarkMode();


  // onClick={toggleDarkMode}
  // className="darkmode"
  // aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}

  if (loading) return <div>Loading in layout...</div>;
  // if (error) return <div>Error: {error}</div>;
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


      {/* {notification2.notifications.length > 0 && (
  <div>
    <p>Module: {notification2.notifications[0].data.code_module}</p>
    <p>Groupe: {notification2.notifications[0].data.code_groupe}</p>
  </div>
)} */}
{/* etat */}

{/* {console.log(notification2)} */}
      {
        notification2?.notifications?.length > 0 ?
          <div className="alert-bubble">
            {heddin ?
              <div className="alert-message-bubble">
                <button className="close_btn" onClick={handelHeddin}>
                  <FontAwesomeIcon className="fa-regular fa-circle-xmark" icon={faCircleXmark} />
                </button>
                <p className="alert-text">le group <b>{notification2.notifications[0].data.code_groupe}</b> est <b>{notification2.notifications[0].data.etat}</b> dans le module <b>{notification2.notifications[0].data.code_module}</b>.
                  <span>
                    <a
                      className="btn-alert-details"
                      href={`/app/avancementDetail/${notification2.notifications[0].data.code_groupe}/${notification2.notifications[0].data.code_module}`}
                      onClick={handleheddinalert}
                    >
                      Voir détails
                    </a>
                  </span>
                </p>

              </div >
              :
              ""
            }
            <button className="btn-bubble" onClick={handleClick} >
              <div className="alert-icon">
                <div>
                  <span className="alert-number"> {notification2.unread_count} </span>
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