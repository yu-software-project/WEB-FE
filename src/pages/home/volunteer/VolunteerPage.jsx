import label from "assets/label.png";
import DetailName from "components/home/volunteer/list/view/DetailPage";
import { Outlet, useLocation } from "react-router-dom";
import "styles/home/volunteer/VolunteerPage.scss";
const VolunteerPage = () => {
  const location = useLocation();
  const lastPath = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const query = new URLSearchParams(location.search);

  const id = query.get("id");
  const volunteerInfo = lastPath === "info" ? "active" : "";
  const volunteerDetailInfo = lastPath === "detail" ? "active" : "";
  const volunteerManage = lastPath === "manage" ? "active" : "";

  return (
    <div className="volunteer-page-container">
      <div className="volunteer-page-title">
        <div className="image-container">
          <img src={label} alt="label" />
          <span className="title-text">공고 수정</span>
        </div>
      </div>
      <div className="volunteer-detail-container">
        {lastPath !== "manage" && <DetailName path={lastPath} />}

        <Outlet context={id} />
      </div>
    </div>
  );
};

export default VolunteerPage;
