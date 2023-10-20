import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import QueryString from 'qs';
import DashBoard from './pages/DashBoard.page';
import axios, { AxiosError } from 'axios';

function App() {
  const jwtToken = Cookies.get('jwtToken');
  const queryParams = QueryString.parse(window.location.search, { ignoreQueryPrefix: true });
  const token = queryParams.token as string;

  const verifyToken = async () => {
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/verify`, { token: jwtToken });
      console.log('data: ', data);
    } catch (error) {
      console.log((error as AxiosError).response);
      window.location.href = `${process.env.REACT_APP_LOGIN_APP_URL}/?redirectUrl=${process.env.REACT_APP_CURRENT_URL}/`
    }
  }
  
  useEffect(() => {
    if(jwtToken) {verifyToken()}
    else if(token) Cookies.set('jwtToken',token);
    else window.location.href = `${process.env.REACT_APP_LOGIN_APP_URL}/?redirectUrl=${process.env.REACT_APP_CURRENT_URL}/`;
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={`/dashboard?token=${jwtToken}`} replace/>}/>
        <Route path='/dashboard' element={ <DashBoard /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
