import { Container, Typography, Box, Stack, Paper, Grid } from '@mui/material';
import { RocketLaunch, CloudDone, Architecture } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const counterVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const ProjectImpact = () => {
  const { t } = useTranslation('common');

  const items = [
    { key: 'deployed', icon: RocketLaunch, color: '#4caf50', stat: '6+' },
    { key: 'cloud', icon: CloudDone, color: '#FF9900', stat: 'AWS' },
    { key: 'scalable', icon: Architecture, color: '#5d5fe9', stat: '100%' },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: (theme) => theme.palette.background.paper,
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <Stack spacing={2} sx={{ mb: 6, textAlign: 'center', alignItems: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
              {t('impact.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, textAlign: 'center' }}>
              {t('impact.subtitle')}
            </Typography>
          </Stack>
        </motion.div>

        <Grid container spacing={3} alignItems="stretch">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Grid key={item.key} size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
                <motion.div
                  variants={counterVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.15 }}
                  style={{ width: '100%' }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      textAlign: 'center',
                      background: 'rgba(8, 10, 24, 0.5)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: item.color,
                        transform: 'translateY(-4px)',
                        boxShadow: `0 8px 24px ${item.color}20`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        background: `${item.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      <Icon sx={{ fontSize: 28, color: item.color }} />
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        fontSize: '2rem',
                        color: item.color,
                        mb: 1,
                      }}
                    >
                      {item.stat}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1rem' }}>
                      {t(`impact.items.${item.key}.title`)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, textAlign: 'justify' }}>
                      {t(`impact.items.${item.key}.description`)}
                    </Typography>
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

export default ProjectImpact;
