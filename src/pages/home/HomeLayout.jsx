import HomeHeader from "components/home/HomeHeader";
import { Outlet } from "react-router-dom";
import "styles/home/HomeLayout.scss";
import { restrictAccessWithNoToken } from "utils/token";
const HomeLayout = () => {
  return (
    <div className="homepage-container">
      <div className="homepage-body-container">
        <div className="content-container">
          <HomeHeader />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;

export const loader = async () => {
  const isToken = await restrictAccessWithNoToken();
  if (!isToken) {
    //return redirect("/");
  }
  return null;
};
