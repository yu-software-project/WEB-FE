import label from "assets/label.png";
import DetailName from "components/home/facility/DetailName";
import { Outlet, useLocation } from "react-router-dom";
import "styles/home/facility/FacilityPage.scss";
const FacilityPage = () => {
  const location = useLocation();
  const lastPath = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const titleMap = {
    greeting: "인사말",
    introduction: "시설 소개",
    "route-info": "찾아오는 길",
  };

  const title = titleMap[lastPath] || "시설 소개";

  return (
    <div className="facility-container">
      <div className="facility-introduction-title">
        <div className="image-container">
          <img src={label} alt="label" />
          <span className="title-text">{title}</span>
        </div>
      </div>

      <div className="facility-detail-container">
        <DetailName path={lastPath} />
        <Outlet />
      </div>
    </div>
  );
};

export default FacilityPage;
