import React, { useEffect } from 'react';
import Header from 'components/Header';
import { matchPath, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from 'components/Footer';
import { useUser } from 'store';
import { getInfoUser } from 'apis/users';
import { ELocalStorageKey } from 'constant/types';
import { routes } from 'constant/routes';
import { toast } from 'react-toastify';
import Modal from 'components/Modal';
import Button from '@mui/material/Button';
import Typo from 'components/Typo';

const MainLayout = () => {
  const { isAuthenticated, isLocked, setUser, setLocked } = useUser();

  const routesPrivate = [
    routes.ME.INFO,
    routes.ME.DETAIL_PROJECT,
    routes.ME.UPDATE_PROJECT,
    routes.ME.PROJECT,
    routes.ME.PROJECT_REGISTER,
    routes.ME.CAMPAIGN,
    routes.ADMIN.CAMPAIGN,
    routes.ADMIN.DETAIL_PENDING,
    routes.ADMIN.DETAIL_PROJECT,
    routes.ADMIN.INFO,
    routes.ADMIN.MANAGER_MEMBER,
    routes.ADMIN.MANAGER_PROJECT,
    routes.ADMIN.PROJECT,
    routes.ADMIN.PROJECT_REGISTER,
    routes.ADMIN.UPDATE_PROJECT,
    routes.ADMIN.MANAGER_STATISTIC,
  ];

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (isAuthenticated) return;

      if (
        routesPrivate.some(route => !!matchPath(route, pathname)) &&
        !localStorage.getItem(ELocalStorageKey.ACCESS_TOKEN)
      ) {
        toast.error('Bạn cần đăng nhập trước');
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
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex flex-1 bg-gray-100">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Modal
        isOpen={isLocked}
        title="Khóa tài khoản"
        onClose={() => setLocked(false)}
      >
        <div className="text-center">
          <Typo className="mb-10">
            Tài khoản của bạn đã bị khóa vì vi phạm quy định ban đầu của chúng tôi, vui lòng gửi thư đến địa chỉ email tr.thuhoai@gmail.com
            để được hổ trợ.
          </Typo>
          <Button
            size="large"
            variant="outlined"
            onClick={() => {
              setLocked(false);
            }}
          >
            Đóng
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default MainLayout;
