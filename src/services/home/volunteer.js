import axios from "axios";
import { SERVER_IP } from "constants/api";
import { userToken } from "store/auth";

/**
 * auth API 요청 Interface
 * @param {String} url 통신 URI
 * @param {String} data 입력 데이터
 * @param {String} params 쿼리 데이터
 * @returns 응답 객체
 */
const volunteerAPIInterface = async (
  method,
  url,
  data = {},
  contentType = "application/json"
) => {
  const { accessToken } = userToken.getState();
  try {
    const res = await axios({
      method: method,
      url: `${SERVER_IP}/${url}`,
      data: method === "get" ? {} : data,
      params: method === "get" ? data : {},
      headers: {
        "Content-Type": contentType,
        Authorization: `Bearer ${accessToken}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });

    return res.data;
  } catch (e) {
    console.error("error : ", e);
    return e; // 임시
  }
};

const getVolunteerList = async (id) => {
  const res = await volunteerAPIInterface(
    "get",
    `api/web/recruitment/get/pagination`,
    null,
    null
  );
  return res;
};

const updateVolunteer = async (data) => {
  const res = await volunteerAPIInterface(
    "put",
    "api/web/recruitment/update",
    data
  );
  return res;
};

const createVolunteer = async (data) => {
  const res = await volunteerAPIInterface(
    "post",
    "api/web/recruitment/create",
    data
  );
  return res;
};

const getVolunteerPeopleList = async (data) => {
  const res = await volunteerAPIInterface(
    "post",
    "api/web/recruitment/get/volunteers/by/date",
    data
  );
  return res;
};

const getVolunteerListBySearch = async (data) => {
  const res = await volunteerAPIInterface(
    "post",
    "api/web/recruitment/findByName",
    data
  );
  return res;
};

const approveVolunteer = async (data) => {
  console.log(data);
  const res = await volunteerAPIInterface(
    "post",
    "api/web/recruitment/accept",
    data
  );
  return res;
};

const rejectVolunteer = async (data) => {
  const res = await volunteerAPIInterface(
    "post",
    "api/web/recruitment/delete/waiting",
    data
  );
  return res;
};

const deleteVolunteer = async (data) => {
  const res = await volunteerAPIInterface(
    "post",
    "api/web/recruitment/delete/accept",
    data
  );
  return res;
};

const getVolunteerDetail = async (user_id) => {
  console.log(user_id);
  const res = await volunteerAPIInterface(
    "get",
    `api/web/recruitment/detail/user/info/${user_id}`,
    null
  );
  return res;
};

// const updateFacilityHistory = async (data) => {
//   const res = await volunteerAPIInterface("post", "api/history/update", data);
//   return res;
// };

export {
  getVolunteerList,
  updateVolunteer,
  createVolunteer,
  getVolunteerPeopleList,
  getVolunteerListBySearch,
  approveVolunteer,
  rejectVolunteer,
  deleteVolunteer,
  getVolunteerDetail,
};
