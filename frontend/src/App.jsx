// import { useState } from 'react'
 import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Menu from './Menu/Menu'
 import Contenu from './Menu/Layout'
 import Layout from './Menu/Layout';
 import Home from './Contenu/Home';
 import Group from './Contenu/group';
 import Avancemnet from './Contenu/Avancement';
 import Moudel from './Contenu/Moudel';
 import Professeur from './Contenu/Professeur';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import DarkModeToggle from './DarkModeProvider/DarkModeToggle';
//  import Welcome from './login/welcome';
 import Login from './login/login';
import Register from './login/register';
import ListModel from "./model/list_model";
import AddModulePage from "./model/ajoute_model";
import ModuleDetails from "./model/ModuleDetails";
import ProfesseurList from "./professeur/list_professeur";
import AddformateurForm from "./professeur/ajoute_professeur";
import FormateursDetails from "./professeur/FormateursDetails";
import GroupsList from "./group/list_group";
import AddGroupForm from "./group/ajoute_group";
import GroupDetails from "./group/GroupDetails";

function App() {
  // const [count, setCount] = useState(0)

  return (
   <>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="professeur" element={<Professeur />} />
          <Route path="avancemnet" element={<Avancemnet />} />
          <Route path="moudel" element={<Moudel />} />
          <Route path="group" element={<Group />} />
          <Route path="listmodel" element={<ListModel />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="add-module-page" element={<AddModulePage />} />
          <Route path="moduledetails" element={<ModuleDetails />} />
          <Route path="professeurList" element={<ProfesseurList />} />
          <Route path="addformateurForm" element={<AddformateurForm />} />
          <Route path="formateursdetails" element={<FormateursDetails />} />
          <Route path="groupsList" element={<GroupsList />} />
          <Route path="addGroupform" element={<AddGroupForm />} />
          <Route path="groupdetail" element={<GroupDetails />} />
        </Route>
      </Routes>
    </Router>  
    {/* <Welcome/> */}
    {/* <Login/> */}
    {/* <Register/>  */}
    {/* <DarkModeToggle/> */}
     </>
  )
}

export default App
