import Cookies from "js-cookie";
import { userToken } from "store/auth";

/**
 * 인증 토큰 반환
 * @returns {object} accessToken 및 setAccessToken
 */
const getAuthToken = () => {
  const { accessToken, setAccessToken } = userToken.getState();
  return { accessToken, setAccessToken };
};

/**
 * refreshToken 저장
 * @param {string} refreshtoken
 */
const setRefreshToken = (refreshToken, expiredTime) => {
  Cookies.set("refreshToken", refreshToken, {
    expires: new Date(expiredTime),
  });
};

/**
 * refreshToken 반환
 * @returns {string} refreshToken
 */
const getRefreshToken = () => {
  return Cookies.get("refreshToken");
};

/**
 * 토큰이 없는 경우 로그인 페이지로 이동시키기 위한 Loader
 * @returns 로그인페이지로 이동
 */
const restrictAccessWithNoToken = async () => {
  const { accessToken } = getAuthToken();
  if (!accessToken) {
    return false;
  }
  return true;
};

export {
  getAuthToken,
  getRefreshToken,
  setRefreshToken,
  restrictAccessWithNoToken,
};
