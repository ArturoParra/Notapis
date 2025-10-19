import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa' // <- Importa el plugin
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
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
      }
    })
  ],
})