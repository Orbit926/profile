import { Container, Typography, Box, Stack, Avatar, Paper, Grid } from '@mui/material';
import { FormatQuote } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// Los testimonios ahora vienen de i18n

const Testimonials = () => {
  const { t } = useTranslation('common');

  const testimonials = [
    {
      name: t('testimonials.luisSergio.name'),
      role: t('testimonials.luisSergio.role'),
      avatar: 'https://i.pravatar.cc/150?img=12',
      quote: t('testimonials.luisSergio.quote'),
    },
    {
      name: t('testimonials.mariaJose.name'),
      role: t('testimonials.mariaJose.role'),
      avatar: 'https://i.pravatar.cc/150?img=32',
      quote: t('testimonials.mariaJose.quote'),
    },
    {
      name: t('testimonials.sara.name'),
      role: t('testimonials.sara.role'),
      avatar: 'https://i.pravatar.cc/150?img=47',
      quote: t('testimonials.sara.quote'),
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: (theme) => theme.palette.background.default,
        position: 'relative',
      }}
    >
      <Container>
        {/* Header */}
        <Stack spacing={2} sx={{ mb: 8, textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
            {t('testimonials.title')}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: 'auto', lineHeight: 1.7 }}
          >
            {t('testimonials.subtitle')}
          </Typography>
        </Stack>

        {/* Testimonials Grid */}
        <Grid container spacing={3}>
          {testimonials.map((testimonial, index) => (
            <Grid key={index} size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 3,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: (theme) => theme.palette.background.paper,
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: 'primary.main',
                    boxShadow: '0 8px 24px rgba(125, 63, 185, 0.25)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: 'linear-gradient(90deg, #7D3FB9 0%, #5D5FE9 100%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover::before': {
                    opacity: 1,
                  },
                }}
              >
                <Stack spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
                  {/* Quote Icon */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      opacity: 0.1,
                      transform: 'rotate(180deg)',
                    }}
                  >
                    <FormatQuote sx={{ fontSize: 80, color: 'primary.main' }} />
                  </Box>

                  {/* Avatar and Info */}
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      sx={{
                        width: 56,
                        height: 56,
                        border: '2px solid',
                        borderColor: 'primary.main',
                        boxShadow: '0 4px 12px rgba(125, 63, 185, 0.3)',
                      }}
                    />
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: '1rem',
                          mb: 0.5,
                        }}
                      >
                        {testimonial.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: '0.85rem' }}
                      >
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Quote Text */}
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.8,
                      fontSize: '0.95rem',
                      fontStyle: 'italic',
                      position: 'relative',
                      '&::before': {
                        content: '"“"',
                        position: 'absolute',
                        left: -12,
                        top: -4,
                        fontSize: '2rem',
                        color: 'primary.main',
                        opacity: 0.3,
                        fontFamily: 'Georgia, serif',
                      },
                    }}
                  >
                    {testimonial.quote}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;
