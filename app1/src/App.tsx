import HomePage from './pages/Home.page';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import QueryString from 'qs';
import { useAppDispatch, useAppSelector } from './hooks';
import { setSession } from './store';
import Cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';

function App() {
  // const jwtToken=useAppSelector(state=>state.session.session)
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
          <Route path='/' element={<Navigate to={`/home?token=${jwtToken}`} replace/>}/>
          <Route path='/home' element={ <HomePage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
