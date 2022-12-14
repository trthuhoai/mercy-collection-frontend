import React from 'react';
import clsx from 'clsx';
import Typo from 'components/Typo';
import { routes } from 'constant/routes';
import { NavLink, Outlet } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import FolderIcon from '@mui/icons-material/Folder';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useUser } from 'store';
import Divider from '@mui/material/Divider';
import { Avatar } from '@mui/material';

const UserLayout = () => {
  const activeClassName = 'bg-primary-500 !text-white';

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="lg:flex w-full">
      <aside className="hidden lg:block md:w-2/6 lg:w-1/5 bg-white border-r border-gray-300">
        <nav className="lg:sticky lg:top-16 mt-10 mx-6">
          <ul>
            <li className="mb-4">
              <NavLink to={routes.ME.INFO}>
                {({ isActive }) => (
                  <Typo
                    isBold
                    className={clsx(
                      'flex items-center gap-2 py-3 px-4 rounded-md hover:bg-primary-600 hover:text-white transition-all',
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
                      'flex items-center gap-2 py-3 px-4 rounded-md hover:bg-primary-600 hover:text-white transition-all',
                      isActive && activeClassName,
                    )}
                  >
                    <FolderIcon />
                    Dự án của tôi
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
                      'flex items-center gap-2 py-3 px-4 rounded-md hover:bg-primary-600 hover:text-white transition-all',
                      isActive && activeClassName,
                    )}
                  >
                    <AppRegistrationIcon />
                    Dự án đã đăng ký
                  </Typo>
                )}
              </NavLink>
            </li>
            {/* <li>
              <NavLink to={routes.ME.CAMPAIGN}>
                {({ isActive }) => (
                  <Typo
                    isBold
                    className={clsx(
                      'flex items-center gap-2 py-3 px-4 rounded-md hover:bg-primary-600 hover:text-white transition-all',
                      isActive && activeClassName,
                    )}
                  >
                    <FolderIcon />
                    Dự án
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
                      'flex items-center gap-2 py-3 px-4 rounded-md hover:bg-primary-600 hover:text-white transition-all',
                      isActive && activeClassName,
                    )}
                  >
                    <FolderIcon />
                    Tạo dự án
                  </Typo>
                )}
              </NavLink>
            </li> */}
          </ul>
        </nav>
      </aside>
      <div className="lg:hidden">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          anchorOrigin={{
            vertical: 46,
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                left: 18,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
        >
          <MenuItem onClick={handleClose}>
            <NavLink to={routes.ME.INFO}>Thông tin cá nhân</NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <NavLink to={routes.ME.PROJECT}>Dự án của tôi</NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <NavLink to={routes.ME.PROJECT_REGISTER}>Dự án đã đăng ký</NavLink>
          </MenuItem>
          {/* <MenuItem onClick={handleClose}>
            <NavLink to={routes.ME.CAMPAIGN}>Dự án</NavLink>
          </MenuItem> */}
        </Menu>
      </div>
      <div className="w-full lg:w-4/5">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
