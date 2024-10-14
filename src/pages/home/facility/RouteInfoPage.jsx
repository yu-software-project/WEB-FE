import RouteInfo from "components/home/facility/RouteInfo";
import { useLoaderData } from "react-router-dom";
import { getRouteInfo } from "services/home/routeInfo";

const RouteInfoPage = () => {
  const { addressInfo, routeInfo } = useLoaderData();
  console.log(addressInfo, routeInfo);
  return (
    <RouteInfo routeInfoLoaderData={routeInfo} addressInfo={addressInfo} />
  );
};

export default RouteInfoPage;

export const loader = async () => {
  const res = await getRouteInfo();

  //const addressInfo = res.address;
  //const routeInfo = res.routeInfo.memo;
  const addressInfo = "hi";
  const routeInfo = "bye";
  return { addressInfo, routeInfo };
};
