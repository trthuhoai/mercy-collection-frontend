import React, { useEffect } from 'react';
import Header from 'components/Header';
import { matchPath, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from 'components/Footer';
import { useUser } from 'store';
import { getInfoUser } from 'apis/users';
import { ELocalStorageKey } from 'constant/types';
import { routes } from 'constant/routes';

const MainLayout = () => {
  const { isAuthenticated, setUser } = useUser();
  const routesPrivate = [routes.ME.INFO, routes.ME.PROJECT];
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (isAuthenticated) return;

      if (
        routesPrivate.some(route => !!matchPath(route, pathname)) &&
        !localStorage.getItem(ELocalStorageKey.ACCESS_TOKEN)
      ) {
        return navigate(routes.HOME);
      }

      if (localStorage.getItem(ELocalStorageKey.ACCESS_TOKEN)) {
        try {
          const data = await getInfoUser();
          setUser(data);
        } catch (error) {
          localStorage.clear();
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1 bg-gray-100">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
