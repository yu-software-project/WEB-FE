import Login from "components/auth/login/Login";
import { redirect, useLoaderData } from "react-router-dom";
import { requestLogin } from "services/auth/auth";
import { getAuthToken, setRefreshToken } from "utils/token";

const LoginPage = () => {
  const { email } = useLoaderData();
  return <Login myEmail={email} />;
};

export default LoginPage;

export const loader = async () => {
  const email = localStorage.getItem("myEmail");
  return { email };
};

export const action = async ({ request }) => {
  const data = await request.formData();

  const loginForm = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const res = await requestLogin(loginForm);
  console.log(res);
  if (res.status === 200) {
    const { setAccessToken } = getAuthToken(); // 전역상태 관리 호출
    const { accessTokenDto, refreshTokenDto } = res.data; // 각 토큰 분리

    const { accessToken } = accessTokenDto; // accessToken 분리
    const { refreshToken, refreshTokenExpiredTime: expiredTime } =
      refreshTokenDto; // refreshToken 분리

    setAccessToken(accessToken);
    setRefreshToken(refreshToken, expiredTime);
    console.log(data.get("isManager"));
    if (data.get("isManager")) return redirect("/manager");
    return redirect("/home");
  }
};
