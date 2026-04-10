import { Container, Typography, Box, Stack, Paper, Grid } from '@mui/material';
import { Search, Draw, Code, Rocket } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Los pasos ahora vienen de i18n

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const Process = () => {
  const { t } = useTranslation('common');

  const steps = [
    {
      icon: Search,
      number: '01',
      title: t('process.discovery.title'),
      description: t('process.discovery.description'),
    },
    {
      icon: Draw,
      number: '02',
      title: t('process.design.title'),
      description: t('process.design.description'),
    },
    {
      icon: Code,
      number: '03',
      title: t('process.development.title'),
      description: t('process.development.description'),
    },
    {
      icon: Rocket,
      number: '04',
      title: t('process.deploy.title'),
      description: t('process.deploy.description'),
    },
  ];

  return (
    <Box sx={{ py: 10, background: (theme) => theme.palette.background.paper }}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <Stack spacing={2} sx={{ mb: 6, textAlign: 'center', alignItems: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
              {t('process.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              {t('process.subtitle')}
            </Typography>
          </Stack>
        </motion.div>

        <Grid
          container
          spacing={3}
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }} component={motion.div} variants={itemVariants}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    background: (theme) => theme.custom.cardGradient,
                    border: '1px solid',
                    borderColor: 'divider',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'secondary.main',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  {/* Number background */}
                  <Typography
                    sx={{
                      position: 'absolute',
                      top: -10,
                      right: -10,
                      fontSize: '5rem',
                      fontWeight: 800,
                      color: 'rgba(125, 63, 185, 0.1)',
                      lineHeight: 1,
                    }}
                  >
                    {step.number}
                  </Typography>

                  <Stack spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(125,63,185,0.3) 0%, rgba(93,95,233,0.3) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon sx={{ fontSize: 24, color: 'secondary.main' }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {step.description}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Process;
