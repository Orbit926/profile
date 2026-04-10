import { Container, Typography, Box, Stack, Paper, Grid, Divider } from '@mui/material';
import { 
  RocketLaunch, 
  Speed, 
  Code, 
  CloudDone,
  Verified,
  Groups,
  TrendingUp,
  AutoAwesome
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const About = () => {
  const { t } = useTranslation('common');
  
  const strengths = [
    {
      icon: Code,
      title: t('about.strengths.modern.title'),
      description: t('about.strengths.modern.description'),
    },
    {
      icon: Speed,
      title: t('about.strengths.performance.title'),
      description: t('about.strengths.performance.description'),
    },
    {
      icon: CloudDone,
      title: t('about.strengths.deploy.title'),
      description: t('about.strengths.deploy.description'),
    },
    {
      icon: AutoAwesome,
      title: t('about.strengths.design.title'),
      description: t('about.strengths.design.description'),
    },
  ];

  const values = [
    {
      icon: Verified,
      text: t('about.values.quality'),
    },
    {
      icon: Groups,
      text: t('about.values.communication'),
    },
    {
      icon: TrendingUp,
      text: t('about.values.results'),
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: (theme) => theme.palette.background.paper,
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.75rem' },
                fontWeight: 700,
                mb: 2,
              }}
            >
              {t('about.title')}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.1rem', md: '1.4rem' },
                fontWeight: 500,
                color: 'primary.light',
                lineHeight: 1.6,
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              {t('about.subtitle')}
            </Typography>
          </Box>
        </motion.div>

        {/* Mission & Vision Cards */}
        <Grid container spacing={3} sx={{ mb: { xs: 6, md: 8 } }} alignItems="stretch">
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  background: 'rgba(8, 10, 24, 0.6)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: '1px solid rgba(125, 63, 185, 0.3)',
                  borderRadius: 3,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: '0 12px 40px rgba(125, 63, 185, 0.25)',
                    transform: 'translateY(-6px)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    background:
                      'radial-gradient(circle at 20% 20%, rgba(125,63,185,0.15), transparent 50%)',
                    pointerEvents: 'none',
                  },
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      p: 1.5,
                      borderRadius: 2,
                      background: 'rgba(125, 63, 185, 0.15)',
                      mb: 2.5,
                    }}
                  >
                    <RocketLaunch sx={{ fontSize: 32, color: 'primary.light' }} />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      fontSize: { xs: '1.3rem', md: '1.5rem' },
                    }}
                  >
                    {t('about.mission.title')}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.8 }}
                  >
                    {t('about.mission.description')}
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.1 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  background: 'rgba(8, 10, 24, 0.6)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: '1px solid rgba(93, 95, 233, 0.3)',
                  borderRadius: 3,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    borderColor: '#5d5fe9',
                    boxShadow: '0 12px 40px rgba(93, 95, 233, 0.25)',
                    transform: 'translateY(-6px)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100%',
                    height: '100%',
                    background:
                      'radial-gradient(circle at 80% 20%, rgba(93,95,233,0.15), transparent 50%)',
                    pointerEvents: 'none',
                  },
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      p: 1.5,
                      borderRadius: 2,
                      background: 'rgba(93, 95, 233, 0.15)',
                      mb: 2.5,
                    }}
                  >
                    <TrendingUp sx={{ fontSize: 32, color: '#5d5fe9' }} />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      fontSize: { xs: '1.3rem', md: '1.5rem' },
                    }}
                  >
                    {t('about.vision.title')}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.8 }}
                  >
                    {t('about.vision.description')}
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 6, md: 8 }, opacity: 0.1 }} />

        {/* Strengths Section */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.75rem', md: '2.25rem' },
                fontWeight: 700,
                mb: 1,
                textAlign: 'center',
              }}
            >
              {t('about.strengthsTitle')}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                textAlign: 'center',
                mb: 5,
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.7,
              }}
            >
              {t('about.strengthsSubtitle')}
            </Typography>
          </motion.div>

          <Grid container spacing={3} alignItems="stretch">
            {strengths.map((strength, index) => {
              const IconComponent = strength.icon;
              return (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: 'flex' }}>
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-50px' }}
                    custom={index}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        height: '100%',
                        background: 'rgba(8, 10, 24, 0.5)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: 'primary.main',
                          background: 'rgba(125, 63, 185, 0.08)',
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 24px rgba(125, 63, 185, 0.2)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: 'inline-flex',
                          p: 1.2,
                          borderRadius: 2,
                          background: 'rgba(125, 63, 185, 0.12)',
                          mb: 2,
                        }}
                      >
                        <IconComponent sx={{ fontSize: 28, color: 'primary.light' }} />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          fontSize: '1.1rem',
                        }}
                      >
                        {strength.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.7 }}
                      >
                        {strength.description}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <Divider sx={{ my: { xs: 6, md: 8 }, opacity: 0.1 }} />

        {/* Values Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 700,
              mb: 1,
              textAlign: 'center',
            }}
          >
            {t('about.valuesTitle')}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              textAlign: 'center',
              mb: 4,
              maxWidth: '650px',
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            {t('about.valuesSubtitle')}
          </Typography>

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            sx={{ maxWidth: '900px', mx: 'auto' }}
          >
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  style={{ flex: 1 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      background: 'rgba(8, 10, 24, 0.5)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        background: 'rgba(125, 63, 185, 0.08)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(125, 63, 185, 0.2)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'inline-flex',
                        p: 1.5,
                        borderRadius: '50%',
                        background: 'rgba(125, 63, 185, 0.12)',
                        mb: 2,
                      }}
                    >
                      <IconComponent sx={{ fontSize: 32, color: 'primary.light' }} />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        fontSize: '1.05rem',
                      }}
                    >
                      {value.text}
                    </Typography>
                  </Paper>
                </motion.div>
              );
            })}
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About;
