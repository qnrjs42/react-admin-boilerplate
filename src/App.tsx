import { Navigate, Route, Routes } from 'react-router-dom';

import LoginPage from '@pages/login';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  );
}

export default App;
