import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { useUser } from 'store';
import Divider from '@mui/material/Divider';
import { Avatar } from '@mui/material';
import { routes } from 'constant/routes';

interface IProps {
  onLogin: () => void;
  onLogout: () => void;
}
const NavMobile = ({ onLogin, onLogout }: IProps) => {
  const { isAuthenticated, user } = useUser();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="ml-auto lg:hidden">
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        {/* <MenuIcon fontSize="large" /> */}
        {user ? (
          <Avatar src={user.picture || '/avartar.png'} />
        ) : (
          <MenuIcon fontSize="large" />
        )}
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
              right: 23,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        {user && (
          <>
            <MenuItem onClick={handleClose}>
              <NavLink to={routes.ME.INFO} className="flex items-center gap-1">
                <Avatar src={user.picture || '/avartar.png'} />
                {user?.name}
              </NavLink>
            </MenuItem>
            <Divider />
          </>
        )}
        <MenuItem onClick={handleClose}>
          <NavLink to="/">Trang chủ</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/campaigns">Dự án</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/projects">Tình nguyện</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/faqs">Faqs</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/donate">Ủng hộ</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/about">Về chúng tôi</NavLink>
        </MenuItem>
        <Divider />
        {isAuthenticated ? (
          <MenuItem
            onClick={() => {
              handleClose();
              onLogout();
            }}
          >
            Đăng xuất
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              handleClose();
              onLogin();
            }}
          >
            Đăng nhập
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default NavMobile;
