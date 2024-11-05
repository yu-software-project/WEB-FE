import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createVolunteer } from "services/home/volunteer";

const VolunteerDetailInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {};
  const [detailInfo, setDetailInfo] = useState("");

  const handleSubmit = async () => {
    const submissionData = {
      ...data,
      detailInfo,
    };

    try {
      const response = await createVolunteer(submissionData);

      if (response) {
        console.log("Data submitted successfully");
        navigate("../");
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="volunteer-detail-info-container">
      <span>
        {"("}
        {detailInfo.length}/3000{")"}
      </span>
      <textarea
        className="volunteer-detail-info-input"
        placeholder="자세한 내용을 입력해주세요."
        value={detailInfo}
        onChange={(e) => setDetailInfo(e.target.value)}
        maxLength={3000}
      />
      <button type="submit" onClick={handleSubmit}>
        저장
      </button>
    </div>
  );
};

export default VolunteerDetailInfo;
