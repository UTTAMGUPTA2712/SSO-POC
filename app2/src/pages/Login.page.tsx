import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate=useNavigate()

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_URL}/login`, { data: 'uttam' })
      Cookies.set('jwtToken', data.token, { expires: data.expiresIn })
      navigate('/dashboard')
    } catch (error) {
      console.log((error as AxiosError).response);
    }
  }
  return (
    <button onClick={handleLogin}>Login</button>
  )
}

export default LoginPage