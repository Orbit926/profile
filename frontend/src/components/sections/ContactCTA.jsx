import { Container, Typography, Button, Box, Stack, TextField, MenuItem, Paper, Grid } from '@mui/material';
import { Email, CalendarMonth } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ContactForm } from '../contact_form/ContactForm';
import { contactConfig } from '../../config/data';

// El mensaje de WhatsApp se genera dinámicamente dentro del componente

const ContactCTA = () => {
  const { t } = useTranslation('common');
  
  const defaultMessage = t('floatingWhatsApp.defaultMessage');
  const message = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${contactConfig.whatsapp.number}?text=${message}`;

  return (
    <Box
      sx={{
        py: 10,
        background: (theme) => theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container sx={{ position: 'relative', zIndex: 1 }}>
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
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              {t('contact.subtitle')}
            </Typography>
          </Stack>
        </motion.div>

        <Grid container spacing={4} sx={{ maxWidth: 1000, mx: 'auto' }}>
          {/* CTA Buttons */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={3}>
              <Paper
                component={motion.div}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                sx={{
                  p: 3,
                  background: (theme) => theme.custom.cardGradient,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Stack spacing={2} alignItems="center" textAlign="center">
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(125,63,185,0.3) 0%, rgba(93,95,233,0.3) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CalendarMonth sx={{ fontSize: 28, color: 'primary.main' }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {t('contact.schedule.title')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('contact.schedule.description')}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    href={whatsappUrl}
                    target="_blank"
                  >
                    {t('contact.schedule.cta')}
                  </Button>
                </Stack>
              </Paper>

              <Paper
                component={motion.div}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.2 }}
                sx={{
                  p: 3,
                  background: (theme) => theme.custom.cardGradient,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Stack spacing={2} alignItems="center" textAlign="center">
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(93,95,233,0.3) 0%, rgba(125,63,185,0.3) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Email sx={{ fontSize: 28, color: 'secondary.main' }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {t('contact.email.title')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('contact.email.description')}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    href={`mailto:${contactConfig.email.address}`}
                    target="_blank"
                  >
                    {t('contact.email.cta')}
                  </Button>
                </Stack>
              </Paper>
            </Stack>
          </Grid>

          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              component={motion.div}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              sx={{
                p: 4,
                background: (theme) => theme.custom.cardGradient,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                {t('contact.form.title')}
              </Typography>
              <ContactForm />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactCTA;
