import { Container, Typography, Box, Stack, Paper, Grid } from '@mui/material';
import { Code, Storage, Cloud } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const About = () => {
  const { t } = useTranslation('common');

  const highlights = [
    { icon: Code, key: 'frontend', color: '#7d3fb9' },
    { icon: Storage, key: 'backend', color: '#5d5fe9' },
    { icon: Cloud, key: 'cloud', color: '#a46be3' },
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, fontWeight: 700, mb: 3 }}
            >
              {t('about.title')}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: { xs: '1rem', md: '1.15rem' },
                lineHeight: 1.8,
                maxWidth: 750,
                mx: 'auto',
              }}
            >
              {t('about.description')}
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={3} alignItems="stretch">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <Grid key={item.key} size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.1 }}
                  style={{ width: '100%' }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      background: 'rgba(8, 10, 24, 0.6)',
                      backdropFilter: 'blur(14px)',
                      WebkitBackdropFilter: 'blur(14px)',
                      border: '1px solid',
                      borderColor: `${item.color}33`,
                      borderRadius: 3,
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.4s ease',
                      '&:hover': {
                        borderColor: item.color,
                        boxShadow: `0 12px 40px ${item.color}40`,
                        transform: 'translateY(-6px)',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '100%',
                        background: `radial-gradient(circle at 30% 20%, ${item.color}20, transparent 50%)`,
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
                          background: `${item.color}20`,
                          mb: 2.5,
                        }}
                      >
                        <Icon sx={{ fontSize: 32, color: item.color }} />
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, mb: 1.5, fontSize: { xs: '1.3rem', md: '1.4rem' } }}
                      >
                        {t(`about.highlights.${item.key}.title`)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {t(`about.highlights.${item.key}.description`)}
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
