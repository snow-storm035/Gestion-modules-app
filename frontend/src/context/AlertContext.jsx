import React, { createContext, useContext, useEffect, useState } from 'react';
import apiService from "../Axios/apiService"; // adjust path

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
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
    <AlertContext.Provider value={{ notification2,setNotification2,setLoading,setError, loading, error }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => useContext(AlertContext);
