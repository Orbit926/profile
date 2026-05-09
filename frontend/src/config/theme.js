// theme.js
import { createTheme } from '@mui/material/styles';

const magentaDeep = '#5a1e63';   // más oscuro que el magenta del fondo
const indigoDeep  = '#3b2e7a';   // más oscuro que el índigo del fondo
const bgDeep      = '#0b1020';   // base casi azul petróleo
const bgPaper     = '#0c1024';   // fondo de tarjetas / inputs
const textHigh    = '#e6e8ee';
const textLow     = '#9aa3b2';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary:   { main: '#7d3fb9', light: '#a46be3' }, // acento violeta
    secondary: { main: '#5d5fe9', light: '#8a8cff' }, // acento índigo
    background: {
      default: bgDeep,
      paper:   bgPaper,
    },
    text: {
      primary: textHigh,
      secondary: textLow,
    },
    divider: 'rgba(230,232,238,0.08)',
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily:
      'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    h1: { fontWeight: 800, letterSpacing: -0.5 },
    h2: { fontWeight: 700, letterSpacing: -0.25 },
    h3: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiContainer: { 
      defaultProps: { maxWidth: 'lg' }, 
    },
    MuiAlert: {
      styleOverrides: {
        filledSuccess: { color: '#fff' },
        filledError:   { color: '#fff' },
        filledWarning: { color: '#fff' },
        filledInfo:    { color: '#fff' },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        // Fix autofill para Safari / Chrome (iOS y desktop)
        'input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill': {
          WebkitBoxShadow: `0 0 0 1000px ${bgPaper} inset`,
          boxShadow:       `0 0 0 1000px ${bgPaper} inset`,
          WebkitTextFillColor: textHigh,
          caretColor: textHigh,
          borderRadius: 'inherit',
          transition: 'background-color 9999s ease-in-out 0s',
        },
        'input:-webkit-autofill:focus, textarea:-webkit-autofill:focus, select:-webkit-autofill:focus': {
          WebkitBoxShadow: `0 0 0 1000px ${bgPaper} inset`,
          boxShadow:       `0 0 0 1000px ${bgPaper} inset`,
        },
      },
    },
  },
  // Tokens custom para usar en sx
  custom: {
    heroGradient: `linear-gradient(135deg, ${magentaDeep} 0%, ${indigoDeep} 100%)`,
    cardGradient: `linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))`,
  },
});
