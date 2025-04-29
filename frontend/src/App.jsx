// import { useState } from 'react'
 import { BrowserRouter as Router, Routes, Route, RouterProvider } from "react-router-dom";
// import Menu from './Menu/Menu'
//  import Contenu from './Menu/Layout'
 import Layout from './Menu/Layout';// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import DarkModeToggle from './DarkModeProvider/DarkModeToggle';
//  import Welcome from './login/welcome';
 import Login from './login/login';
import Register from './login/register';
// import ModuleDetails from "./model/ModuleDetails";
import AvancementDetails from "./avancement/AvancementDetails";
import Alerts from "./Alerts/alert";
import ImporterFichierExcel from "./Alerts/ImporterFichierExcel";
import UpdateModuleStatu from "./group/UpdateModuleStatu";
import AvancemnetGroup from "./avancement/AvancementGroup";
import Home from "./Contenu/Home";
import AvencementFiliere from "./Filieres/avencementFilieres";
import DetailsAvencemnet from "./group/DetailsAvencemnet";
import CalendrierEfm from "./model/calendrierEfm";
import Etatmodel from "./model/etatmodel";
import { router } from "./router/router";

function App() {
  // const [count, setCount] = useState(0)

  return (
   <>
    {/* <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>} />
          <Route path="etatmodel" element={<Etatmodel />} />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="avancemnetGroup" element={<AvancemnetGroup />} />
          <Route path="avancementDetail" element={<AvancementDetails />} />
          <Route path="avencementFiliere" element={<AvencementFiliere />} />
          
          <Route path="alerts" element={<Alerts />} />
          <Route path="importerfichierexcel" element={<ImporterFichierExcel />} />
          <Route path="calendrierEfm" element={<CalendrierEfm />} />
          <Route path="updateModuleStatu" element={<UpdateModuleStatu />} />
          <Route path="detailsAvencemnet" element={<DetailsAvencemnet />} />
        </Route>
      </Routes>
    </Router>   */}
    {/* <Welcome/> */}
    {/* <Login/> */}
    {/* <Register/>  */}
    {/* <DarkModeToggle/> */}
    <RouterProvider router={router}/>
     </>
  )
}

export default App
