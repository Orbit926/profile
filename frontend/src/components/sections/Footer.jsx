import { Box, Container, Stack, Typography, IconButton } from '@mui/material';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { personalConfig } from '../../config/data';

const socialLinks = [
  { icon: GitHub, href: personalConfig.github.url, label: 'GitHub' },
  { icon: LinkedIn, href: personalConfig.linkedin.url, label: 'LinkedIn' },
  { icon: Email, href: `mailto:${personalConfig.email}`, label: 'Email' },
];

const Footer = () => {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        py: { xs: 4, md: 5 },
        mt: 'auto',
        background: (theme) => theme.palette.background.paper,
        borderTop: '1px solid',
        borderTopColor: 'divider',
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Stack direction="row" spacing={1}>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <IconButton
                    key={social.label}
                    href={social.href}
                    target={social.label === 'Email' ? undefined : '_blank'}
                    rel={social.label === 'Email' ? undefined : 'noopener noreferrer'}
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

            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
              {t('footer.madeWith')}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', opacity: 0.7 }}>
              &copy; {currentYear} {t('footer.copyright')}
            </Typography>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;
