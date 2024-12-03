import ManagerHeader from "components/manager/ManagerHeaer";
import { Outlet, redirect } from "react-router-dom";
import "styles/manager/ManagerLayout.scss";
import { restrictAccessWithNoToken } from "utils/token";
const ManagerLayout = () => {
  return (
    <div className="managerpage-container">
      <div className="managerpage-body-container">
        <div className="content-container">
          <ManagerHeader />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ManagerLayout;

export const loader = async () => {
  const isToken = await restrictAccessWithNoToken();
  if (!isToken) {
    return redirect("/");
  }
  return null;
};
