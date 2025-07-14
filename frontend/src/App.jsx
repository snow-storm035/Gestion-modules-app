// import { useState } from 'react'
import { RouterProvider } from "react-router-dom";
import './App.css'
import { router } from "./router/router";
import { AlertContext } from './context/AlertContext'; // adjust path
// import { AlertProvider } from './context/AlertContext'; // adjust path
import { useEffect, useState } from "react";
import apiService from "./Axios/apiService";
function App() {
  // const [count, setCount] = useState(0)

  const [notification2, setNotification2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlertCounts = async () => {
      try {
        setLoading(true);
        await apiService.getCsrfCookie();

        const [notification2] = await Promise.all([
          apiService.getNotifications(),
        ]);

        setNotification2(notification2 || []);
      } catch (err) {
        console.error('Erreur lors du chargement des alertes :', err);
        setError('Erreur lors du chargement des alertes.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlertCounts();
  }, []);

  return (
    <>
      <AlertContext.Provider value={{ notification2, setNotification2, setLoading, setError, loading, error }}>
        <RouterProvider router={router} />
      </AlertContext.Provider>
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
