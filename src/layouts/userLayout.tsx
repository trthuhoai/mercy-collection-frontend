import React from 'react';
import clsx from 'clsx';
import Typo from 'components/Typo';
import { routes } from 'constant/routes';
import { NavLink, Outlet } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import FolderIcon from '@mui/icons-material/Folder';

const UserLayout = () => {
  const activeClassName = 'bg-primary-500 !text-white';

  return (
    <div className="flex flex-1">
      <aside className="w-[260px] bg-white border-r border-gray-300">
        <nav className="mt-10 mx-6">
          <ul>
            <li className="mb-4">
              <NavLink to={routes.ME.INFO}>
                {({ isActive }) => (
                  <Typo
                    isBold
                    className={clsx(
                      'flex items-center gap-2 py-3 px-4 rounded-md hover:bg-primary-500 hover:text-white transition-all',
                      isActive && activeClassName,
                    )}
                  >
                    <PersonIcon />
                    Thông tin cá nhân
                  </Typo>
                )}
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink to={routes.ME.PROJECT}>
                {({ isActive }) => (
                  <Typo
                    isBold
                    className={clsx(
                      'flex items-center gap-2 py-3 px-4 rounded-md hover:bg-primary-500 hover:text-white transition-all',
                      isActive && activeClassName,
                    )}
                  >
                    <FolderIcon />
                    Tình nguyện
                  </Typo>
                )}
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink to={routes.ME.PROJECT_REGISTER}>
                {({ isActive }) => (
                  <Typo
                    isBold
                    className={clsx(
                      'flex items-center gap-2 py-3 px-4 rounded-md hover:bg-primary-500 hover:text-white transition-all',
                      isActive && activeClassName,
                    )}
                  >
                    <FolderIcon />
                    Đăng kí tình nguyện
                  </Typo>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to={routes.ME.CAMPAIGN}>
                {({ isActive }) => (
                  <Typo
                    isBold
                    className={clsx(
                      'flex items-center gap-2 py-3 px-4 rounded-md hover:bg-primary-500 hover:text-white transition-all',
                      isActive && activeClassName,
                    )}
                  >
                    <FolderIcon />
                    Dự án
                  </Typo>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
