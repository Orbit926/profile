import { Container, Typography, Box, Stack, Paper } from '@mui/material';
import { School } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Education = () => {
  const { t } = useTranslation('common');

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        background: (theme) => theme.palette.background.paper,
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <Stack spacing={2} sx={{ mb: 5, textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
              {t('education.title')}
            </Typography>
          </Stack>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
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
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#a46be3',
                boxShadow: '0 8px 32px rgba(164,107,227,0.2)',
                transform: 'translateY(-4px)',
              },
            }}
          >
            <Stack spacing={3}>
              <Stack direction="row" spacing={3} alignItems="flex-start">
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    minWidth: 60,
                    borderRadius: 2,
                    background: 'rgba(164,107,227,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <School sx={{ fontSize: 32, color: '#a46be3' }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.15rem', mb: 0.5 }}>
                    {t('education.degree')}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#a46be3', fontWeight: 600, mb: 0.5 }}>
                    {t('education.university')}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'primary.light', fontWeight: 600, mb: 0.5 }}>
                    {t('education.status')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('education.graduation')}
                  </Typography>
                </Box>
              </Stack>

              {/* Relevant Coursework */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: 'text.primary' }}>
                  Relevant Coursework
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                    gap: 1,
                  }}
                >
                  {t('education.relevantCourses', { returnObjects: true }).map((course, i) => (
                    <Typography
                      key={i}
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        '&::before': {
                          content: '"•"',
                          color: '#a46be3',
                          fontWeight: 'bold',
                        },
                      }}
                    >
                      {course}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Stack>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Education;
