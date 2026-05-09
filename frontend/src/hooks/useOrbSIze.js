import { useTheme, useMediaQuery } from '@mui/material';

export const useOrbSize = () => {
  const theme = useTheme();

  const isXS = useMediaQuery(theme.breakpoints.only('xs'));
  const isSM = useMediaQuery(theme.breakpoints.only('sm'));
  const isMDUp = useMediaQuery(theme.breakpoints.up('md'));

  if (isXS) return 450;
  if (isSM) return 700;
  if (isMDUp) return 1000;

  return 1000;
};
