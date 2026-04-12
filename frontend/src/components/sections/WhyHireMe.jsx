import { Container, Typography, Box, Stack, Paper, Grid } from '@mui/material';
import { Bolt, WorkHistory, Layers, Code } from '@mui/icons-material';
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

const WhyHireMe = () => {
  const { t } = useTranslation('common');

  const reasons = [
    { key: 'learner', icon: Bolt, color: '#FF9900' },
    { key: 'experience', icon: WorkHistory, color: '#7d3fb9' },
    { key: 'stack', icon: Layers, color: '#5d5fe9' },
    { key: 'algorithms', icon: Code, color: '#4caf50' },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: (theme) => theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
          background: 'radial-gradient(circle, rgba(125,63,185,0.08), transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <Stack spacing={2} sx={{ mb: 6, textAlign: 'center', alignItems: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
              {t('whyHireMe.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, textAlign: 'center' }}>
              {t('whyHireMe.subtitle')}
            </Typography>
          </Stack>
        </motion.div>

        <Grid container spacing={3} alignItems="stretch">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Grid key={reason.key} size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.12 }}
                  style={{ width: '100%' }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      textAlign: 'center',
                      background: 'rgba(8, 10, 24, 0.6)',
                      backdropFilter: 'blur(14px)',
                      WebkitBackdropFilter: 'blur(14px)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 3,
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.4s ease',
                      '&:hover': {
                        borderColor: reason.color,
                        boxShadow: `0 12px 40px ${reason.color}25`,
                        transform: 'translateY(-6px)',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        background: `linear-gradient(90deg, transparent, ${reason.color}, transparent)`,
                        opacity: 0,
                        transition: 'opacity 0.4s ease',
                      },
                      '&:hover::after': {
                        opacity: 1,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        background: `${reason.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                      }}
                    >
                      <Icon sx={{ fontSize: 32, color: reason.color }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                      {t(`whyHireMe.reasons.${reason.key}.title`)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, textAlign: 'justify' }}>
                      {t(`whyHireMe.reasons.${reason.key}.description`)}
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

export default WhyHireMe;
