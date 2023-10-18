import Cookies from 'js-cookie';
import HomePage from './pages/Home.page';
import LoginPage from './pages/Login.page';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [jwtToken, setjwtToken] = useState(Cookies.get('jwtToken'))
  
  useEffect(() => {
    setjwtToken(Cookies.get('jwtToken'));
  }, [])

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={jwtToken ? <Navigate to={'/home'} replace/>:<Navigate to={'/login'} replace/>}/>
          <Route path='/login' element={jwtToken ? <Navigate to={'/'} replace/>:<LoginPage/>}/>
          <Route path='/home' element={jwtToken ? <HomePage/>:<Navigate to={'/'} replace/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
