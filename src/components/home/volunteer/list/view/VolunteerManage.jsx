import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  approveVolunteer,
  deleteVolunteer,
  getVolunteerDetail,
  getVolunteerPeopleList,
  rejectVolunteer,
} from "services/home/volunteer";

const VolunteerManage = () => {
  const location = useLocation();
  const [days, setDays] = useState("2024-06-01");
  const [waitingVolunteers, setWaitingVolunteers] = useState([]);
  const [acceptedVolunteers, setAcceptedVolunteers] = useState([]);
  console.log(waitingVolunteers);
  const [people, setPeople] = useState({
    name: "이름",
    gender: "성별",
    birthdate: "생일",
    phone: "번호",
    intro: "소개",
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");

    const fetchVolunteerManageInfo = async (id) => {
      try {
        console.log(id);
        const data = {
          recruitmentId: id,
        };
        const response = await getVolunteerPeopleList(data);
        if (
          response &&
          response.waitingVolunteers &&
          response.acceptVolunteers
        ) {
          setWaitingVolunteers(response.waitingVolunteers);
          setAcceptedVolunteers(response.acceptVolunteers);
        }
      } catch (error) {
        console.error("Error fetching volunteer manage info:", error);
      }
    };

    if (id) {
      fetchVolunteerManageInfo(id);
    }
  }, [days, location.search]);
  const handleVolunteerClick = async (volunteerId) => {
    try {
      const response = await getVolunteerDetail(volunteerId); // API 호출
      console.log(response);
      setPeople({
        name: response.name || "이름",
        gender: response.gender || "성별",
        birthdate: response.birthDate || "생일",
        phone: response.phoneNum || "번호",
        intro: response.selfIntroduction || "소개",
      }); // 받은 데이터를 people에 적용
    } catch (error) {
      console.error("Error fetching volunteer detail:", error);
    }
  };
  const handleApprove = async (volunteer) => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    try {
      const data2 = {
        recruitmentId: id,
        volunteerId: volunteer.id,
        recruitmentDate: days,
      };
      const res = await approveVolunteer(data2);
      console.log(res);
    } catch (e) {
      console.error("Error approving volunteer:", e);
    }
    setAcceptedVolunteers([...acceptedVolunteers, volunteer]);
    setWaitingVolunteers(
      waitingVolunteers.filter((v) => v.id !== volunteer.id)
    );
  };

  const handleReject = async (volunteer) => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    try {
      const data2 = {
        recruitmentId: id,
        volunteerId: volunteer.id,
        recruitmentDate: days,
      };
      const res = await rejectVolunteer(data2);
      console.log(res);
    } catch (e) {
      console.error("Error rejecting volunteer:", e);
    }
    setWaitingVolunteers(
      waitingVolunteers.filter((v) => v.id !== volunteer.id)
    );
  };

  const handleDelete = async (volunteer) => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    try {
      const data2 = {
        recruitmentId: id,
        volunteerId: volunteer.id,
        recruitmentDate: days,
      };
      const res = await deleteVolunteer(data2);
      console.log(res);
    } catch (e) {
      console.error("Error deleting volunteer:", e);
    }
    setAcceptedVolunteers(
      acceptedVolunteers.filter((v) => v.id !== volunteer.id)
    );
  };

  return (
    <div className="volunteer-manage-container">
      <div className="manage-individual-container">
        <div className="manage-individual-form">
          {people.name && (
            <div>
              <label>이름: </label>
              <span>{people.name}</span>
            </div>
          )}
          {people.gender && (
            <div>
              <label>성별: </label>
              <span>{people.gender}</span>
            </div>
          )}
          {people.birthdate && (
            <div>
              <label>생년월일: </label>
              <span>{people.birthdate}</span>
            </div>
          )}
          {people.phone && (
            <div>
              <label>전화번호: </label>
              <span>{people.phone}</span>
            </div>
          )}
          {people.intro && (
            <div>
              <label>한줄소개: </label>
              <span>{people.intro}</span>
            </div>
          )}
        </div>
      </div>
      <div className="volunteer-manage-people-container">
        <div className="approve-waiting-container">
          <div className="approve-header-container">
            <span>승인 대기</span>
            <div className="approve-decision-container">
              <button className="approve-all-btn">모두 승인</button>
              <button className="approve-reject-all-btn">모두 거절</button>
            </div>
          </div>
          <div className="approve-waiting-list-container">
            {waitingVolunteers.map((volunteer, index) => (
              <div key={volunteer.id} className="volunteer-item">
                <span onClick={() => handleVolunteerClick(volunteer.id)}>
                  {index + 1}. {volunteer.name}
                </span>
                <button
                  className="approve-btn"
                  onClick={() => handleApprove(volunteer)}
                >
                  승인
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleReject(volunteer)}
                >
                  거절
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="approve-complete-container">
          <div className="approve-complete-header-container">
            <span>승인 완료</span>
          </div>
          <div className="approve-complete-list-container">
            {acceptedVolunteers.map((volunteer, index) => (
              <div key={volunteer.id} className="volunteer-item">
                <span>
                  {index + 1}. {volunteer.name}
                </span>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(volunteer)}
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

export default VolunteerManage;
