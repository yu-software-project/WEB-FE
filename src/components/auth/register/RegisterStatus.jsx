//import logoImage from "@assets/logo.png";
import "styles/auth/register/RegisterStatus.scss";

const RegisterStatus = ({ currentStatus }) => {
  const isCenterInfo =
    currentStatus === "register" ? "proceed-state_selected" : "";
  const isCeoInfo = currentStatus === "ceoinfo" ? "proceed-state_selected" : "";
  const isWait = currentStatus === "wait" ? "proceed-state_selected" : "";
  const isDone = currentStatus === "done" ? "proceed-state_selected" : "";

  return (
    <div className="register-status-container">
      <div className="proceed-container">
        <p className={`proceed-state ${isCenterInfo}`}>기관정보입력</p>
        <p className="proceed-state-divider">{">"}</p>
        <p className={`proceed-state ${isCeoInfo}`}>관리자정보입력</p>
        <p className="proceed-state-divider">{">"}</p>
        <p className={`proceed-state ${isWait}`}>승인대기</p>
        <p className="proceed-state-divider">{">"}</p>
        <p className={`proceed-state ${isDone}`}>가입완료</p>
      </div>
    </div>
  );
};

export default RegisterStatus;
