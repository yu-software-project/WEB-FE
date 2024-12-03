import label from "assets/label.png";
import { useEffect, useState } from "react";
import {
  approvefacility,
  getWaitingDetail,
  getWaitingList,
  rejectfacility,
} from "services/manager/manager";
import "styles/manager/Approve.scss";
const Approve = () => {
  const [facilities, setFacilities] = useState([
    {
      centerID: 1,
      centerName: "string",
    },
    {
      centerID: 2,
      centerName: "string",
    },
    {
      centerID: 3,
      centerName: "striasdfasdfng",
    },
  ]);
  const [facility, setFacility] = useState({
    ceoName: "string",
    centerName: "string",
    phoneNum: "string",
    address: "string",
    certificate: "string",
    adminEmail: "string",
    adminPhoneNum: "string",
  });

  useEffect(() => {
    const fetchVolunteerManageInfo = async () => {
      try {
        const response = await getWaitingList();
        setFacilities(response);
      } catch (error) {
        console.error("Error fetching volunteer manage info:", error);
      }
    };

    fetchVolunteerManageInfo();
  }, []);

  const handleFacilityClick = async (id) => {
    console.log(id);
    try {
      const response = await getWaitingDetail(id);
      setFacility(response);
    } catch (error) {
      console.error("Error fetching facility detail:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approvefacility(id);
      // 삭제 후 시설 목록을 다시 업데이트
      setFacilities(facilities.filter((facility) => facility.id !== id));
    } catch (error) {
      console.error("Error deleting facility:", error);
    }
  };

  // 삭제 버튼 클릭 시 해당 시설을 삭제하는 함수
  const handleReject = async (id) => {
    const reason = prompt(
      "[어천메] 기관 승인이 거절된 사유를 입력해주세요.거절 확정 시 이메일로 기관에 안내됩니다. "
    );
    try {
      await rejectfacility({ centerId: id, reason });
      // 삭제 후 시설 목록을 다시 업데이트
      setFacilities(facilities.filter((facility) => facility.id !== id));
    } catch (error) {
      console.error("Error deleting facility:", error);
    }
  };

  return (
    <div className="approve-container">
      <div className="manager-page-title">
        <div className="image-container">
          <img src={label} alt="label" />
          <span className="title-text">공고 수정</span>
        </div>
      </div>

      <div className="facility-container">
        <div className="facility-detail-container">
          <div className="detail-form">
            {facility.ceoNmae && (
              <div>
                <label>대표자명: </label>
                <span>{facility.ceoNmae}</span>
              </div>
            )}
            {facility.centerName && (
              <div>
                <label>기관명: </label>
                <span>{facility.centerName}</span>
              </div>
            )}
            {facility.phoneNum && (
              <div>
                <label>기관전화번호: </label>
                <span>{facility.phoneNum}</span>
              </div>
            )}
            {facility.address && (
              <div>
                <label>기관주소: </label>
                <span>{facility.address}</span>
              </div>
            )}
            {facility.certificate && (
              <div>
                <label>사업자 등록증: </label>
                <span>{facility.certificate}</span>
              </div>
            )}
            {facility.adminEmail && (
              <div>
                <label>이메일: </label>
                <span>{facility.adminEmail}</span>
              </div>
            )}
            {facility.adminPhoneNum && (
              <div>
                <label>관리자 전화번호: </label>
                <span>{facility.adminPhoneNum}</span>
              </div>
            )}
          </div>
        </div>

        <div className="approve-facility-container">
          <span className="title">승인 대기</span>
          <div className="list-container">
            {facilities.map((facility) => (
              <div key={facility.centerID} className="facility-item">
                <span
                  className="facility-name"
                  onClick={() => handleFacilityClick(facility.centerID)}
                >
                  {facility.centerName}
                </span>
                <button
                  className="approve-button"
                  onClick={() => handleApprove(facility.centerID)}
                >
                  승인
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleReject(facility.centerID)}
                >
                  거절
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Approve;
