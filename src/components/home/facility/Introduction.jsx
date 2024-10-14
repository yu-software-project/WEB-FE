import "styles/home/facility/Introduction.scss";
import FacilityPictureTable from "./FacilityPictureTable";
import FacilityScaleTable from "./FacilityScaleTable";

const Introduction = ({ floorSizeList, floorPictureClusterList }) => {
  console.log(floorSizeList);
  console.log(floorPictureClusterList);
  return (
    <div className="introduction-container">
      <div className="facility-scale-container">
        <FacilityScaleTable floorSizeList={floorSizeList} />
      </div>
      <div className="facility-picture-container">
        <FacilityPictureTable
          floorPictureClusterList={floorPictureClusterList}
        />
      </div>
    </div>
  );
};

export default Introduction;
