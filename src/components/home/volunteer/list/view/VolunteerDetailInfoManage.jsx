import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateVolunteer } from "services/home/volunteer";

const VolunteerDetailInfoManage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recruitment = location.state?.recruitment;
  const [detailInfo, setDetailInfo] = useState(recruitment?.detailInfo || "");

  const handleSave = async () => {
    if (!recruitment) {
      alert("봉사 정보를 불러오지 못했습니다.");
      return;
    }

    // 새로운 형식으로 변환
    const updatedRecruitment = {
      id: recruitment.id,
      newRecruitmentDto: {
        name: recruitment.name,
        recruitmentEndDate: recruitment.recruitmentEndDate,
        startTime: recruitment.startTime,
        endTime: recruitment.endTime,
        startDate: recruitment.startDate,
        endDate: recruitment.endDate,
        totalApplicants: recruitment.totalApplicants,
        isRepeatedDate: recruitment.repeatedDate,
        repeatedDays: [
          recruitment.repeatedDays.sunday,
          recruitment.repeatedDays.monday,
          recruitment.repeatedDays.tuesday,
          recruitment.repeatedDays.wednesday,
          recruitment.repeatedDays.thursday,
          recruitment.repeatedDays.friday,
          recruitment.repeatedDays.saturday,
        ],
        detailInfo,
        timeExits: recruitment.timeExits,
      },
    };

    try {
      const response = await updateVolunteer(updatedRecruitment);
      if (response) {
        alert("저장되었습니다.");
        navigate(`/home/volunteer/list`, {
          state: { recruitment },
        });
      } else {
        alert("저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error saving recruitment details:", error);
      alert("저장 중 오류가 발생했습니다.");
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
      <button type="submit" onClick={handleSave}>
        저장
      </button>
    </div>
  );
};

export default VolunteerDetailInfoManage;
