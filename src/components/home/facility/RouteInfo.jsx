import { useState } from "react";
import { updateRouteInfoAPI } from "services/home/routeInfo";
import "styles/home/facility/RouteInfo.scss";

const RouteInfo = ({ routeInfoLoaderData, addressInfo }) => {
  const [routeInfo, setRouteInfo] = useState(routeInfoLoaderData);
  //const addressInfo = ["경상북도 경산시 하양읍 하양로", "101동 123123호"];

  const updateRouteInfo = async () => {
    const routeInfoDto = {
      memo: routeInfo,
    };
    const res = await updateRouteInfoAPI(routeInfoDto);
  };

  return (
    <div className="route-info-container">
      <div className="facility-address-container">
        <textarea
          className="facility-address-info"
          value={addressInfo}
          readOnly
        />
      </div>
      <div className="facility-route-info-container">
        <div className="tip-container">
          <div className="route-info-tool-tip">
            주변 건물, 주차 공간 등 추가적인 정보를 입력해주세요.
          </div>
          <div className="word-cnt">({routeInfo?.length || 0}/500)</div>
        </div>

        <textarea
          className="facility-route-info"
          value={routeInfo}
          onChange={(e) => {
            setRouteInfo(e.target.value);
          }}
        />
        <button
          type="button"
          className="facility-route-info-submit-btn"
          onClick={updateRouteInfo}
        >
          변경사항 저장
        </button>
      </div>
    </div>
  );
};

export default RouteInfo;
