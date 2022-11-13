import React, { useEffect } from 'react';
import Button from 'components/Button';
import Typo from 'components/Typo';
import { gapi } from 'gapi-script';
import GoogleLogin from 'react-google-login';
import { NavLink } from 'react-router-dom';
import { useUser } from 'store';

const Header = () => {
  const classNameNavLink = 'hover:text-gray-500 pb-2';
  const activeStyle = 'border-b-2 border-white hover:border-gray-500';
  const { user, setUser } = useUser();

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        clientId:
          '297601202079-6h8hefjps9ipp7s0de5ffmophdlkfcpa.apps.googleusercontent.com',
      });
    });
  }, []);

  const responseGoogle = response => {
    if (response.profileObj) {
      localStorage.setItem('access_token', response.accessToken);
      const { name, imageUrl } = response.profileObj;
      setUser({
        name,
        avatar: imageUrl,
      });
    }
  };

  return (
    <header className="z-10 sticky top-0 h-20 bg-green-900 text-white">
      <div className="container h-full flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10">
            <img src="/logo192.png" alt="logo" className="w-full h-full" />
          </div>
          <Typo size="large" className="ml-4 text-white">
            Mercy Collection
          </Typo>
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
            to="/volunteer"
            className={({ isActive }) =>
              `${classNameNavLink} ${isActive && activeStyle}`
            }
          >
            Tình nguyện
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
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${classNameNavLink} ${isActive && activeStyle}`
            }
          >
            Về chúng tôi
          </NavLink>
        </div>
        {user ? (
          <div className="flex items-center">
            <Typo className="mr-4 text-white" size="large">
              {user.name}
            </Typo>
            <div className="w-10 h-10">
              <img src={user.avatar} alt="avatar" className="rounded-full" />
            </div>
          </div>
        ) : (
          <div>
            <Button className="mr-4" color="secondary" variant="transparent">
              Đăng kí
            </Button>
            <GoogleLogin
              clientId="297601202079-6h8hefjps9ipp7s0de5ffmophdlkfcpa.apps.googleusercontent.com"
              render={renderProps => (
                <Button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  color="secondary"
                >
                  Đăng nhập
                </Button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            {/* ,<Button color="secondary">Đăng nhập</Button> */}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
