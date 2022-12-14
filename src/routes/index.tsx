import { routes } from 'constant/routes';
import MainLayout from 'layouts/mainLayout';
import UserLayout from 'layouts/userLayout';
import AdminLayout from 'layouts/adminLayout';
import About from 'pages/About';
import CampaignPage from 'pages/Campaign';
import CampaignDetail from 'pages/Campaign/Detail';
import Donate from 'pages/Donate';
import Faqs from 'pages/Faq';
import Home from 'pages/Home';
import ProjectPage from 'pages/Project';
import ProjectDetail from 'pages/Project/Detail';
import MyProjectDetail from 'pages/User/Project/Detail';
import UpdateProject from 'pages/User/Project/Update';
import { CampaignUser, InfoUser, ProjectUser } from 'pages/User';
import ManagerProject from 'pages/Admin/ManagerProject';
import ManagerMember from 'pages/Admin/ManagerMember'
import PendingProjectDetail from 'pages/Admin/ManagerProject/Detail'
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
        path: routes.DONATE,
        element: <Donate />,
      },
      {
        element: <UserLayout />,
        children: [
          {
            path: routes.ME.INFO,
            element: <InfoUser />,
          },
          {
            path: routes.ME.DETAIL_PROJECT,
            element: <MyProjectDetail />,
          },
          {
            path: routes.ME.UPDATE_PROJECT,
            element: <UpdateProject />,
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
        element: <AdminLayout />,
        children: [
          {
            path: routes.ADMIN.INFO,
            element: <InfoUser />,
          },
          {
            path: routes.ADMIN.DETAIL_PROJECT,
            element: <PendingProjectDetail />,
          },
          {
            path: routes.ADMIN.DETAIL_PENDING,
            element: <PendingProjectDetail />,
          },
          {
            path: routes.ADMIN.UPDATE_PROJECT,
            element: <UpdateProject />,
          },
          {
            path: routes.ADMIN.PROJECT,
            element: <ProjectUser />,
          },
          {
            path: routes.ADMIN.PROJECT_REGISTER,
            element: <ProjectRegister />,
          },
          {
            path: routes.ADMIN.MANAGER_PROJECT,
            element: <ManagerProject />,
          },
          {
            path: routes.ADMIN.MANAGER_MEMBER,
            element: <ManagerMember />,
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
