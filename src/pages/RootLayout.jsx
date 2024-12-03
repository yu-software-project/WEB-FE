import { Outlet, redirect } from "react-router-dom";
import { reissueToken } from "services/auth/token";
import { getAuthToken, getRefreshToken } from "utils/token";

const RootLayout = () => {
  return <Outlet />;
};

export default RootLayout;

export const loader = async ({ request }) => {
  const { pathname } = new URL(request.url);
  const refreshToken = getRefreshToken();
  const { accessToken, setAccessToken } = getAuthToken();

  if (accessToken && pathname === "/") {
    return redirect("/home");
  }

  // accessToken 미존재, refreshtoken 존재
  if (!accessToken && refreshToken) {
    const response = await reissueToken(refreshToken);
    const { accessToken: newAccessToken } = response.data;
    setAccessToken(newAccessToken);
    return redirect(pathname);
  }
  return null;
};
