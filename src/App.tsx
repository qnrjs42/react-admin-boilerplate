import { Navigate, Route, Routes } from 'react-router-dom';

import { AdminDashboardPage } from '@pages/admin';
import LoginPage from '@pages/login';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/admin/dashboard' element={<AdminDashboardPage />} />
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  );
}

export default App;
