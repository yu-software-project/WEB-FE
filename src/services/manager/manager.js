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
const managerAPIInterface = async (
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
    console.log(res);

    return res.data;
  } catch (e) {
    console.error("error : ", e);
    return []; // 임시
  }
};

// 인증된 기관 리스트 출력
const getfacilityList = async () => {
  const res = await managerAPIInterface(
    "get",
    "api/admin/center/summary",
    null,
    null
  );
  return res;
};

const getfacilityDetail = async (center_id) => {
  const res = await managerAPIInterface(
    "get",
    `api/admin/center/detail/${center_id}`,
    null,
    null
  );
  return res;
};

const deletefacility = async (center_id) => {
  const res = await managerAPIInterface(
    "delete",
    `api/admin/center/delete/${center_id}`,
    null,
    null
  );
  return res;
};

const approvefacility = async (center_id) => {
  const res = await managerAPIInterface(
    "post",
    `api/admin/center/register/permit/${center_id}`,
    null
  );
  return res;
};

const rejectfacility = async (data) => {
  console.log(data);
  const res = await managerAPIInterface(
    "post",
    `api/admin/center/register/refusal`,
    data
  );
  return res;
};

const getWaitingList = async () => {
  const res = await managerAPIInterface(
    "get",
    "api/admin/waiting/center/summary",
    null,
    null
  );
  return res;
};

const getWaitingDetail = async (center_id) => {
  const res = await managerAPIInterface(
    "get",
    `api/admin/waiting/center/detail/${center_id}`,
    null,
    null
  );
  return res;
};

export {
  getfacilityList,
  getfacilityDetail,
  deletefacility,
  approvefacility,
  rejectfacility,
  getWaitingList,
  getWaitingDetail,
};
