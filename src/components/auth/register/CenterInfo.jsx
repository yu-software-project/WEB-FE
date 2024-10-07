import AddressSearchModal from "commons/modal/AddressSearchModal";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { CenterInfoController } from "store/auth";
import "styles/auth/register/CenterInfo.scss";
const CenterInfo = () => {
  const [ceoName, setCeoName] = useState("");
  const [centerName, setCenterName] = useState("");
  const [centerPhone, setCenterPhone] = useState("");
  const [businessFileName, setBusinessFileName] = useState("");
  const [roadAddress, setRoadAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [isSearchToggle, setIsSearchToggle] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const { setBusinessFile } = CenterInfoController.getState();

  useEffect(() => {
    if (
      ceoName !== "" &&
      centerName !== "" &&
      centerPhone !== "" &&
      businessFileName !== "" &&
      roadAddress !== "" &&
      detailAddress !== ""
    ) {
      setIsFormFilled(true);
    }
  }, [
    ceoName,
    centerName,
    centerPhone,
    businessFileName,
    roadAddress,
    detailAddress,
  ]);

  return (
    <Form className="center-info-container" method="post" action="/register">
      <div className="ceo-name-container">
        <span className="ceo-name">대표자명</span>
        <span className="important-sign">*</span>
        <input
          name="ceo-name"
          placeholder="대표자명"
          className="ceo-name-input"
          value={ceoName}
          onChange={(e) => {
            setCeoName(e.target.value);
          }}
        />
      </div>

      <div className="center-name-container">
        <span className="center-name">기관명</span>
        <span className="important-sign">*</span>
        <input
          name="center-name"
          placeholder="기관명"
          className="center-name-input"
          value={centerName}
          onChange={(e) => {
            setCenterName(e.target.value);
          }}
        />
      </div>

      <div className="center-phone-container">
        <span className="center-phone">기관전화번호</span>
        <span className="important-sign">*</span>
        <input
          name="center-phone"
          placeholder="'-' 빼고 숫자만 입력"
          className="center-phone-input"
          value={centerPhone}
          onChange={(e) => {
            setCenterPhone(e.target.value);
          }}
        />
      </div>

      <div className="center-address-container">
        <span className="center-address">기관 주소</span>
        <span className="important-sign">*</span>
        <div className="center-road-address-container">
          <input
            name="center-road-address"
            placeholder="기관 주소를 입력"
            className="center-road-address-input"
            value={roadAddress}
            readOnly
          />
          <button
            type="button"
            className="center-road-address-search-btn"
            onClick={() => setIsSearchToggle(!isSearchToggle)}
          >
            주소 검색
          </button>
        </div>

        {isSearchToggle && (
          <AddressSearchModal
            onClose={() => setIsSearchToggle(false)}
            setRoadAddress={setRoadAddress}
          />
        )}

        <input
          name="center-detail-address"
          placeholder="기관 주소를 입력"
          className="center-detail-address-input"
          value={detailAddress}
          onChange={(e) => {
            setDetailAddress(e.target.value);
          }}
        />
      </div>

      <div className="business-certificate-container">
        <span className="business-certificate">사업자 등록증</span>
        <span className="important-sign">*</span>
        <span className="file-type-sign">
          (pdf, docx, hwp 확장자를 사용하는 50mb 이하의 파일)
        </span>
        <div className="business-certificate-select-container">
          <input
            name="center-business-certificate"
            id="business-certificate-input"
            type="text"
            placeholder="파일 업로드"
            className="business-certificate-input"
            value={businessFileName}
            readOnly
          />

          <label
            className="business-certificate-label"
            htmlFor="business-certificate-search-btn"
          >
            파일 선택
          </label>
          <input
            id="business-certificate-search-btn"
            type="file"
            accept=".pdf"
            className="business-certificate-search-btn"
            onChange={(e) => {
              setBusinessFileName(e.target.files[0].name);
              setBusinessFile(e.target.files[0]);
            }}
          />
        </div>

        <button
          type="submit"
          className="enter-info-submit-btn"
          disabled={!isFormFilled}
        >
          다음
        </button>
      </div>
    </Form>
  );
};

export default CenterInfo;
