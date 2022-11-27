import { routes } from 'constant/routes';
import MainLayout from 'layouts/mainLayout';
import UserLayout from 'layouts/userLayout';
import About from 'pages/About';
import CampaignPage from 'pages/Campaign';
import CampaignDetail from 'pages/Campaign/Detail';
import Donate from 'pages/Donate';
import Faqs from 'pages/Faq';
import Home from 'pages/Home';
import ProjectPage from 'pages/Project';
import ProjectDetail from 'pages/Project/Detail';
import { CampaignUser, InfoUser, ProjectUser } from 'pages/User';
import ProjectRegister from 'pages/User/ProjectRegister';
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
        path: routes.PROJECTS,
        element: <ProjectPage />,
      },
      {
        path: routes.CAMPAIGNS,
        element: <CampaignPage />,
      },
      {
        path: routes.PROJECTS_DETAIL,
        element: <ProjectDetail />,
      },
      {
        path: routes.CAMPAIGNS_DETAIL,
        element: <CampaignDetail />,
      },
      {
        element: <UserLayout />,
        children: [
          {
            path: routes.ME.INFO,
            element: <InfoUser />,
          },
          {
            path: routes.ME.PROJECT,
            element: <ProjectUser />,
          },
          {
            path: routes.ME.PROJECT_REGISTER,
            element: <ProjectRegister />,
          },
          {
            path: routes.ME.CAMPAIGN,
            element: <CampaignUser />,
          },
        ],
      },
      {
        path: routes.FAQS,
        element: <Faqs />,
      },
      {
        path: routes.DONATE,
        element: <Donate />,
      },
      {
        path: routes.ABOUT,
        element: <About />,
      },
    ],
  },
];

const router = createBrowserRouter(routerConfig);

export default router;
