import { useState } from 'react';
import {
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Link,
  Typography,
  LinearProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { contactConfig } from '../../config/data';
import { sendContactForm } from '../../utils/sendContactForm';
import { useSnackbar } from '../../context/SnackbarContext';

// Los tipos de proyecto ahora vienen de i18n

// El schema de validación se crea dinámicamente dentro del componente

export const ContactForm = () => {
  const { t } = useTranslation('common');
  const { executeRecaptcha } = useGoogleReCaptcha();
  const endpointURL = contactConfig.API_URL;
  const { setIsSnackbarOpen } = useSnackbar();

  // Tipos de proyecto dinámicos
  const projectTypes = [
    t('contact.form.projectTypes.landing'),
    t('contact.form.projectTypes.webapp'),
    t('contact.form.projectTypes.ecommerce'),
    t('contact.form.projectTypes.other'),
  ];

  // Schema de validación con mensajes traducidos
  const contactSchema = z.object({
    name: z.string().min(1, t('contact.form.validation.nameRequired')),
    email: z.string().email(t('contact.form.validation.emailInvalid')),
    phone: z.string().min(10, t('contact.form.validation.phoneInvalid')),
    projectType: z.string().min(1, t('contact.form.validation.projectTypeRequired')),
    message: z.string().min(10, t('contact.form.validation.messageRequired')),
    _hp: z.string().optional(), // Honeypot
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // 'success' | 'error' | 'info' | 'warning'
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      projectType: '',
      message: '',
      _hp: '',
    },
  });

  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
    setIsSnackbarOpen(false);
  };

  const onSubmit = async (data) => {
    if (data._hp) return; // Bot detectado

    try {
      const result = await sendContactForm({
        formData: data,
        executeRecaptcha,
        endpointURL,
      });

      if (result.ok) {
        setSnackbar({
          open: true,
          message: t('contact.form.success'),
          severity: 'success',
        });
        setIsSnackbarOpen(true);
        reset();
      } else {
        setSnackbar({
          open: true,
          message: t('contact.form.error'),
          severity: 'error',
        });
        setIsSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error enviando formulario:', error);
      setSnackbar({
        open: true,
        message: t('contact.form.errorUnexpected'),
        severity: 'error',
      });
      setIsSnackbarOpen(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {/* Línea de carga mientras se envía */}
        {isSubmitting && <LinearProgress />}

        {/* Honeypot oculto */}
        <Controller
          name="_hp"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              sx={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />
          )}
        />

        {/* Nombre / Email / Celular */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  fullWidth
                  label={t('contact.form.name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  fullWidth
                  label={t('contact.form.email')}
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  fullWidth
                  label={t('contact.form.phone')}
                  type="tel"
                  placeholder={t('contact.form.phonePlaceholder')}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* Tipo de proyecto */}
        <Controller
          name="projectType"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              select
              fullWidth
              label={t('contact.form.projectType')}
              error={!!errors.projectType}
              helperText={errors.projectType?.message}
            >
              {projectTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* Mensaje */}
        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              fullWidth
              label={t('contact.form.message')}
              multiline
              rows={4}
              placeholder={t('contact.form.messagePlaceholder')}
              error={!!errors.message}
              helperText={errors.message?.message}
            />
          )}
        />

        {/* Aviso reCAPTCHA */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1 }}
          aria-label="Aviso de protección reCAPTCHA de Google"
        >
          {t('contact.form.recaptchaNotice')}{' '}
          <Link
            href="https://policies.google.com/privacy?hl=es"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('contact.form.privacyPolicy')}
          </Link>{' '}
          {t('contact.form.and')}{' '}
          <Link
            href="https://policies.google.com/terms?hl=es"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('contact.form.termsOfService')}
          </Link>{' '}
          {t('contact.form.ofGoogle')}
        </Typography>

        {/* Aviso de privacidad de Orbit */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          {t('contact.form.privacyNotice')}{' '}
          <Link
            component={RouterLink}
            to="/privacy-policy"
            sx={{
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 600,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {t('contact.form.privacyLink')}
          </Link>
        </Typography>

        {/* Botón de envío */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={isSubmitting}
          sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' } }}
        >
          {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
        </Button>
      </Stack>

      {/* Snackbar de feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </form>
  );
};
