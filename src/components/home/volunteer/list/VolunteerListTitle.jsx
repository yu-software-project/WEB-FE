import label from "assets/label.png";
import "styles/home/volunteer/VolunteerLayout.scss";
const VolunteerListTitle = () => {
  return (
    <div className="volunteer-list-title-container">
      <span className="volunteer-list-title">
        <div className="image-container">
          <img src={label} alt="label" />
          <span className="title-text">공고 목록</span>
        </div>
      </span>
    </div>
  );
};

export default VolunteerListTitle;
