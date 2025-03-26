import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Menu from './Menu/Menu'
// import Contenu from './Menu/Layout'
import Layout from './Menu/Layout';
import Home from './Contenu/Home';
import Group from './Contenu/group';
import Avancemnet from './Contenu/Avancement';
import Moudel from './Contenu/Moudel';
import Professeur from './Contenu/Professeur';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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
        </Route>
      </Routes>
    </Router>  
    {/* <Layout /> */}
     </>
  )
}

export default App
