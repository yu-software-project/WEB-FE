import label from "assets/label.png";
import { useEffect, useState } from "react";
import {
  deletefacility,
  getfacilityDetail,
  getfacilityList,
} from "services/manager/manager";
import "styles/manager/Manager.scss";
const Manager = () => {
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
        const response = await getfacilityList();
        setFacilities(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching volunteer manage info:", error);
      }
    };

    fetchVolunteerManageInfo();
  }, []);

  const handleFacilityClick = async (id) => {
    console.log(id);
    try {
      const response = await getfacilityDetail(id);
      setFacility(response);
    } catch (error) {
      console.error("Error fetching facility detail:", error);
    }
  };

  // 삭제 버튼 클릭 시 해당 시설을 삭제하는 함수
  const handleDelete = async (id) => {
    try {
      await deletefacility(id);
      // 삭제 후 시설 목록을 다시 업데이트
      setFacilities(facilities.filter((facility) => facility.id !== id));
    } catch (error) {
      console.error("Error deleting facility:", error);
    }
  };

  return (
    <div className="manager-container">
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
          <span className="title">기관 목록</span>
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
                  className="delete-button"
                  onClick={() => handleDelete(facility.centerID)}
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manager;
