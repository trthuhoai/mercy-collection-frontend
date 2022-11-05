import { routes } from 'contants/routes';
import MainLayout from 'layouts/mainLayout';
import Home from 'pages/home';
import { createBrowserRouter } from 'react-router-dom';

const routerConfig = [
  {
    element: <MainLayout />,
    children: [
      {
        path: routes.home,
        element: <Home />,
      },
    ],
  },
];

const router = createBrowserRouter(routerConfig);

export default router;
