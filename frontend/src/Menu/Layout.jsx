// src/components/Layout.js
import { NavLink,Outlet } from "react-router-dom";
import "./styleLayout.css";
import LogoOfppt from "../image/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import Logout from "./Logout";
import DarkMode from "./DarkMode";
const Layout = () => {
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
          <li><NavLink className={({ isActive }) => isActive ? "link_dashbord active-link" : "link_dashbord"}  to="/"> <FontAwesomeIcon icon={faHouse} />Home</NavLink></li>
          <li><NavLink className={({ isActive }) => isActive ? "link_dashbord active-link" : "link_dashbord"} to="/professeur">Professor</NavLink></li>
          <li><NavLink className={({ isActive }) => isActive ? "link_dashbord active-link" : "link_dashbord"} to="/avancemnet">Announcement</NavLink></li>
          <li><NavLink className={({ isActive }) => isActive ? "link_dashbord active-link" : "link_dashbord"} to="/moudel">Module</NavLink></li>
          <li><NavLink className={({ isActive }) => isActive ? "link_dashbord active-link" : "link_dashbord"} to="/group">Group</NavLink></li>
        </ul>

      </nav>
   </div>

   {/* dark mode and logout => deconection  */}
   <div className="darkModeAndlogout">
    <Logout/>
    <DarkMode/>
    <button className="darkmoude">Dark mode</button>
   </div>
   </div>
   {/* content  */}
     <div className="contenu" >
     <Outlet />
     </div>


    </div>
   
  );
};

export default Layout;