import Button from 'components/Button';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const classNameNavLink = 'hover:text-gray-500 pb-2';
  const activeStyle = 'border-b-2 border-white hover:border-gray-500';
  return (
    <div className="sticky top-0 h-20 bg-green-900 text-white">
      <div className="container mx-auto h-full flex items-center justify-between">
        <div className="w-10 h-10 rounded">
          <img src="/logo192.png" alt="logo" />
        </div>
        <div className="flex gap-16">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${classNameNavLink} ${isActive && activeStyle}`
            }
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/project"
            className={({ isActive }) =>
              `${classNameNavLink} ${isActive && activeStyle}`
            }
          >
            Dự án
          </NavLink>
          <NavLink
            to="/faq"
            className={({ isActive }) =>
              `${classNameNavLink} ${isActive && activeStyle}`
            }
          >
            Faqs
          </NavLink>
          <NavLink
            to="/donate"
            className={({ isActive }) =>
              `${classNameNavLink} ${isActive && activeStyle}`
            }
          >
            Ủng hộ
          </NavLink>
        </div>
        <div>
          <Button className="mr-4" color="secondary" variant="transparent">
            Đăng kí
          </Button>
          <Button color="secondary">Đăng nhập</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
