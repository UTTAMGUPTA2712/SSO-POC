import Cookies from 'js-cookie';
import LoginPage from './pages/Login.page';
import { useEffect, useState } from 'react';
import DashBoard from './pages/DashBoard.page';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [jwtToken, setjwtToken] = useState(Cookies.get('jwtToken'));
  
  useEffect(() => {
    setjwtToken(Cookies.get('jwtToken'));
  }, [])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={jwtToken ? <Navigate to={'/dashboard'} replace /> : <Navigate to={'/login'} replace />} />
        <Route path='/login' element={jwtToken ? <Navigate to={'/'} replace /> : <LoginPage />} />
        <Route path='/dashboard' element={jwtToken ? <DashBoard /> : <Navigate to={'/'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
