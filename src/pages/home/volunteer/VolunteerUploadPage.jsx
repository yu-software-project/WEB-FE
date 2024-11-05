import label from "assets/label.png";
import DetailName from "components/home/volunteer/upload/DetailName";
import { Outlet, useLocation } from "react-router-dom";
import "styles/home/volunteer/VolunteerUploadPage.scss";
const VolunteerUploadPage = () => {
  const location = useLocation();
  const lastPath = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const volunteerInfo = lastPath === "upload" ? "active" : "";
  const volunteerDetailInfo = lastPath === "detail" ? "active" : "";

  return (
    <div className="volunteer-upload-page-container">
      <div className="volunteer-upload-page-title">
        <div className="image-container">
          <img src={label} alt="label" />
          <span className="title-text">공고 등록</span>
        </div>
      </div>

      <div className="volunteer-upload-detail-container">
        <DetailName path={lastPath} />
        <Outlet />
      </div>
    </div>
  );
};

export default VolunteerUploadPage;
