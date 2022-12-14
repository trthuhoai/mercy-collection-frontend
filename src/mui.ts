import { createTheme } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#4ade80',
      main: '#15803d',
      contrastText: '#fff',
    },
    secondary: {
      light: '#bae6fd',
      main: '#106a1f',
      contrastText: '#fff',
    },
    action: {
      
      disabled: "#333",
    }
  },
});
