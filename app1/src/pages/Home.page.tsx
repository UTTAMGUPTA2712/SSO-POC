import Cookies from 'js-cookie';
import RedirectComponent from '../Component/Redirect/Redirect.component';

const HomePage = () => {
  return (
    <>
      <div>HomePage</div>
      <RedirectComponent redirectUrl={`${process.env.REACT_APP_DASHBOARD_APP_URL}`}>Go to dashborad</RedirectComponent>
    </>
  )
}

export default HomePage