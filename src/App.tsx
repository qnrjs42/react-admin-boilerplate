import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { AdminBannerListPage, AdminDashboardPage } from '@pages/admin';
import LoginPage from '@pages/login';

import AdminWidget from '@widgets/admin';

import useAxiosAuth from '@features/auth/hooks/useAxiosAuth';

import type { IMe } from '@entities/auth';

function App() {
  const {
    me,
    isLoadedCertify,
  }: {
    me: IMe | null;
    isLoadedCertify: boolean;
  } = useAxiosAuth();

  return (
    <Routes>
      <Route
        element={
          <UnauthorizedRoutes isMe={!!me?.authorization} isLoadedCertify={isLoadedCertify} />
        }
      >
        <Route path='/login' element={<LoginPage />} />
      </Route>
      <Route
        element={<PrivateRoutes isMe={!!me?.authorization} isLoadedCertify={isLoadedCertify} />}
      >
        <Route element={<AdminWidget />}>
          <Route path='/admin/dashboard' element={<AdminDashboardPage />} />
          <Route path='/admin/banner/all-list/:page' element={<AdminBannerListPage />} />

          <Route
            path='*'
            element={
              <Navigate
                to={me?.routes ? me.routes?.[0]?.[0]?.path : '/admin/banner/dashboard'}
                replace
              />
            }
          />
        </Route>
      </Route>
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  );
}

export default App;

interface IAuthProps {
  isMe: boolean;
  isLoadedCertify: boolean;
}
function PrivateRoutes({ isMe, isLoadedCertify }: IAuthProps) {
  if (!isLoadedCertify) return null;

  return isMe ? <Outlet /> : <Navigate to='/login' />;
}

function UnauthorizedRoutes({ isMe, isLoadedCertify }: IAuthProps) {
  if (!isLoadedCertify) return null;

  return isMe ? <Navigate to='/' /> : <Outlet />;
}
