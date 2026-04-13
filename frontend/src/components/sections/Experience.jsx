import { Container, Typography, Box, Stack, Paper } from '@mui/material';
import { Work, Code } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const Experience = () => {
  const { t } = useTranslation('common');

  const experiences = [
    {
      key: 'chivas',
      icon: Work,
      color: '#7d3fb9',
    },
    {
      key: 'freelance',
      icon: Code,
      color: '#5d5fe9',
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: (theme) => theme.palette.background.default,
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <Stack spacing={2} sx={{ mb: 6, textAlign: 'center', alignItems: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
              {t('experience.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, textAlign: 'justify' }}>
              {t('experience.subtitle')}
            </Typography>
          </Stack>
        </motion.div>

        <Stack spacing={3}>
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            const tasks = t(`experience.${exp.key}.tasks`, { returnObjects: true });
            return (
              <motion.div
                key={exp.key}
                variants={itemVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.15 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, md: 4 },
                    background: 'rgba(8, 10, 24, 0.6)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 3,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: exp.color,
                      boxShadow: `0 8px 32px ${exp.color}20`,
                      transform: 'translateY(-4px)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: 4,
                      height: '100%',
                      background: exp.color,
                      borderRadius: '4px 0 0 4px',
                    },
                  }}
                >
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems={{ sm: 'flex-start' }}>
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        minWidth: 52,
                        borderRadius: 2,
                        background: `${exp.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon sx={{ fontSize: 28, color: exp.color }} />
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent="space-between"
                        alignItems={{ sm: 'center' }}
                        spacing={1}
                        sx={{ mb: 1.5 }}
                      >
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                            {t(`experience.${exp.key}.role`)}
                          </Typography>
                          <Typography variant="body2" sx={{ color: exp.color, fontWeight: 600 }}>
                            {t(`experience.${exp.key}.company`)}
                          </Typography>
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{
                            px: 2,
                            py: 0.5,
                            borderRadius: 999,
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {t(`experience.${exp.key}.period`)}
                        </Typography>
                      </Stack>

                      <Stack spacing={0.8}>
                        {Array.isArray(tasks) && tasks.map((task, taskIndex) => (
                          <Stack key={taskIndex} direction="row" spacing={1} alignItems="center">
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                minWidth: 6,
                                borderRadius: '50%',
                                background: exp.color,
                              }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {task}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </Box>
                  </Stack>
                </Paper>
              </motion.div>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
};

export default Experience;
