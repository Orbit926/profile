import { Container, Typography, Card, CardContent, Box, Stack, Chip, Grid, Button } from '@mui/material';
import { OpenInNew, GitHub } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { personalConfig } from '../../config/data';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const ProjectsPreview = () => {
  const { t } = useTranslation('common');

  const projects = [
    {
      key: 'greenpaw',
      tech: ['React', 'Shopify', 'Headless CMS', 'UX Design'],
      gradient: 'linear-gradient(135deg, rgba(125,185,63,0.2) 0%, rgba(93,233,95,0.1) 100%)',
      accentColor: '#4caf50',
    },
    {
      key: 'flixy',
      tech: ['React', 'Frontend Architecture', 'Responsive UI'],
      gradient: 'linear-gradient(135deg, rgba(233,93,95,0.2) 0%, rgba(185,63,125,0.1) 100%)',
      accentColor: '#e91e63',
    },
    {
      key: 'orbit',
      tech: ['React', 'MUI', 'Design System', 'AWS'],
      gradient: 'linear-gradient(135deg, rgba(125,63,185,0.2) 0%, rgba(93,95,233,0.1) 100%)',
      accentColor: '#7d3fb9',
    },
  ];

  return (
    <Box id="projects" sx={{ py: { xs: 8, md: 12 }, background: (theme) => theme.palette.background.default }}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <Stack spacing={2} sx={{ mb: 6, textAlign: 'center', alignItems: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
              {t('projects.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, textAlign: 'center' }}>
              {t('projects.subtitle')}
            </Typography>
          </Stack>
        </motion.div>

        <Grid
          container
          spacing={4}
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
          {projects.map((project) => (
            <Grid
              key={project.key}
              size={{ xs: 12, md: 4 }}
              component={motion.div}
              variants={itemVariants}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'rgba(8, 10, 24, 0.6)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    borderColor: project.accentColor,
                    transform: 'translateY(-8px)',
                    boxShadow: `0 16px 48px ${project.accentColor}25`,
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, ${project.accentColor}, transparent)`,
                  },
                }}
              >
                <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Stack spacing={2} sx={{ flexGrow: 1 }}>
                    <Box>
                      <Chip
                        label={t(`projects.${project.key}.type`)}
                        size="small"
                        sx={{
                          background: `${project.accentColor}20`,
                          color: project.accentColor,
                          fontWeight: 600,
                          mb: 2,
                          border: `1px solid ${project.accentColor}40`,
                        }}
                      />
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                        {t(`projects.${project.key}.name`)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {t(`projects.${project.key}.description`)}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        background: 'rgba(125,63,185,0.06)',
                        border: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Impact
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 500 }}>
                        {t(`projects.${project.key}.impact`)}
                      </Typography>
                    </Box>

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {project.tech.map((tech, techIndex) => (
                        <Chip
                          key={techIndex}
                          label={tech}
                          size="small"
                          variant="outlined"
                          sx={{ borderColor: 'divider', fontSize: '0.75rem' }}
                        />
                      ))}
                    </Stack>
                  </Stack>

                  <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                    {personalConfig.projects[project.key]?.demo && (
                      <Button
                        component="a"
                        href={personalConfig.projects[project.key].demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        variant="contained"
                        startIcon={<OpenInNew sx={{ fontSize: 16 }} />}
                        sx={{
                          flex: 1,
                          borderRadius: 2,
                          fontWeight: 600,
                          fontSize: '0.8rem',
                          textTransform: 'none',
                          background: `${project.accentColor}`,
                          '&:hover': { background: `${project.accentColor}cc` },
                        }}
                      >
                        {t('projects.viewDemo')}
                      </Button>
                    )}
                    {personalConfig.projects[project.key]?.github && (
                      <Button
                        component="a"
                        href={personalConfig.projects[project.key].github}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        variant="outlined"
                        startIcon={<GitHub sx={{ fontSize: 16 }} />}
                        sx={{
                          flex: 1,
                          borderRadius: 2,
                          fontWeight: 600,
                          fontSize: '0.8rem',
                          textTransform: 'none',
                          borderColor: 'rgba(255,255,255,0.15)',
                          color: 'text.primary',
                          '&:hover': { borderColor: project.accentColor, color: project.accentColor },
                        }}
                      >
                        {t('projects.viewCode')}
                      </Button>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProjectsPreview;
