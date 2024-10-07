import LoginHeader from "components/auth/login/LoginHeader";
import "styles/auth/login/Login.scss";
import LoginForm from "./LoginForm";
import LoginNavigation from "./LoginNavigation";

const Login = ({ myEmail }) => {
  return (
    <div className="login-container">
      <LoginHeader />
      <LoginForm myEmail={myEmail} />
      <LoginNavigation />
    </div>
  );
};

export default Login;
