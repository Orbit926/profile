import { Container, Typography, Box, Stack, Button, Chip, Paper, Grid } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Los planes ahora vienen de i18n

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const Pricing = () => {
  const { t } = useTranslation('common');

  const plans = [
    {
      name: t('pricing.basic.name'),
      description: t('pricing.basic.description'),
      price: t('pricing.basic.price'),
      features: Object.values(t('pricing.basic.features', { returnObjects: true })),
      highlighted: false,
      buttonText: t('pricing.basic.cta'),
      buttonVariant: 'outlined',
    },
    {
      name: t('pricing.professional.name'),
      description: t('pricing.professional.description'),
      price: t('pricing.professional.price'),
      features: Object.values(t('pricing.professional.features', { returnObjects: true })),
      highlighted: true,
      buttonText: t('pricing.professional.cta'),
      buttonVariant: 'contained',
      badge: t('pricing.professional.badge'),
    },
    {
      name: t('pricing.custom.name'),
      description: t('pricing.custom.description'),
      price: t('pricing.custom.price'),
      features: Object.values(t('pricing.custom.features', { returnObjects: true })),
      highlighted: false,
      buttonText: t('pricing.custom.cta'),
      buttonVariant: 'outlined',
    },
  ];

  return (
    <Box
      sx={{
        py: 10,
        background: (theme) => theme.palette.background.paper,
        position: 'relative',
      }}
    >
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <Stack spacing={2} sx={{ mb: 8, textAlign: 'center', alignItems: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
              {t('pricing.title')}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              {t('pricing.subtitle')}
            </Typography>
          </Stack>
        </motion.div>

        {/* Pricing Cards */}
        <Grid
          container
          spacing={3}
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          sx={{ justifyContent: 'center' }}
        >
          {plans.map((plan, index) => (
            <Grid key={index} size={{ xs: 12, md: 4 }} component={motion.div} variants={cardVariants}>
              <Paper
                elevation={0}
                sx={{
                  height: '100%',
                  p: 4,
                  position: 'relative',
                  background: 'rgba(8, 10, 24, 0.75)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: '1px solid',
                  borderColor: plan.highlighted ? 'primary.main' : 'rgba(255,255,255,0.12)',
                  borderRadius: 3,
                  boxShadow: plan.highlighted
                    ? '0 8px 32px rgba(125, 63, 185, 0.3)'
                    : '0 4px 16px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.4s ease',
                  transform: plan.highlighted ? 'scale(1.05)' : 'scale(1)',
                  '&:hover': {
                    transform: plan.highlighted ? 'scale(1.08) translateY(-8px)' : 'scale(1.02) translateY(-4px)',
                    borderColor: 'primary.main',
                    boxShadow: plan.highlighted
                      ? '0 12px 40px rgba(125, 63, 185, 0.4)'
                      : '0 8px 24px rgba(125, 63, 185, 0.25)',
                  },
                  '&::before': plan.highlighted
                    ? {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '100%',
                        background:
                          'radial-gradient(circle at 50% 0%, rgba(125,63,185,0.15), transparent 60%)',
                        opacity: 0.8,
                        pointerEvents: 'none',
                        borderRadius: 3,
                      }
                    : {},
                }}
              >
                <Stack spacing={3} sx={{ height: '100%', position: 'relative', zIndex: 1 }}>
                  {/* Badge for highlighted plan */}
                  {plan.highlighted && (
                    <Box sx={{ position: 'absolute', top: -12, right: 16 }}>
                      <Chip
                        label={plan.badge}
                        size="small"
                        sx={{
                          background: 'linear-gradient(135deg, #7d3fb9 0%, #5d5fe9 100%)',
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          boxShadow: '0 4px 12px rgba(125, 63, 185, 0.4)',
                        }}
                      />
                    </Box>
                  )}

                  {/* Plan Header */}
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: plan.highlighted ? 'primary.light' : 'text.primary',
                      }}
                    >
                      {plan.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {plan.description}
                    </Typography>
                  </Box>

                  {/* Price */}
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        background: plan.highlighted
                          ? 'linear-gradient(135deg, #7d3fb9 0%, #5d5fe9 100%)'
                          : 'linear-gradient(135deg, rgba(125,63,185,0.8) 0%, rgba(93,95,233,0.8) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {plan.price}
                    </Typography>
                  </Box>

                  {/* Features List */}
                  <Stack spacing={1.5} sx={{ flexGrow: 1 }}>
                    {plan.features.map((feature, featureIndex) => (
                      <Box
                        key={featureIndex}
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 1.5,
                        }}
                      >
                        <CheckCircle
                          sx={{
                            fontSize: 20,
                            color: plan.highlighted ? 'primary.light' : 'primary.main',
                            flexShrink: 0,
                            mt: 0.2,
                          }}
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            lineHeight: 1.6,
                            fontSize: '0.9rem',
                          }}
                        >
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>

                  {/* CTA Button */}
                  <Button
                    variant={plan.buttonVariant}
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    sx={{
                      py: 1.5,
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      borderRadius: 2,
                      textTransform: 'none',
                      ...(plan.buttonVariant === 'contained' && {
                        background: 'linear-gradient(135deg, #7d3fb9 0%, #5d5fe9 100%)',
                        boxShadow: '0 4px 16px rgba(125, 63, 185, 0.4)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #8d4fc9 0%, #6d6ff9 100%)',
                          boxShadow: '0 6px 20px rgba(125, 63, 185, 0.5)',
                        },
                      }),
                      ...(plan.buttonVariant === 'outlined' && {
                        borderWidth: 2,
                        '&:hover': {
                          borderWidth: 2,
                          background: 'rgba(125, 63, 185, 0.1)',
                        },
                      }),
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              {t('pricing.disclaimer')}
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Pricing;
