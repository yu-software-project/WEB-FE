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
const greetingAPIInterface = async (
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

const getGreetingPage = async () => {
  const res = await greetingAPIInterface(
    "get",
    "get/greeting/and/year",
    null,
    null
  );

  return res;
};

const updateGreeting = async (data) => {
  const res = await greetingAPIInterface("put", "api/greeting/update", data);
  return res;
};

const updateFacilityHistory = async (data) => {
  const res = await greetingAPIInterface("post", "api/history/update", data);
  return res;
};

export { getGreetingPage, updateGreeting, updateFacilityHistory };
