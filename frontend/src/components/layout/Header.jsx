// Header.jsx
import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Paper,
  IconButton,
  Divider,
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const sectionsIds = ['hero', 'about', 'projects', 'services'];

const headerDelay = 1.5;

const navbarVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: headerDelay,
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const Header = () => {
  const { t } = useTranslation('common');

  const [mobileOpen, setMobileOpen] = useState(false);

  const sections = [
    { id: 'hero', label: t('header.nav.home') },
    { id: 'about', label: t('header.nav.about') },
    { id: 'services', label: t('header.nav.services') },
  ];

  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sectionIds = [...sectionsIds, 'contact'];

    const handleScroll = () => {
      let currentSection = '';

      currentSection =
        sectionIds.find((id) => {
          const el = document.getElementById(id);
          if (!el) return false;
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }) || '';

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenMenu = () => {
    setMobileOpen(true);
  };

  const handleCloseMenu = () => {
    setMobileOpen(false);
  };

  const handleMenuClick = (id) => {
    scrollTo(id);
    setMobileOpen(false);
  };

  return (
    <>
      <AppBar
        component={motion.header}
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        position="fixed"
        elevation={0}
        sx={{
          background: 'transparent',
          mt: 2,
          px: { xs: 1, sm: 0 },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'center',
          }}
        >
          <Box
            component={Paper}
            elevation={0}
            sx={{
              position: 'relative',
              mx: 'auto',
              px: { xs: 1.6, sm: 3.5, md: 4 },
              py: { xs: 0.7, sm: 0.95, md: 1.1 },
              borderRadius: 999,
              minWidth: { xs: '100%', sm: 500, md: 540 },
              maxWidth: { xs: '100%', sm: 760, md: 900 },
              width: { xs: '100%', sm: 'auto' },
              background:
                'radial-gradient(circle at 0% 0%, rgba(125,63,185,0.35), transparent 55%), radial-gradient(circle at 100% 100%, rgba(93,95,233,0.3), transparent 55%), rgba(8, 10, 24, 0.72)',
              backdropFilter: 'blur(22px)',
              WebkitBackdropFilter: 'blur(22px)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow:
                '0 18px 45px rgba(0,0,0,0.65), 0 0 0 1px rgba(125,63,185,0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1.1, sm: 2.2, md: 2.8 },
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(120deg, rgba(255,255,255,0.18), transparent 30%, transparent 70%, rgba(255,255,255,0.12))',
                opacity: 0.22,
                mixBlendMode: 'soft-light',
                pointerEvents: 'none',
              },
            }}
          >
            {/* Logo (izquierda) */}
            <Box
              onClick={() => scrollTo('hero')}
              component="img"
              src="/img/logos/orbit-color.png"
              alt="Orbit"
              sx={{
                width: 80,
                height: 'auto',
                cursor: 'pointer',
                transition: 'opacity 0.25s ease',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            />

            {/* Navegación desktop/tablet (centro) */}
            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
                display: { xs: 'none', md: 'flex' },
                flexGrow: 1,
                gap: { sm: 1.2, md: 2 },
                justifyContent: 'center',
              }}
            >
              {sections.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <Button
                    key={sec.id}
                    color="inherit"
                    onClick={() => scrollTo(sec.id)}
                    sx={{
                      fontSize: '0.9rem',
                      px: { sm: 1.5, md: 2 },
                      textTransform: 'none',
                      position: 'relative',
                      fontWeight: isActive ? 700 : 400,
                      '&:hover::after': {
                        width: '100%',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -2,
                        left: 0,
                        height: 2,
                        width: isActive ? '100%' : 0,
                        background:
                          'linear-gradient(135deg, #7d3fb9 0%, #5d5fe9 100%)',
                        transition: 'width 0.25s ease',
                      },
                    }}
                  >
                    {sec.label}
                  </Button>
                );
              })}
            </Box>

            {/* CTA desktop/tablet (antes del grupo derecho) */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => scrollTo('contact')}
              sx={{
                position: 'relative',
                zIndex: 1,
                display: { xs: 'none', md: 'inline-flex' },
                fontSize: '0.9rem',
                textTransform: 'none',
                ml: { sm: 1 },
                borderRadius: 999,
                fontWeight: activeSection === 'contact' ? 700 : 500,
              }}
            >
              {t('header.cta')}
            </Button>

            {/* 🔹 Grupo derecho: idioma + menú (menu solo en mobile) */}
            <Box
              sx={{
                ml: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {/* Language Switcher: visible en todos los tamaños */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <LanguageSwitcher />
              </Box>

              {/* Botón menú móvil */}
              <IconButton
                color="inherit"
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  display: { xs: 'inline-flex', md: 'none' },
                }}
                onClick={handleOpenMenu}
                aria-label={t('header.menuAriaLabel')}
                title={t('header.menuAriaLabel')}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer móvil */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            width: 260,
            background:
              'radial-gradient(circle at 0% 0%, rgba(125,63,185,0.4), transparent 55%), radial-gradient(circle at 100% 100%, rgba(93,95,233,0.35), transparent 55%), rgba(8,10,24,0.98)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderLeft: '1px solid rgba(255,255,255,0.18)',
            boxShadow:
              '0 0 45px rgba(0,0,0,0.85), 0 0 0 1px rgba(125,63,185,0.45)',
          },
        }}
      >
        <Box
          sx={{
            pt: 3,
            pb: 2.5,
            px: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            height: '100%',
          }}
        >
          <Box
            onClick={() => {
              handleMenuClick('hero');
            }}
            sx={{
              mb: 2,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              component="img"
              src="/img/logos/orbit-color.png"
              alt="Orbit"
              sx={{
                width: 90,
                height: 'auto',
                cursor: 'pointer',
              }}
            />
          </Box>

          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <Button
                key={sec.id}
                onClick={() => handleMenuClick(sec.id)}
                sx={{
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 700 : 400,
                  color: 'rgba(255,255,255,0.9)',
                }}
              >
                {sec.label}
              </Button>
            );
          })}

          <Divider
            sx={{
              my: 1.5,
              borderColor: 'rgba(255,255,255,0.15)',
            }}
          />

          <Button
            variant="contained"
            onClick={() => handleMenuClick('contact')}
            sx={{
              mt: 0.5,
              borderRadius: 999,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            {t('header.cta')}
          </Button>

          <Box sx={{ flexGrow: 1 }} />
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
