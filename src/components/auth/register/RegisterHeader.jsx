import logoImage from "assets/logo.png";
import "styles/auth/register/RegisterHeader.scss";

const RegisterHeader = () => {
  return (
    <div className="register-header-container">
      <div className="register-logo-container">
        <img className="logo-iamge" src={logoImage} alt="logo" />
      </div>
      <div className="register-title-container">회원가입</div>
    </div>
  );
};

export default RegisterHeader;
