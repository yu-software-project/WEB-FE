import { Outlet } from "react-router-dom";
import "styles/home/volunteer/VolunteerLayout.scss";

const VolunteerLayout = () => {
  return (
    <div className="volunteer-container">
      <Outlet />
    </div>
  );
};

export default VolunteerLayout;
