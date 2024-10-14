import logo from "assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const HomeHeader = () => {
  const [activeMenu, setActiveMenu] = useState(null); // state to track which menu is active

  const handleMenuToggle = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  return (
    <div className="content-header-container">
      <span className="hompage-header-title">
        <Link to="/home">
          <img className="logo-image" src={logo} alt="logo" />
        </Link>
      </span>
      <div className="nav-container">
        <div className="nav-item">
          <Link to="#" onClick={() => handleMenuToggle("facility")}>
            시설소개
          </Link>
          {activeMenu === "facility" && (
            <div className="dropdown-menu">
              <Link to="./facility/greeting">인사말</Link>
              <Link to="./facility/introduction">시설 소개</Link>
              <Link to="./facility/route-info">찾아오는 길</Link>
            </div>
          )}
        </div>
        <div className="nav-item">
          <Link to="#" onClick={() => handleMenuToggle("notice")}>
            공고 관리
          </Link>
          {activeMenu === "notice" && (
            <div className="dropdown-menu">
              <Link to="/notice/list">공고 목록</Link>
              <Link to="/notice/register">공고 등록</Link>
              <Link to="/notice/manage">지원자 관리</Link>
            </div>
          )}
        </div>
      </div>
      <div className="profile-container">
        <button className="logout-btn">로그아웃</button>
      </div>
    </div>
  );
};

export default HomeHeader;
