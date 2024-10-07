import logoImage from "assets/logo.png";
import "styles/auth/login/LoginHeader.scss";
const LoginHeader = () => {
  return (
    <div className="login-logo-container">
      <img className="logo-iamge" src={logoImage} alt="logo" />
    </div>
  );
};

export default LoginHeader;
