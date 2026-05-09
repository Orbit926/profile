// LanguageSwitcher.jsx
import { Box, ToggleButtonGroup, ToggleButton, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { Language } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useState } from 'react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  // Normalizar el idioma: si es es-MX, es-ES, etc → 'es'
  const currentLanguage = i18n.language.split('-')[0];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);

  const handleLanguageChange = (newLanguage) => {
    i18n.changeLanguage(newLanguage);
  };

  // 🔹 Mobile → un solo botón circular toggle (más discreto)
  if (isMobile) {
    return (
      <Button
        onClick={() => handleLanguageChange(currentLanguage === 'es' ? 'en' : 'es')}
        sx={{
          minWidth: 32,
          width: 32,
          height: 32,
          borderRadius: '50%',
          textTransform: 'uppercase',
          fontWeight: 600,
          fontSize: '0.65rem',
          background: 'rgba(255, 255, 255, 0.08)', // 🔹 Muy sutil
          color: 'rgba(255,255,255,0.75)',         // 🔹 Texto más suave
          boxShadow: '0 0 8px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          p: 0,
          transition: 'all 0.25s ease',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.14)', // 🔹 Solo un poco más claro
          },
        }}
      >
        {currentLanguage.toUpperCase()}
      </Button>
    );
  }

  // 🔹 Desktop → lo mismo que tenías con hover + animación + transición suave
  const shouldShowButtons = open;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Ícono base */}
      <Language
        sx={{
          fontSize: 22,
          color: 'text.secondary',
          cursor: 'pointer',
          display: { xs: 'none', sm: 'block' },
          transition: 'color 0.25s ease',
          '&:hover': { color: 'primary.light' },
        }}
      />

      {/* Contenedor que anima el ancho */}
      <Box
        sx={{
          overflow: 'hidden',
          ml: 1,
          display: 'flex',
          alignItems: 'center',
          width: shouldShowButtons ? 90 : 0,
          transition: 'width 0.25s ease',
        }}
      >
        <motion.div
          animate={{
            opacity: shouldShowButtons ? 1 : 0,
            x: shouldShowButtons ? 0 : -6,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{ display: 'flex', alignItems: 'center', width: '100%' }}
        >
          <ToggleButtonGroup
            value={currentLanguage}
            exclusive
            onChange={(e, lang) => lang && handleLanguageChange(lang)}
            aria-label="Selector de idioma"
            size="small"
            sx={{
              background: 'rgba(125, 63, 185, 0.08)',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.12)',
              p: 0,
              overflow: 'hidden',

              '& .MuiToggleButtonGroup-grouped': {
                border: 0,
                borderRadius: 999,
                px: { xs: 0.9, sm: 1.05 },
                py: 0.35,
                minWidth: 'unset',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: 'text.secondary',
                transition: 'all 0.25s ease',

                '&:hover': {
                  background: 'rgba(125,63,185,0.15)',
                  color: 'primary.light',
                },

                '&.Mui-selected': {
                  background:
                    'linear-gradient(135deg, #7d3fb9 0%, #5d5fe9 100%)',
                  color: '#fff',
                  fontWeight: 700,
                },
              },
            }}
          >
            <ToggleButton value="es">ES</ToggleButton>
            <ToggleButton value="en">EN</ToggleButton>
          </ToggleButtonGroup>
        </motion.div>
      </Box>
    </Box>
  );
};

export default LanguageSwitcher;
