// import { useState } from 'react'
import { RouterProvider } from "react-router-dom";
import './App.css'
import { router } from "./router/router";
import { AlertProvider } from './context/AlertContext'; // adjust path

function App() {
  // const [count, setCount] = useState(0)

  return (
   <>
    <AlertProvider>

    <RouterProvider router={router}/>
    </AlertProvider>
     </>
  )
}

export default App


// import { AlertProvider } from './contexts/AlertContext'; // adjust path

// function App() {
//   return (
//     <AlertProvider>
//       {/* your app structure */}
//     </AlertProvider>
//   );
// }
