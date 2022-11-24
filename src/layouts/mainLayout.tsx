import React, { useEffect } from 'react';
import Header from 'components/Header';
import { Outlet } from 'react-router-dom';
import Footer from 'components/Footer';
import { useUser } from 'store';
import { getInfoUser } from 'apis/users';
import { ELocalStorageKey } from 'constant/types';

const MainLayout = () => {
  const { isAuthenticated, setUser } = useUser();

  useEffect(() => {
    (async () => {
      if (isAuthenticated) return;

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
  }, []);

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
