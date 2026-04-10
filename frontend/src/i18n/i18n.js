// Configuración de i18next para internacionalización
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar archivos de traducción
import commonES from '../locales/es/common.json';
import commonEN from '../locales/en/common.json';

// Configuración de recursos de traducción
const resources = {
  es: {
    common: commonES,
  },
  en: {
    common: commonEN,
  },
};

i18n
  // Detectar el idioma del navegador
  .use(LanguageDetector)
  // Pasar la instancia i18n a react-i18next
  .use(initReactI18next)
  // Inicializar i18next
  .init({
    resources,
    fallbackLng: 'es', // Idioma por defecto si no se detecta ninguno
    defaultNS: 'common', // Namespace por defecto
    
    // Solo usar código de idioma base (es, en), sin región (es-MX, en-US)
    load: 'languageOnly',
    
    // Mapear variantes de idioma al idioma base
    nonExplicitSupportedLngs: true,
    
    // Configuración de detección de idioma
    detection: {
      // Orden de búsqueda: localStorage > navigator
      order: ['localStorage', 'navigator'],
      // Guardar idioma seleccionado en localStorage
      caches: ['localStorage'],
      // Clave para almacenar el idioma en localStorage
      lookupLocalStorage: 'i18nextLng',
    },

    interpolation: {
      escapeValue: false, // React ya escapa por defecto
    },

    // Reaccionar a cambios de idioma
    react: {
      useSuspense: false,
    },
  });

export default i18n;
