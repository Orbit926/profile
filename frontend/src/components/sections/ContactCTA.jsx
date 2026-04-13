import { Container, Typography, Button, Box, Stack, Paper, Grid } from '@mui/material';
import { Email, LinkedIn, GitHub, Download, Code } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { personalConfig } from '../../config/data';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const ContactCTA = () => {
  const { t } = useTranslation('common');

  const links = [
    {
      key: 'email',
      icon: Email,
      label: t('contact.email'),
      href: `mailto:${personalConfig.email}`,
      color: '#7d3fb9',
      variant: 'contained',
    },
    {
      key: 'linkedin',
      icon: LinkedIn,
      label: t('contact.linkedin'),
      href: personalConfig.linkedin.url,
      color: '#0A66C2',
      variant: 'outlined',
    },
    {
      key: 'github',
      icon: GitHub,
      label: t('contact.github'),
      href: personalConfig.github.url,
      color: '#e6e8ee',
      variant: 'outlined',
    },
    {
      key: 'leetcode',
      icon: Code,
      label: 'LeetCode',
      href: personalConfig.leetcode.url,
      color: '#FFA116',
      variant: 'outlined',
    },
    {
      key: 'cv',
      icon: Download,
      label: t('contact.downloadCV'),
      href: personalConfig.cv,
      color: '#5d5fe9',
      variant: 'outlined',
      download: true,
    },
  ];

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        background: (theme) => theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 50% 0%, rgba(125,63,185,0.1), transparent 60%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <Stack spacing={2} sx={{ mb: 6, textAlign: 'center', alignItems: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
              {t('contact.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, textAlign: 'justify' }}>
              {t('contact.subtitle')}
            </Typography>
          </Stack>
        </motion.div>

        <Grid container spacing={2} justifyContent="center">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <Grid key={link.key} size={{ xs: 12, sm: 6 }}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    component="a"
                    href={link.href}
                    target={link.download ? undefined : '_blank'}
                    rel={link.download ? undefined : 'noopener noreferrer'}
                    download={link.download || undefined}
                    fullWidth
                    variant={link.variant}
                    startIcon={<Icon />}
                    sx={{
                      py: 2,
                      px: 3,
                      borderRadius: 3,
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      textTransform: 'none',
                      justifyContent: 'center',
                      ...(link.variant === 'contained'
                        ? {
                            background: `linear-gradient(135deg, ${link.color}, ${link.color}cc)`,
                            boxShadow: `0 8px 24px ${link.color}40`,
                            '&:hover': {
                              boxShadow: `0 12px 32px ${link.color}50`,
                              transform: 'translateY(-2px)',
                            },
                          }
                        : {
                            borderColor: `${link.color}40`,
                            color: link.color,
                            '&:hover': {
                              borderColor: link.color,
                              background: `${link.color}10`,
                              transform: 'translateY(-2px)',
                            },
                          }),
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {link.label}
                  </Button>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactCTA;
