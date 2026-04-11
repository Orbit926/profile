import { Suspense, lazy } from 'react';
import { Box, CircularProgress } from '@mui/material';
import Header from '../components/layout/Header';
import Hero from '../components/sections/Hero';
import WhatsAppButton from '../components/WhatsAppButton';

const About = lazy(() => import('../components/sections/About'));
const TechStack = lazy(() => import('../components/sections/TechStack'));
const ProjectsPreview = lazy(() => import('../components/sections/ProjectsPreview'));
const Experience = lazy(() => import('../components/sections/Experience'));
const Education = lazy(() => import('../components/sections/Education'));
const WhyHireMe = lazy(() => import('../components/sections/WhyHireMe'));
const ProjectImpact = lazy(() => import('../components/sections/ProjectImpact'));
const ContactCTA = lazy(() => import('../components/sections/ContactCTA'));
const Footer = lazy(() => import('../components/sections/Footer'));

const LazySection = ({ children }) => (
  <Suspense
    fallback={
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 10,
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    }
  >
    {children}
  </Suspense>
);

const LandingPage = () => (
  <>
    <Header />
    <Hero />
    <LazySection><About /></LazySection>
    <LazySection><TechStack /></LazySection>
    <LazySection><ProjectsPreview /></LazySection>
    <LazySection><Experience /></LazySection>
    <LazySection><Education /></LazySection>
    <LazySection><WhyHireMe /></LazySection>
    <LazySection><ProjectImpact /></LazySection>
    <LazySection><ContactCTA /></LazySection>
    <LazySection><Footer /></LazySection>
    <WhatsAppButton />
  </>
);

export default LandingPage;
