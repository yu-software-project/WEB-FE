import waitImg from "assets/wait.png";
import { Link } from "react-router-dom";
import "styles/auth/register/Wait.scss";
const Wait = () => {
  return (
    <div className="wait-container">
      <img className="wait-image" src={waitImg} alt="wait" />
      <Link to="/" className="login-navigation">
        홈 화면으로 돌아가기
      </Link>
    </div>
  );
};

export default Wait;
