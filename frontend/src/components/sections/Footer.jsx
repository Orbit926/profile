import { Box, Container, Grid, Stack, Typography, IconButton, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { GitHub, Email, Instagram } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { contactConfig } from '../../config/data';

const email = contactConfig.email.address;

const navigationIds = ['hero', 'about', 'projects', 'services'];

const socialLinks = [
  { icon: GitHub, href: contactConfig.gitHub.url, label: 'GitHub' },
  { icon: Instagram, href: contactConfig.instagram.url, label: 'Instagram' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const bottomVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.6, ease: 'easeOut' },
  },
};

const Footer = () => {
  const { t, i18n } = useTranslation('common');

  const navigationLinks = [
    { id: 'hero', label: t('header.nav.home') },
    { id: 'about', label: t('header.nav.about') },
    { id: 'projects', label: t('header.nav.projects') },
    { id: 'services', label: t('header.nav.services') },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        py: { xs: 6, md: 8 },
        mt: 'auto',
        background: (theme) => `
          radial-gradient(circle at 20% 50%, rgba(125,63,185,0.08), transparent 50%),
          radial-gradient(circle at 80% 50%, rgba(93,95,233,0.08), transparent 50%),
          ${theme.palette.background.paper}
        `,
        borderTop: '1px solid',
        borderTopColor: 'divider',
      }}
    >
      <Container sx={{ pb: { xs: 8, md: 0 } }}>
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Brand / Description */}
          <Grid size={{ xs: 12, md: 4 }} component={motion.div} variants={itemVariants}>
            <Stack spacing={2}>
              <Box
                onClick={() => scrollTo('hero')}
                component="img"
                src="/img/logos/orbit-color.png"
                alt="Orbit"
                sx={{ width: 100, height: 'auto', mb: 1, cursor: 'pointer' }}
                loading="lazy"
              />

              <Typography
                key={`footer-desc-${i18n.language}`}
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 280, lineHeight: 1.7 }}
              >
                {t('footer.description')}
              </Typography>
            </Stack>
          </Grid>

          {/* Navigation */}
          <Grid size={{ xs: 12, md: 4 }} component={motion.div} variants={itemVariants}>
            <Stack spacing={2}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', mb: 1 }}>
                {t('footer.navigation')}
              </Typography>
              <Stack spacing={1.5}>
                {navigationLinks.map((link) => (
                  <MuiLink
                    key={link.id}
                    component="button"
                    onClick={() => scrollTo(link.id)}
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      textAlign: 'left',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': { color: 'primary.main', transform: 'translateX(4px)' },
                    }}
                  >
                    {link.label}
                  </MuiLink>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Contact & Social */}
          <Grid size={{ xs: 12, md: 4 }} component={motion.div} variants={itemVariants}>
            <Stack spacing={3}>
              <Stack spacing={2}>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', mb: 1 }}>
                  {t('footer.contactTitle')}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.7, maxWidth: 280 }}
                >
                  {t('footer.contactDescription')}
                </Typography>

                <Box>
                  <MuiLink
                    href={`mailto:${email}`}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 2.5,
                      py: 1,
                      borderRadius: 2,
                      background:
                        'linear-gradient(135deg, rgba(125,63,185,0.15) 0%, rgba(93,95,233,0.1) 100%)',
                      border: '1px solid',
                      borderColor: 'primary.main',
                      color: 'primary.light',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background:
                          'linear-gradient(135deg, rgba(125,63,185,0.25) 0%, rgba(93,95,233,0.2) 100%)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <Email sx={{ fontSize: 18 }} />
                    {t('footer.sendEmail')}
                  </MuiLink>
                </Box>
              </Stack>

              <Stack spacing={1.5}>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                  {t('footer.followUs')}
                </Typography>

                <Stack direction="row" spacing={1}>
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <IconButton
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        sx={{
                          width: 40,
                          height: 40,
                          border: '1px solid',
                          borderColor: 'divider',
                          background: 'rgba(125,63,185,0.05)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: 'primary.main',
                            background: 'rgba(125,63,185,0.15)',
                            transform: 'translateY(-3px)',
                          },
                        }}
                      >
                        <Icon sx={{ fontSize: 20, color: 'text.secondary' }} />
                      </IconButton>
                    );
                  })}
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box
          component={motion.div}
          variants={bottomVariants}
          initial="hidden"
          animate="show"
          sx={{
            mt: { xs: 6, md: 8 },
            pt: 4,
            borderTop: '1px solid',
            borderTopColor: 'divider',
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ textAlign: { xs: 'center', sm: 'left' } }}
          >
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 3 }} alignItems="center">
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                © {currentYear} {t('footer.copyright')}
              </Typography>
              <MuiLink
                component={RouterLink}
                to="/privacy-policy"
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {t('footer.privacyPolicy')}
              </MuiLink>
            </Stack>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              {t('footer.madeWith')}
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
