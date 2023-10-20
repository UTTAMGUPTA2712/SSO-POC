import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie';

type LoginPageTypes={
  redirectUrl:string
}

const LoginPage = (props:LoginPageTypes) => {
  const {redirectUrl}=props
  const handleLogin = async () => {
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { data: 'uttam' })
      Cookies.set('jwtToken',data.token,{expires:data.expiresIn})
      window.location.href=`${redirectUrl}?token=${data.token}`
    } catch (error) {
      alert('Something went wrong');
      console.log((error as AxiosError).response);
    }
  }

  return (
    <button onClick={()=>handleLogin()}>Login</button>
  )
}

export default LoginPage