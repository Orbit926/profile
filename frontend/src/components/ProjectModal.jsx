import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Stack,
  Chip,
  Button,
  Divider,
  Grid,
  Fade,
} from '@mui/material';
import {
  Close,
  OpenInNew,
  GitHub,
  ErrorOutline,
  Lightbulb,
  AccountTree,
  Psychology,
  Warning,
  TrendingUp,
  CheckCircleOutline,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { personalConfig } from '../config/data';

const SectionLabel = ({ icon: Icon, label, color = '#a46be3' }) => (
  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
    <Box
      sx={{
        display: 'inline-flex',
        p: 0.6,
        borderRadius: 1.5,
        background: `${color}20`,
      }}
    >
      <Icon sx={{ fontSize: 16, color }} />
    </Box>
    <Typography
      variant="overline"
      sx={{
        fontWeight: 700,
        letterSpacing: '0.1em',
        color,
        fontSize: '0.7rem',
        lineHeight: 1,
      }}
    >
      {label}
    </Typography>
  </Stack>
);

const ContentBlock = ({ children, accentColor }) => (
  <Box
    sx={{
      p: 2.5,
      borderRadius: 2,
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${accentColor}20`,
      height: '100%',
      boxSizing: 'border-box',
    }}
  >
    {children}
  </Box>
);

const BulletList = ({ items, accentColor }) => (
  <Stack spacing={1}>
    {items.map((item, i) => (
      <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start">
        <CheckCircleOutline sx={{ fontSize: 16, color: accentColor, mt: 0.2, flexShrink: 0 }} />
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          {item}
        </Typography>
      </Stack>
    ))}
  </Stack>
);

const ProjectModal = ({ open, onClose, project, projectData, accentColor }) => {
  const [imgErrors, setImgErrors] = useState({});

  if (!project || !projectData) return null;

  const { problem, solution, architecture, decisions, challenges, results, tech, screenshots } = projectData;

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={onClose}
          maxWidth="md"
          fullWidth
          scroll="paper"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 300 }}
          aria-labelledby="project-modal-title"
          PaperProps={{
            sx: {
              background: 'rgba(8, 10, 24, 0.97)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${accentColor}30`,
              borderRadius: 3,
              boxShadow: `0 24px 80px ${accentColor}20`,
              maxHeight: '90vh',
            },
          }}
          slotProps={{
            backdrop: {
              sx: { backdropFilter: 'blur(4px)', background: 'rgba(0,0,0,0.7)' },
            },
          }}
        >
          {/* Header */}
          <Box
            sx={{
              px: { xs: 3, md: 4 },
              pt: 3,
              pb: 2,
              borderBottom: `1px solid ${accentColor}20`,
              position: 'relative',
              background: `linear-gradient(135deg, ${accentColor}08 0%, transparent 60%)`,
            }}
          >
            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
              <Box>
                <Chip
                  label="Case Study"
                  size="small"
                  sx={{
                    background: `${accentColor}20`,
                    color: accentColor,
                    fontWeight: 700,
                    fontSize: '0.65rem',
                    letterSpacing: '0.08em',
                    mb: 1,
                    border: `1px solid ${accentColor}40`,
                    textTransform: 'uppercase',
                  }}
                />
                <Typography
                  id="project-modal-title"
                  variant="h4"
                  sx={{ fontWeight: 800, fontSize: { xs: '1.4rem', md: '1.8rem' } }}
                >
                  {project.name}
                </Typography>
              </Box>
              <IconButton
                onClick={onClose}
                aria-label="Close modal"
                size="small"
                sx={{
                  mt: 0.5,
                  color: 'text.secondary',
                  border: '1px solid rgba(255,255,255,0.1)',
                  '&:hover': { background: `${accentColor}20`, color: accentColor },
                }}
              >
                <Close fontSize="small" />
              </IconButton>
            </Stack>
          </Box>

          {/* Scrollable Content */}
          <DialogContent sx={{ px: { xs: 3, md: 4 }, py: 3 }}>
            <Stack spacing={4}>

              {/* Problem + Solution */}
              <Grid container spacing={3} alignItems="stretch">
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <SectionLabel icon={ErrorOutline} label="Problem" color="#e57373" />
                  <ContentBlock accentColor="#e57373">
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      {problem}
                    </Typography>
                  </ContentBlock>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <SectionLabel icon={Lightbulb} label="Solution" color="#81c784" />
                  <ContentBlock accentColor="#81c784">
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      {solution}
                    </Typography>
                  </ContentBlock>
                </Grid>
              </Grid>

              <Divider sx={{ borderColor: `${accentColor}15` }} />

              {/* Architecture */}
              <Box>
                <SectionLabel icon={AccountTree} label="Architecture" color={accentColor} />
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${accentColor}20`,
                  }}
                >
                  <Stack spacing={1.5}>
                    {architecture.map((item, i) => (
                      <Stack key={i} direction="row" alignItems="center" spacing={2}>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 700,
                            color: accentColor,
                            minWidth: 120,
                            fontSize: '0.72rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                          }}
                        >
                          {item.layer}
                        </Typography>
                        <Box
                          sx={{
                            flex: 1,
                            height: 1,
                            background: `${accentColor}25`,
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: 'text.primary', fontWeight: 500, textAlign: 'right' }}
                        >
                          {item.detail}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </Box>

              {/* Key Technical Decisions */}
              <Box>
                <SectionLabel icon={Psychology} label="Key Technical Decisions" color="#ce93d8" />
                <Stack spacing={1.5}>
                  {decisions.map((d, i) => (
                    <Box
                      key={i}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        background: 'rgba(206,147,216,0.04)',
                        border: '1px solid rgba(206,147,216,0.12)',
                        borderLeft: '3px solid #ce93d8',
                      }}
                    >
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                        {d}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>

              <Divider sx={{ borderColor: `${accentColor}15` }} />

              {/* Challenges + Results */}
              <Grid container spacing={3} alignItems="stretch">
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <SectionLabel icon={Warning} label="Challenges" color="#ffb74d" />
                  <ContentBlock accentColor="#ffb74d">
                    <BulletList items={challenges} accentColor="#ffb74d" />
                  </ContentBlock>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <SectionLabel icon={TrendingUp} label="Results / Impact" color="#81c784" />
                  <ContentBlock accentColor="#81c784">
                    <BulletList items={results} accentColor="#81c784" />
                  </ContentBlock>
                </Grid>
              </Grid>

              {/* Tech Stack */}
              <Box>
                <SectionLabel icon={AccountTree} label="Technologies Used" color={accentColor} />
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {tech.map((t, i) => (
                    <Chip
                      key={i}
                      label={t}
                      size="small"
                      sx={{
                        background: `${accentColor}15`,
                        color: accentColor,
                        border: `1px solid ${accentColor}30`,
                        fontWeight: 600,
                        fontSize: '0.78rem',
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              {/* Screenshots */}
              {screenshots && screenshots.length > 0 && (
                <Box>
                  <SectionLabel icon={AccountTree} label="Screenshots" color={accentColor} />
                  <Grid container spacing={2}>
                    {screenshots.map((src, i) => (
                      !imgErrors[i] && (
                        <Grid key={i} size={{ xs: 12, sm: 6 }}>
                          <Box
                            component="img"
                            src={src}
                            alt={`Screenshot ${i + 1}`}
                            onError={() => setImgErrors((prev) => ({ ...prev, [i]: true }))}
                            sx={{
                              width: '100%',
                              borderRadius: 2,
                              border: `1px solid ${accentColor}25`,
                              transition: 'transform 0.3s ease',
                              '&:hover': { transform: 'scale(1.02)' },
                            }}
                          />
                        </Grid>
                      )
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Links */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} pt={1}>
                {personalConfig.projects[project.key]?.demo && (
                  <Button
                    component="a"
                    href={personalConfig.projects[project.key].demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    startIcon={<OpenInNew />}
                    sx={{
                      flex: 1,
                      py: 1.2,
                      borderRadius: 2,
                      fontWeight: 700,
                      textTransform: 'none',
                      background: accentColor,
                      '&:hover': { background: `${accentColor}cc` },
                    }}
                  >
                    View Live Demo
                  </Button>
                )}
                {personalConfig.projects[project.key]?.github && (
                  <Button
                    component="a"
                    href={personalConfig.projects[project.key].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    startIcon={<GitHub />}
                    sx={{
                      flex: 1,
                      py: 1.2,
                      borderRadius: 2,
                      fontWeight: 700,
                      textTransform: 'none',
                      borderColor: `${accentColor}50`,
                      color: 'text.primary',
                      '&:hover': { borderColor: accentColor, color: accentColor },
                    }}
                  >
                    View Code
                  </Button>
                )}
              </Stack>

            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
