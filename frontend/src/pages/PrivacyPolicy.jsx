import { useEffect } from 'react';
import { Box, Container, Typography, Stack, Paper, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Footer from '../components/sections/Footer';

const PrivacyPolicy = () => {
  const { t } = useTranslation('common');

  // Scroll al inicio al montar el componente
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Box component="main" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 12, md: 16 },
          pb: { xs: 6, md: 8 },
          background: (theme) => theme.palette.background.default,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Fondo con gradients estilo glassmorphism */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(circle at 20% 30%, rgba(125,63,185,0.15), transparent 50%), radial-gradient(circle at 80% 70%, rgba(93,95,233,0.15), transparent 50%)',
            zIndex: 0,
          }}
        />

        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Stack spacing={2} alignItems="center" textAlign="center">
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #7d3fb9 0%, #5d5fe9 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t('privacy.title')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
                {t('privacy.lastUpdated')}: {new Date().toLocaleDateString()}
              </Typography>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* Content Section */}
      <Container sx={{ flex: 1, py: { xs: 6, md: 8 } }}>
        <Paper
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          sx={{
            p: { xs: 3, md: 6 },
            background: (theme) => theme.custom.cardGradient,
            border: '1px solid',
            borderColor: 'divider',
            maxWidth: 900,
            mx: 'auto',
          }}
        >
          <Stack spacing={4}>
            {/* Introducción */}
            <Box>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {t('privacy.intro')}
              </Typography>
            </Box>

            <Divider />

            {/* Sección 1: Datos que recopilamos */}
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                {t('privacy.dataCollected.title')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                {t('privacy.dataCollected.description')}
              </Typography>
              <Stack component="ul" spacing={1} sx={{ pl: 2 }}>
                {t('privacy.dataCollected.items', { returnObjects: true }).map((item, index) => (
                  <Typography key={index} component="li" variant="body2" color="text.secondary">
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Box>

            <Divider />

            {/* Sección 2: Finalidad del tratamiento */}
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                {t('privacy.purpose.title')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                {t('privacy.purpose.description')}
              </Typography>
              <Stack component="ul" spacing={1} sx={{ pl: 2 }}>
                {t('privacy.purpose.items', { returnObjects: true }).map((item, index) => (
                  <Typography key={index} component="li" variant="body2" color="text.secondary">
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Box>

            <Divider />

            {/* Sección 3: Conservación de datos */}
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                {t('privacy.retention.title')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {t('privacy.retention.description')}
              </Typography>
            </Box>

            <Divider />

            {/* Sección 4: Derechos del usuario */}
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                {t('privacy.rights.title')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                {t('privacy.rights.description')}
              </Typography>
              <Stack component="ul" spacing={1} sx={{ pl: 2 }}>
                {t('privacy.rights.items', { returnObjects: true }).map((item, index) => (
                  <Typography key={index} component="li" variant="body2" color="text.secondary">
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Box>

            <Divider />

            {/* Sección 5: Contacto */}
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                {t('privacy.contact.title')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {t('privacy.contact.description')}
              </Typography>
            </Box>

            {/* Botón de regreso */}
            <Box sx={{ pt: 2 }}>
              <Typography
                component={RouterLink}
                to="/"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateX(-4px)',
                  },
                }}
              >
                ← {t('privacy.backToHome')}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
};

export default PrivacyPolicy;
