import MarkerIcon from "assets/map_marker_icon.png";
import Modal from "commons/Modal";
import { KAKAO_MAP_API, KAKAO_REST_API } from "constants/api";
import { useState } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import "styles/commons/AddressSearchModal.scss";

const AddressSearchModal = ({ onClose, setRoadAddress }) => {
  const [enteredAddress, setEnteredAddress] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [isView, setIsView] = useState(false);
  const [position, setPosition] = useState({});

  useKakaoLoader({
    appkey: KAKAO_MAP_API,
  });

  const searchAddress = async (e) => {
    // 검색어에 따른 주소 리스트 저장 함수
    e.preventDefault();

    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${enteredAddress}`,
      {
        method: "GET",
        headers: {
          Authorization: `KakaoAK ${KAKAO_REST_API}`,
        },
      }
    );

    const resData = await response.json();

    const addresses = resData.documents.map((document) => {
      const documentAddress = {
        id: document.x,
        address: document.address
          ? document.address.address_name
          : document.address_name,
        roadAddress: document.road_address
          ? document.road_address.address_name
          : document.address_name,
        coordinate: { lng: document.x, lat: document.y },
      };

      return documentAddress;
    });

    setSearchList(addresses);
  };

  const viewAddressOnMap = (searchItem) => {
    setRoadAddress(searchItem.roadAddress);
    setIsView(true);
    setPosition(searchItem.coordinate);
  };

  const selectAddress = (address) => {
    setRoadAddress(address);
    onClose();
  };

  return (
    <>
      {!isView && (
        <Modal className="address-search-container" onClose={onClose}>
          <div className="address-search-header">
            <h1 className="address-search-title">매장 위치 설정</h1>
            <button className="address-close-btn" onClick={onClose}>
              <svg
                className="address-close-svg"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M1.20996 0.130859C1.54984 0.130859 1.87397 0.274167 2.1027 0.525568L9.47587 8.62948H9.65634L17.0412 0.527278C17.2713 0.274761 17.5972 0.130859 17.9389 0.130859C18.9967 0.130859 19.549 1.3892 18.8329 2.16778L11.5998 10.0314L18.8303 17.8922C19.5474 18.6719 18.9944 19.932 17.9351 19.932C17.5956 19.932 17.2716 19.7901 17.0413 19.5406L9.65634 11.5397H9.47587L2.0872 19.5447C1.85931 19.7915 1.53861 19.932 1.20263 19.932C0.149055 19.932 -0.39618 18.6742 0.324046 17.9053L7.69897 10.0314L0.329053 2.16289C-0.393074 1.39191 0.153604 0.130859 1.20996 0.130859Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
          <form className="address-search-form" onSubmit={searchAddress}>
            <input
              type="text"
              className="address-search-input"
              placeholder="주소를 입력해주세요."
              value={enteredAddress}
              onChange={(e) => setEnteredAddress(e.target.value)}
            />
            <button type="submit" className="address-search-btn">
              <svg
                className="address-search-svg"
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
              >
                <path
                  d="M10.1572 0.228516C12.7599 0.228516 15.256 1.26243 17.0964 3.10282C18.9368 4.9432 19.9707 7.4393 19.9707 10.042C19.9707 12.4727 19.0799 14.7072 17.6155 16.4283L18.0231 16.8359H19.2158L26.7646 24.3848L24.5 26.6494L16.9512 19.1006V17.9079L16.5435 17.5002C14.8224 18.9647 12.5879 19.8555 10.1572 19.8555C7.55453 19.8555 5.05843 18.8216 3.21805 16.9812C1.37767 15.1408 0.34375 12.6447 0.34375 10.042C0.34375 7.4393 1.37767 4.9432 3.21805 3.10282C5.05843 1.26243 7.55453 0.228516 10.1572 0.228516ZM10.1572 3.24805C6.38281 3.24805 3.36328 6.26758 3.36328 10.042C3.36328 13.8164 6.38281 16.8359 10.1572 16.8359C13.9316 16.8359 16.9512 13.8164 16.9512 10.042C16.9512 6.26758 13.9316 3.24805 10.1572 3.24805Z"
                  fill="#898C9A"
                />
              </svg>
            </button>
          </form>
          <div className="address-list-container">
            <ul className="address-list">
              {searchList.map((searchItem) => (
                <li key={searchItem.id} className="address-item">
                  <div className="address-container">
                    <span className="address-label">도로명</span>
                    <p
                      className="address-name"
                      onClick={() => selectAddress(searchItem.roadAddress)}
                    >
                      {searchItem.roadAddress}
                    </p>
                  </div>
                  <div className="address-container">
                    <span className="address-label">지 번</span>
                    <p
                      className="address-name"
                      onClick={() => selectAddress(searchItem.address)}
                    >
                      {searchItem.address}
                    </p>
                  </div>
                  <button
                    className="detail-map-btn"
                    onClick={viewAddressOnMap.bind(null, searchItem)}
                  >
                    지도보기
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      )}
      {isView && (
        <Modal className="address-detail-container" onClose={onClose}>
          <div className="address-detail-header">
            <button
              className="address-previous-btn"
              onClick={() => setIsView(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="29"
                viewBox="0 0 12 29"
                fill="none"
              >
                <path
                  d="M11.0197 1.35547L1.17969 14.7126L11.0197 28.2754"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <h1 className="address-detail-title">매장 위치 설정</h1>
            <button className="address-submit-btn" onClick={onClose}>
              저장
            </button>
          </div>
          <Map
            className="address-detail-map"
            center={position}
            level={1}
            onDrag={(e) =>
              setPosition({
                lat: e.getCenter().getLat(),
                lng: e.getCenter().getLng(),
              })
            }
            onClick={(_t, mouseEvent) =>
              setPosition({
                lat: mouseEvent.latLng.getLat(),
                lng: mouseEvent.latLng.getLng(),
              })
            }
          >
            <MapMarker
              image={{
                src: MarkerIcon,
                size: {
                  width: 45,
                  height: 60,
                },
              }}
              title="marker"
              position={position}
            />
          </Map>
        </Modal>
      )}
    </>
  );
};

export default AddressSearchModal;
