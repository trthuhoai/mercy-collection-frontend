import { RouterProvider } from 'react-router-dom';
import router from 'routes';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './mui';
import { Toast } from 'components/Toast';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />;
      </ThemeProvider>
      <Toast />
    </>
  );
}

export default App;
