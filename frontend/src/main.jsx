import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from './config/theme.js'
import { App } from './App.jsx'
// Importar configuración de i18n (debe estar antes de renderizar)
import './i18n/i18n.js'

const container = document.getElementById('root');
const app = (
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);

// Si el contenedor ya tiene HTML (pre-renderizado en build), hidratamos.
// En dev, el div está vacío y usamos createRoot normalmente.
if (container.innerHTML.trim() !== '') {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

