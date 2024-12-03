import logo from "assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { removeRefreshToken } from "utils/token";

const ManagerHeader = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    console.log("로그아웃");
    removeRefreshToken();

    navigate("/");
  };
  return (
    <div className="content-header-container">
      <span className="hompage-header-title">
        <Link to="/manager">
          <img className="logo-image" src={logo} alt="logo" />
        </Link>
      </span>
      <div className="nav-container">
        <Link to="/manager">기관 목록</Link>
        <Link to="./approve">등록 승인</Link>
      </div>
      <div className="profile-container">
        <button onClick={logoutHandler} className="logout-btn">
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default ManagerHeader;
