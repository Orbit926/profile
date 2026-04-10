import { Suspense, lazy } from 'react';
import { Box } from '@mui/material';
import Header from '../components/layout/Header';
import Hero from '../components/sections/Hero';
import { SnackbarProvider } from '../context/SnackbarContext';

// Carga diferida (lazy)
const About = lazy(() => import('../components/sections/About'));
const ProjectsPreview = lazy(() => import('../components/sections/ProjectsPreview'));
const Pricing = lazy(() => import('../components/sections/Pricing'));
const Testimonials = lazy(() => import('../components/sections/Testimonials'));
const Process = lazy(() => import('../components/sections/Process'));
const TechStack = lazy(() => import('../components/sections/TechStack'));
const FaqSection = lazy(() => import('../components/sections/FaqSection'));
const ContactCTA = lazy(() => import('../components/sections/ContactCTA'));
const Footer = lazy(() => import('../components/sections/Footer'));
const FloatingWhatsApp = lazy(() => import('../components/layout/FloatingWhatsApp'));

const LandingPage = () => {
  return (
    <SnackbarProvider>
      <Box component="main" sx={{ minHeight: '100vh' }}>
        <Header />
        <Hero />
        {/* Todo lo demás se carga en segundo plano */}
        <Suspense fallback={null}>
          <Box component="section" id="about">
            <About />
            <ProjectsPreview />
          </Box>
          <Box component="section" id="services">
            {/* <Services /> */}
            <Pricing />
            <Testimonials />
            <Process />
            <TechStack />
            <FaqSection />
          </Box>
          <Box component="section" id="contact">
            <ContactCTA />
          </Box>
          <Box component="footer">
            <Footer />
          </Box>
          <FloatingWhatsApp />
        </Suspense>
      </Box>
    </SnackbarProvider>
  );
};

export default LandingPage;
