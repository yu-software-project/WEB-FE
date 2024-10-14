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
const routeInfoAPIInterface = async (
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
    return e; // 임시
  }
};

// 기관 주소 및 찾아오는 길 반환
const getRouteInfo = async () => {
  const res = await routeInfoAPIInterface(
    "get",
    "get/address/and/routeinfo",
    null,
    null
  );
  return res;
};

const updateRouteInfoAPI = async (data) => {
  const res = await routeInfoAPIInterface("put", "api/routeinfo/update", data);
  return res;
};

export { getRouteInfo, updateRouteInfoAPI };
