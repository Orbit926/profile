import { 
  Container, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Box,
  Stack 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Las FAQs ahora vienen de i18n

// JSON-LD se genera dinámicamente dentro del componente

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function FaqSection() {
  const { t } = useTranslation('common');

  const faqs = [
    {
      question: t('faq.questions.whatIncludes.question'),
      answer: t('faq.questions.whatIncludes.answer'),
    },
    {
      question: t('faq.questions.timeline.question'),
      answer: t('faq.questions.timeline.answer'),
    },
    {
      question: t('faq.questions.technologies.question'),
      answer: t('faq.questions.technologies.answer'),
    },
    {
      question: t('faq.questions.support.question'),
      answer: t('faq.questions.support.answer'),
    },
    {
      question: t('faq.questions.payments.question'),
      answer: t('faq.questions.payments.answer'),
    }
  ];


  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <>
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 10 },
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ mb: 6, textAlign: 'center' }}>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontSize: { xs: '2rem', md: '2.4rem' },
                  fontWeight: 700,
                  mb: 1.5,
                }}
              >
                {t('faq.title')}
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ maxWidth: 600, mx: 'auto' }}
              >
                {t('faq.subtitle')}
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
          >
            <Stack spacing={2}>
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={itemVariants}>
                    <Accordion
                    disableGutters
                    sx={{
                        borderRadius: 2,
                        boxShadow: '0 2px 10px rgba(15, 23, 42, 0.06)',
                        backgroundColor: (theme) => theme.palette.background.paper,
                        '&:before': { display: 'none' },
                        '&.Mui-expanded': {
                        boxShadow: '0 4px 18px rgba(15, 23, 42, 0.08)',
                        },
                        transition: 'box-shadow 0.2s ease',
                    }}
                    >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon color="primary" />}
                        sx={{
                        px: 2.5,
                        py: 1.5,
                        '& .MuiAccordionSummary-content': {
                            my: 0,
                        },
                        }}
                    >
                        <Typography 
                        variant="subtitle1" 
                        sx={{ 
                            fontWeight: 600,
                            fontSize: { xs: '0.98rem', md: '1.05rem' }
                        }}
                        >
                        {faq.question}
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails
                        sx={{
                        px: 2.5,
                        pb: 2,
                        pt: 0,
                        }}
                    >
                        <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ lineHeight: 1.7 }}
                        >
                        {faq.answer}
                        </Typography>
                    </AccordionDetails>
                    </Accordion>
                </motion.div>
              ))}
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* JSON-LD para SEO */}
      <Box
        component="script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
