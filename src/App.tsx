import { Navigate, Route, Routes } from 'react-router-dom';

import { AdminBannerListPage, AdminDashboardPage } from '@pages/admin';
import LoginPage from '@pages/login';

import AdminWidget from '@widgets/admin';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route element={<AdminWidget />}>
        <Route path='/admin/dashboard' element={<AdminDashboardPage />} />
        <Route path='/admin/banner/all-list/:page' element={<AdminBannerListPage />} />
        <Route path='/admin/banner/demo-list/:page' element={<AdminBannerListPage />} />
      </Route>
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  );
}

export default App;
