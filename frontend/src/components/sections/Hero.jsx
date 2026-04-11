// Hero.jsx
import { Typography, Button, Box, Stack, Grid, useMediaQuery } from '@mui/material';
import { Download, Visibility } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { personalConfig } from '../../config/data';
import Orb from '../Orb/Orb';

const containerDelay = 1.0;

const contentVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: containerDelay,
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const Hero = () => {
  const theme = useTheme();
  const { t } = useTranslation('common');
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        textAlign: 'center',
        background: theme.palette.background.default,
        px: 2,
      }}
      id="hero"
    >
      {/* Gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: (theme) => theme.custom.heroGradient,
          opacity: 0.15,
          zIndex: 0,
        }}
      />

      {/* Orb background */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{
          opacity: 0.85,
          scale: 1,
          transition: { duration: 1.2, ease: 'easeOut' },
        }}
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            width: { md: 900 },
            aspectRatio: '1',
            filter: 'drop-shadow(0 0 40px rgba(164,107,227,0.6))',
            '@keyframes float': {
              '0%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-16px)' },
              '100%': { transform: 'translateY(0px)' },
            },
            animation: 'float 18s ease-in-out infinite',
          }}
        >
          <Orb hue={15} hoverIntensity={0.5} rotateOnHover={true} />
        </Box>
      </Box>

      {/* Content */}
      <Box
        component={motion.div}
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        sx={{
          paddingTop: { xs: 6, sm: 0 },
          position: 'relative',
          zIndex: 2,
          width: 'fit-content',
          px: 0,
          pointerEvents: 'none',
          pb: { xs: 2, sm: 0 },
        }}
      >
        <Grid container justifyContent="center">
          <Grid size={{ xs: 12, md: 10, lg: 8 }}>
            <Stack spacing={2} alignItems="center">
              {/* Greeting chip */}
              <Box
                component={motion.div}
                variants={itemVariants}
                sx={{
                  px: 3,
                  py: 0.8,
                  borderRadius: 999,
                  background: 'rgba(125, 63, 185, 0.15)',
                  border: '1px solid rgba(125, 63, 185, 0.3)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: 'primary.light', letterSpacing: '0.02em' }}
                >
                  {t('hero.greeting')}
                </Typography>
              </Box>

              {/* Headline */}
              <Typography
                component={motion.h1}
                variants={itemVariants}
                variant="p"
                sx={{
                  fontSize: { xs: '22px', sm: '32px', lg: '35px' },
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  background: '#e6e8ee',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {isDesktop ? (
                  <>
                    {t('hero.headline1')} {t('hero.headline2')}
                  </>
                ) : (
                  <>
                    {t('hero.headline1')}
                    <br />
                    {t('hero.headline2')}
                  </>
                )}
              </Typography>

              {/* Subheadline */}
              <Typography
                component={motion.p}
                variants={itemVariants}
                variant="h5"
                sx={{
                  fontSize: { xs: '18px', md: '22px' },
                  fontWeight: 500,
                  color: 'primary.light',
                  maxWidth: 700,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                {t('hero.subheadline1')}
                <br />
                {t('hero.subheadline2')}
              </Typography>

              {/* Supporting text */}
              <Typography
                component={motion.p}
                variants={itemVariants}
                variant="body1"
                color="text.secondary"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  maxWidth: 620,
                  lineHeight: 1.7,
                  fontSize: { xs: '15px', md: '17px' },
                }}
              >
                {t('hero.supporting1')}
                <br />
                {t('hero.supporting2')}
                <br />
                {t('hero.supporting3')}
              </Typography>

              {/* CTA Buttons */}
              <Stack
                component={motion.div}
                variants={itemVariants}
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ pt: 2 }}
              >
                <Button
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollToSection('projects')}
                  variant="contained"
                  color="primary"
                  startIcon={<Visibility />}
                  sx={{
                    pointerEvents: 'auto',
                    px: { xs: 2, sm: 4 },
                    py: { xs: 1.2, sm: 1.3 },
                    borderRadius: 999,
                    fontWeight: 700,
                    fontSize: '15px',
                    boxShadow: '0 8px 32px rgba(125,63,185,0.4)',
                    display: { xs: 'none', sm: 'inline-flex' },
                  }}
                >
                  {t('hero.ctaProjects')}
                </Button>

                <Button
                  component={motion.a}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  href={personalConfig.cv}
                  download
                  variant="outlined"
                  startIcon={<Download />}
                  sx={{
                    pointerEvents: 'auto',
                    px: 4,
                    py: 1.3,
                    borderRadius: 999,
                    fontWeight: 700,
                    fontSize: '15px',
                    borderColor: 'rgba(255,255,255,0.2)',
                    color: 'text.primary',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      borderColor: 'primary.main',
                      background: 'rgba(125,63,185,0.1)',
                    },
                  }}
                >
                  {t('hero.ctaCV')}
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Hero;
