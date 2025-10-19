import { useState, useEffect } from 'react';

export const useOnlineStatus = () => {
  // Inicializa el estado con el valor actual del navegador
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Función para actualizar el estado
    function handleOnline() {
      setIsOnline(true);
    }

    // Función para actualizar el estado
    function handleOffline() {
      setIsOnline(false);
    }

    // Agrega los event listeners cuando el componente se monta
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Limpia los listeners cuando el componente se desmonta
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []); // El array vacío asegura que esto solo se ejecute una vez

  return isOnline;
}