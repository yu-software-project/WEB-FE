import { Link } from "react-router-dom";
import "styles/auth/login/LoginNavigation.scss";

const LoginNavigation = () => {
  return (
    <div className="login-navigation-container">
      <Link to="register" className="register-navigation">
        회원가입
      </Link>
      <Link to="account" className="account-navigation">
        비밀번호 찾기
      </Link>
    </div>
  );
};

export default LoginNavigation;
