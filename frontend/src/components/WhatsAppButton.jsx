import { Fab, Tooltip } from '@mui/material';
import { WhatsApp } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { personalConfig } from '../config/data';

const WhatsAppButton = () => {
  const whatsappUrl = `https://wa.me/${personalConfig.whatsapp}`;

  return (
    <Tooltip title="Contáctame por WhatsApp" placement="left">
      <Fab
        component={motion.a}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        sx={{
          position: 'fixed',
          bottom: { xs: 20, md: 32 },
          right: { xs: 20, md: 32 },
          width: { xs: 56, md: 64 },
          height: { xs: 56, md: 64 },
          background: 'linear-gradient(135deg, #A46BE3 0%, #7D3FB9 100%)',
          color: 'white',
          boxShadow: '0 8px 24px rgba(164, 107, 227, 0.5)',
          zIndex: 1000,
          '&:hover': {
            background: 'linear-gradient(135deg, #7D3FB9 0%, #5E2D8C 100%)',
            boxShadow: '0 12px 32px rgba(164, 107, 227, 0.7)',
          },
        }}
        aria-label="WhatsApp"
      >
        <WhatsApp sx={{ fontSize: { xs: 28, md: 32 } }} />
      </Fab>
    </Tooltip>
  );
};

export default WhatsAppButton;
