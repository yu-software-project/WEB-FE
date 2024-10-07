import { restrictAccessWithNoToken } from "utils/token";
const HomeLayout = () => {
  return <div className="homepage-container"></div>;
};

export default HomeLayout;

export const loader = async () => {
  const isToken = await restrictAccessWithNoToken();
  if (!isToken) {
    //return redirect("/");
  }
  return null;
};
