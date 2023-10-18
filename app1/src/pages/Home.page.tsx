import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const jwtToken = Cookies.get('jwtToken');
  const navigate=useNavigate()
  const handleDashboard = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/redirectdashboard`, { token: jwtToken });
      window.location.href = response.request.responseURL;
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) {
        Cookies.remove('jwtToken');
        navigate('/login')
      }
    }
  };
  return (
    <>
      <div>HomePage</div>
      <button onClick={handleDashboard}>Go to dashborad</button>
    </>
  )
}

export default HomePage