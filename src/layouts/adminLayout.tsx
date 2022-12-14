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
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import InsightsIcon from '@mui/icons-material/Insights';
import { useUser } from 'store';
import Divider from '@mui/material/Divider';
import { Avatar } from '@mui/material';

const AdminLayout = () => {
  const activeClassName = 'bg-primary-700 !text-white';

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="md:flex w-full">
      <aside className="hidden md:block md:w-2/6 lg:w-1/5 bg-white border-r border-gray-300">
        <nav className="lg:sticky lg:top-16 mt-10 mx-6">
          <div className="mb-4 text-center text-3xl font-serif subpixel-antialiased font-semibold text-emerald-700 list-disc">
            ADMIN
          </div>
          <ul>
            <li className="mb-4">
              <NavLink to={routes.ADMIN.INFO}>
                {({ isActive }) => (
                  <Typo
                    isBold
                    className={clsx(
                      'flex items-center gap-2 py-3 px-4 rounded-md hover:bg-primary-600 hover:text-white transition-all',
                      isActive && activeClassName,
                    )}
                  >
                    <PersonIcon />
                    Th??ng tin c?? nh??n
                  </Typo>
                )}
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink to={routes.ADMIN.PROJECT}>
                {({ isActive }) => (
                  <Typo
                    isBold
                    className={clsx(
                      'flex items-center gap-2 py-3 px-4 rounded-md hover:bg-primary-600 hover:text-white transition-all',
                      isActive && activeClassName,
                    )}
                  >
                    <FolderIcon />
                    D??? ??n c???a t??i
                  </Typo>
                )}
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink to={routes.ADMIN.PROJECT_REGISTER}>
                {({ isActive }) => (
                  <Typo
                    isBold
                    className={clsx(
                      'flex items-center gap-2 py-3 px-4 rounded-md hover:bg-primary-600 hover:text-white transition-all',
                      isActive && activeClassName,
                    )}
                  >
                    <AppRegistrationIcon />
                    D??? ??n ???? ????ng k??
                  </Typo>
                )}
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink to={routes.ADMIN.MANAGER_MEMBER}>
                {({ isActive }) => (
                  <Typo
                    isBold
                    className={clsx(
                      'flex items-center gap-2 py-3 px-4 rounded-md hover:bg-primary-600 hover:text-white transition-all',
                      isActive && activeClassName,
                    )}
                  >
                    <PeopleAltIcon />
                    Qu???n l?? th??nh vi??n
                  </Typo>
                )}
              </NavLink>
            </li>

            <li className="mb-4">
              <NavLink to={routes.ADMIN.MANAGER_PROJECT}>
                {({ isActive }) => (
                  <Typo
                    isBold
                    className={clsx(
                      'flex items-center gap-2 py-3 px-4 rounded-md hover:bg-primary-600 hover:text-white transition-all',
                      isActive && activeClassName,
                    )}
                  >
                    <FolderCopyIcon />
                    Qu???n l?? d??? ??n
                  </Typo>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to={routes.ADMIN.MANAGER_STATISTIC}>
                {({ isActive }) => (
                  <Typo
                    isBold
                    className={clsx(
                      'flex items-center gap-2 py-3 px-4 rounded-md hover:bg-primary-600 hover:text-white transition-all',
                      isActive && activeClassName,
                    )}
                  >
                    <InsightsIcon />
                    Th???ng k??
                  </Typo>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="md:hidden">
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
            <NavLink to={routes.ADMIN.INFO}>Th??ng tin c?? nh??n</NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <NavLink to={routes.ADMIN.PROJECT}>D??? ??n c???a t??i</NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <NavLink to={routes.ADMIN.PROJECT_REGISTER}>
              D??? ??n ???? ????ng k??
            </NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <NavLink to={routes.ADMIN.MANAGER_MEMBER}>
              Qu???n l?? th??nh vi??n
            </NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <NavLink to={routes.ADMIN.MANAGER_PROJECT}>Qu???n l?? d??? ??n</NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <NavLink to={routes.ADMIN.MANAGER_STATISTIC}>Th???ng k??</NavLink>
          </MenuItem>
        </Menu>
      </div>
      <div className="w-full md:w-4/6 lg:w-4/5">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
