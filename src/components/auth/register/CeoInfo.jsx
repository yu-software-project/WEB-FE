import CustomTimer from "commons/Timer";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import {
  requestEmailVerifyCode,
  requestPhoneVerifyCode,
} from "services/auth/auth";
import "styles/auth/register/CeoInfo.scss";
import { checkPassword } from "utils/validate";
const CeoInfo = () => {
  const [email, setEmail] = useState("");
  const [emailVerifyNumber, setEmailVerifyNumber] = useState("");
  const [isEmailVerify, setIsEmailVerify] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneVerifyNumber, setPhoneVerifyNumber] = useState("");
  const [isPhoneVerify, setIsPhoneVerify] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isPasswordValidated, setIsPasswordValidated] = useState(true);
  const [isPasswordValidated2, setIsPasswordValidated2] = useState(true);

  useEffect(() => {
    if (
      email !== "" &&
      emailVerifyNumber !== "" &&
      phone !== "" &&
      phoneVerifyNumber !== "" &&
      password !== "" &&
      passwordVerify !== ""
    ) {
      setIsFormFilled(true);
    }
  }, [
    email,
    emailVerifyNumber,
    phone,
    phoneVerifyNumber,
    password,
    passwordVerify,
  ]);

  const emailVerify = () => {
    requestEmailVerifyCode(email);
    setIsEmailVerify(true);
  };

  const phoneVerify = () => {
    requestPhoneVerifyCode(phone);
    setIsPhoneVerify(true);
  };

  const validateForm = (e) => {
    if (!checkPassword(password)) {
      setIsPasswordValidated(false);
      e.preventDefault();
      return;
    }
    setIsPasswordValidated(true);
    if (password !== passwordVerify) {
      setIsPasswordValidated2(false);
      e.preventDefault();
      return;
    }
    setIsPasswordValidated2(true);
  };

  return (
    <Form
      className="ceo-info-container"
      method="post"
      action=""
      onSubmit={(e) => {
        validateForm(e);
      }}
    >
      <div className="ceo-email-container">
        {isEmailVerify && <CustomTimer setIsLeft={setIsEmailVerify} />}
        <span className="ceo-email">이메일</span>
        <span className="important-sign">*</span>
        <div className="ceo-email-input-container">
          <input
            type="email"
            name="ceo-email"
            placeholder="이메일 입력"
            className="ceo-email-input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button
            type="button"
            className="ceo-email-verify-btn"
            onClick={emailVerify}
          >
            인증요청
          </button>
        </div>
        <input
          type="password"
          name="ceo-email-verify-input"
          placeholder="인증번호 4자리 입력"
          className="ceo-email-verify-input"
          disabled={!isEmailVerify}
          value={emailVerifyNumber}
          onChange={(e) => {
            setEmailVerifyNumber(e.target.value);
          }}
        />
      </div>

      <div className="ceo-phone-container">
        {isPhoneVerify && <CustomTimer setIsLeft={setIsPhoneVerify} />}
        <span className="ceo-phone">관리자 전화번호</span>
        <span className="important-sign">*</span>
        <div className="ceo-phone-input-container">
          <input
            type="number"
            name="ceo-phone"
            placeholder="'-' 빼고 입력"
            className="ceo-phone-input"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <button
            type="button"
            className="ceo-phone-verify-btn"
            onClick={phoneVerify}
          >
            인증요청
          </button>
        </div>
        <input
          type="password"
          name="ceo-phone-verify-input"
          placeholder="인증번호 4자리 입력"
          className="ceo-phone-verify-input"
          disabled={!isPhoneVerify}
          value={phoneVerifyNumber}
          onChange={(e) => {
            setPhoneVerifyNumber(e.target.value);
          }}
        />
      </div>

      <div className="ceo-password-container">
        <span className="ceo-email">비밀번호</span>
        <span className="important-sign">*</span>
        <span className="password-validate-sign">
          (영문자, 숫자, 특수문자를 포함한 8~16자)
        </span>

        <input
          type="password"
          name="ceo-password"
          placeholder="비밀번호 입력"
          className="ceo-password-input"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="비밀번호 재입력"
          className="ceo-password-verify-input"
          value={passwordVerify}
          onChange={(e) => {
            setPasswordVerify(e.target.value);
          }}
        />
      </div>
      {!isPasswordValidated && (
        <span className="password-validate-error-msg">
          영문자, 숫자, 특수문자를 포함한 8~16자를 제대로 입력해주세요
        </span>
      )}
      {!isPasswordValidated2 && (
        <span className="password-validate-error-msg">
          비밀번호가 일치하지 않습니다
        </span>
      )}
      <button
        type="submit"
        className="ceo-info-submit-btn"
        disabled={!isFormFilled}
      >
        다음
      </button>
    </Form>
  );
};

export default CeoInfo;
