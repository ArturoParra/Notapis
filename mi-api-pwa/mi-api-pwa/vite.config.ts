import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiUrl = (env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '');
  return {
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
    }),
    tailwindcss(),
    VitePWA({
      // 1. Estrategia de registro del Service Worker
      // 'autoUpdate' revisará y aplicará actualizaciones automáticamente
      registerType: 'autoUpdate',
      
      // 2. Archivo Manifest (configura cómo se ve la app instalada)
      manifest: {
        name: 'Notapis', // Nombre completo de la app
        short_name: 'NotapisMD', // Nombre corto para el ícono
        description: 'Una app PWA para tomar notas con Markdown.',
        theme_color: '#ffffff', // Color de la barra de la app
        background_color: '#ffffff', // Color de la pantalla de bienvenida (splash screen)
        start_url: '/', // Página que se abre al iniciar
        display: 'standalone', // Hace que se vea como una app nativa
        icons: [
          {
            src: 'android-launchericon-192-192.png', // Ícono para Android
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'Square44x44Logo.altform-unplated_targetsize-64.png', // Ícono principal
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '512.png', // Ícono para iOS (maskable)
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        // Configuración para el Service Worker
        runtimeCaching: [
          {
            // Regex para interceptar las llamadas a tu API
            // Asegúrate que coincida con la URL de tu API
            urlPattern: new RegExp(`^${apiUrl}/api/notas.*`), 
            
            // Estrategia: StaleWhileRevalidate
            handler: 'StaleWhileRevalidate',
            
            options: {
              // Nombre de la caché donde se guardarán las notas
              cacheName: 'api-notas-cache',
              expiration: {
                maxEntries: 50, // Máximo 50 respuestas de API cacheadas
                maxAgeSeconds: 60 * 60 * 24 * 30 // Cachear por 30 días
              }
            }
          }
        ]
      }
    })
  ],
    define: {
      'process.env': env
    }
  }
})