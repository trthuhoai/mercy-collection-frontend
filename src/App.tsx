import { RouterProvider } from 'react-router-dom';
import router from 'routes';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './mui';
import { Toast } from 'components/Toast';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </LocalizationProvider>
      <Toast />
    </>
  );
}

export default App;
