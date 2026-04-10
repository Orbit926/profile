// Hero.jsx
import { Typography, Button, Box, Stack, Grid } from '@mui/material';
import { Code, RocketLaunch, Speed } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Orb from '../Orb/Orb';

// Delay base para el contenido después del orb
const containerDelay = 1.0;   // cámbialo a lo que quieras

// Variantes para el contenido (texto, bullets, botones)
const contentVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: containerDelay,
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const bulletsVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

const buttonsVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

const Hero = () => {
  const theme = useTheme();
  const { t } = useTranslation('common');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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

      {/* Orb como fondo centrado */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{
          opacity: 0.85,
          scale: 1,
          transition: {
            duration: 1.2,
            ease: 'easeOut',
          },
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

      {/* CONTENIDO CENTRADO */}
      <Box
        component={motion.div}
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        // 👇 este delay hace que el contenido espere a que salga el orb
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
            <Stack spacing={1.5} alignItems="center">
              {/* Subtítulo */}
              <Typography
                component={motion.h3}
                variants={itemVariants}
                variant="h3"
                sx={{
                  fontSize: { xs: '1.8rem', md: '2.2rem', lg: '2.4rem' },
                  fontWeight: 200,
                  letterSpacing: '-0.03em',
                  maxWidth: 900,
                }}
              >
                {t('hero.subtitle')}
              </Typography>

              {/* Título principal */}
              <Typography
                component={motion.h1}
                variants={itemVariants}
                variant="h1"
                sx={{
                  fontSize: { xs: '2.0rem', md: '2.8rem', lg: '3.2rem' },
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  textAlign: 'center',
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: 'block',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t('hero.titleLine1')}
                </Box>
                <Box
                  component="span"
                  sx={{
                    display: 'block',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t('hero.titleLine2')}
                </Box>
              </Typography>

              {/* Bullets */}
              <Stack
                component={motion.div}
                variants={bulletsVariants}
                spacing={2}
                sx={{ pt: 2, display: { xs: 'none', sm: 'flex' } }}
                alignItems="center"
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Code color="primary" />
                  <Box
                    component="span"
                    sx={{
                      display: 'block',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {t('hero.bullets.frontend')}
                  </Box>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <RocketLaunch color="secondary" />
                  <Box
                    component="span"
                    sx={{
                      display: 'block',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {t('hero.bullets.backend')}
                  </Box>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Speed sx={{ color: '#a46be3' }} />
                  <Box
                    component="span"
                    sx={{
                      display: 'block',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {t('hero.bullets.deploy')}
                  </Box>
                </Stack>
              </Stack>

              {/* Botones centrados */}
              <Stack
                component={motion.div}
                variants={buttonsVariants}
                direction="row"
                spacing={2}
                sx={{
                  pt: 4,
                  flexWrap: 'wrap',
                  //display: { xs: 'none', sm: 'flex' },
                }}
                justifyContent="center"
              >
                <Button
                  component={motion.button}
                  onClick={() => scrollToSection('services')}
                  variant="outlined"
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  sx={{
                    pointerEvents: 'auto',
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    transition: 'all 0.25s ease-in-out', // transición suave

                    '&:hover': {
                      backgroundColor: 'primary.main',
                      borderColor: 'primary.main',
                      color: '#fff',
                    },
                  }}
                  variants={{
                    rest: {
                      scale: 1,
                    },
                    hover: {
                      scale: 1.06,         // pequeño zoom al hover
                      transition: { duration: 0.25, ease: 'easeOut' },
                    },
                  }}
                >
                  {t('hero.ctaPrimary')}
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
