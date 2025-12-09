// src/api/config.js
/// <reference types="vite/client" />

export const API_URL:string = import.meta.env.VITE_API_URL || "http://localhost:8080";

// Opción recomendada: Un helper para no escribir la URL completa siempre
export const getApiUrl = (endpoint: string): string => {
    // Se asegura de manejar las barras / para evitar dobles (//)
    const base = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${base}${path}`;
};
