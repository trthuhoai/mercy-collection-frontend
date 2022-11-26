import { createTheme } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#4ade80',
      main: '#15803d',
    },
    secondary: {
      light: '#ff7961',
      main: '#fff',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
