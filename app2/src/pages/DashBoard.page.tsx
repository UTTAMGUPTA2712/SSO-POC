import Cookies from 'js-cookie';
import RedirectComponent from '../Component/Redirect/Redirect.component';

const DashBoard = () => {
  return (
    <>
      <div>DashBoard</div>
      <RedirectComponent redirectUrl={`${process.env.REACT_APP_HOME_APP_URL}`}>Go to homepage</RedirectComponent>
    </>
  );
};

export default DashBoard;