import Introduction from "components/home/facility/Introduction";
import { useLoaderData } from "react-router-dom";
import { requestFacilityData } from "services/home/facility";

const IntroductionPage = () => {
  const { floorSizeList, floorPictureClusterList } = useLoaderData();
  return (
    <Introduction
      floorSizeList={floorSizeList}
      floorPictureClusterList={floorPictureClusterList}
    />
  );
};

export default IntroductionPage;

export const loader = async () => {
  const data = await requestFacilityData();
  return data;
};
