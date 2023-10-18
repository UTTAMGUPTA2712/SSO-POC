import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

type RedirectComponentProps = {
    redirectUrl: string;
    children: React.ReactNode;
}

const RedirectComponent = (props:RedirectComponentProps) => {
    const { redirectUrl, children } = props;
  const jwtToken = Cookies.get('jwtToken');

  const handleRedirect = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/redirect`, { token: jwtToken, redirectUrl: redirectUrl });
      window.location.href = response.request.responseURL;
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) {
        Cookies.remove('jwtToken');
      }
    }
  };
  return (
    <>
      <span onClick={handleRedirect}>{children}</span>
    </>
  );
};

export default RedirectComponent;