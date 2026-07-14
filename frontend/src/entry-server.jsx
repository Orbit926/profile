import { renderToString } from 'react-dom/server';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './config/theme.js';

// Inicializar i18n antes de renderizar (idioma: es por defecto)
import './i18n/i18n.js';

// Importar todos los componentes directamente — sin lazy() ni Suspense
// (renderToString no puede esperar dynamic imports)
import Header from './components/layout/Header.jsx';
import Hero from './components/sections/Hero.jsx';
import About from './components/sections/About.jsx';
import TechStack from './components/sections/TechStack.jsx';
import ProjectsPreview from './components/sections/ProjectsPreview.jsx';
import Experience from './components/sections/Experience.jsx';
import Education from './components/sections/Education.jsx';
import WhyHireMe from './components/sections/WhyHireMe.jsx';
import ProjectImpact from './components/sections/ProjectImpact.jsx';
import ContactCTA from './components/sections/ContactCTA.jsx';
import Footer from './components/sections/Footer.jsx';

// Layout SSR: igual que LandingPage pero con imports síncronos
const SSRApp = () => (
  <>
    <Header />
    <Hero />
    <About />
    <TechStack />
    <ProjectsPreview />
    <div id="experience">
      <Experience />
      <Education />
      <WhyHireMe />
      <ProjectImpact />
    </div>
    <ContactCTA />
    <Footer />
  </>
);

export function render() {
  const html = renderToString(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SSRApp />
    </ThemeProvider>
  );
  return { html };
}
