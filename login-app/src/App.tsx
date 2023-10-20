import Cookies from "js-cookie";
import LoginPage from './pages/Login.page';
import { useEffect,useState } from 'react';
import QueryString from 'qs';
import axios, { AxiosError } from "axios";

function App() {
  const [redirectUrl,setRedirectUrl]=useState('/')
  const jwtToken=Cookies.get('jwtToken')
  const verifyToken = async (path:string) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/verify`, { token: jwtToken });
      window.location.href=path
    } catch (error) {
      Cookies.remove('jwtToken');
      console.log((error as AxiosError).response);
    }
  }

  useEffect(() => {
    const queryParams = QueryString.parse(window.location.search, { ignoreQueryPrefix: true });
    const redirectPath = queryParams.redirectUrl as string;
    if (jwtToken) {
      verifyToken(`${redirectPath??process.env.REACT_APP_DEFAULT_APP_URL}?token=${jwtToken}`)
      // window.location.href=`${redirectPath??process.env.REACT_APP_DEFAULT_APP_URL}?token=${jwtToken}`;
    }else{
      setRedirectUrl(redirectPath??process.env.REACT_APP_DEFAULT_APP_URL)
    }
  }, [])
  
  return (
    <LoginPage redirectUrl={redirectUrl}/>
  );
}

export default App;
