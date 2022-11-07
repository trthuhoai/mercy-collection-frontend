import { routes } from 'contants/routes';
import MainLayout from 'layouts/mainLayout';
import Home from 'pages/Index';
import Login from 'pages/User';
import { createBrowserRouter } from 'react-router-dom';

const routerConfig = [
  {
    element: <MainLayout />,
    children: [
      {
        path: routes.HOME,
        element: <Home />,
      },
      {
        path: routes.LOGIN.INDEX,
        element: <Login />,
        children: [
          {
            path: routes.LOGIN.GOOGLE,
            element: <Home />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routerConfig);

export default router;
