import { useState, useEffect } from 'react';
import { Fab, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { WhatsApp as WhatsAppIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { contactConfig } from '../../config/data';
import { useSnackbar } from '../../context/SnackbarContext';

export const FloatingWhatsApp = () => {
  const { t } = useTranslation('common');
  const { isSnackbarOpen } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [hasShownInitially, setHasShownInitially] = useState(false);
  
  const defaultMessage = t('floatingWhatsApp.defaultMessage');
  const message = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${contactConfig.whatsapp.number}?text=${message}`;

  // En mobile: ocultar si snackbar abierto. En desktop: siempre visible
  const shouldShow = !isMobile || !isSnackbarOpen;

  useEffect(() => {
    if (shouldShow && !hasShownInitially) {
      const timer = setTimeout(() => {
        setHasShownInitially(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [shouldShow, hasShownInitially]);

  return (
    <AnimatePresence>
      {shouldShow && hasShownInitially && (
        <motion.div
          key="whatsapp-fab"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
        >
          <Tooltip title={t('floatingWhatsApp.tooltip')} placement="left" arrow>
            <Fab
              aria-label="WhatsApp"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                width: 64,
                height: 64,
                background: 'linear-gradient(135deg, #7D3FB9 0%, #5D5FE9 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5D5FE9 0%, #7D3FB9 100%)',
                  transform: 'scale(1.08)',
                },
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 24px rgba(125, 63, 185, 0.45)',
              }}
            >
              <WhatsAppIcon sx={{ fontSize: 32, color: 'white' }} />
            </Fab>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingWhatsApp;
