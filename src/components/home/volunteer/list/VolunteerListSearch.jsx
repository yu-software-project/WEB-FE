import calendarImage from "assets/calendar.png";
import { useState } from "react";

const VolunteerListSearch = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");
  const [isRecruiting, setIsRecruiting] = useState(false);
  const [isRecruited, setIsRecruited] = useState(false);

  const handleSearch = () => {
    onSearch(keyword);
  };

  const handleReset = () => {
    setKeyword("");
    setIsRecruiting(false);
    setIsRecruited(false);
    onSearch("");
  };

  return (
    <div className="volunteer-list-search-container">
      <div className="volunteer-list-search-word-container">
        <span className="search-option">검색어</span>
        <input
          type="text"
          className="volunteer-list-search-input"
          placeholder="검색어를 입력하세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="volunteer-list-search-btn" onClick={handleSearch}>
          검색
        </button>
        <button className="volunteer-list-search-reset" onClick={handleReset}>
          초기화
        </button>
      </div>

      <div className="volunteer-list-search-period-container">
        <span className="search-option">조회 기간</span>
        <div className="volunteer-list-search-start-date-container">
          <input
            type="text"
            className="volunteer-list-search-start-date-input"
            placeholder="연도 - 월 - 일"
          />
          <button className="volunteer-list-search-start-calendar-btn">
            <img
              className="calendar-image"
              src={calendarImage}
              alt="calendar"
            />
          </button>
        </div>
        <span className="wave">~</span>
        <div className="volunteer-list-search-end-date-container">
          <input
            type="text"
            className="volunteer-list-search-end-date-input"
            placeholder="연도 - 월 - 일"
          />
          <button className="volunteer-list-search-end-calendar-btn">
            <img
              className="calendar-image"
              src={calendarImage}
              alt="calendar"
            />
          </button>
        </div>
      </div>

      <div className="volunteer-list-search-recruit-state-container">
        <span className="search-option">공고 상태</span>
        <button
          type="button"
          className={`recruiting-state-btn ${isRecruiting ? "active" : ""}`}
          onClick={() => {
            setIsRecruiting(!isRecruiting);
          }}
        >
          <svg
            className="item-toggle-svg"
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
          >
            <path
              className="check1"
              d="M1.34375 8.16948L7.70305 16.7304L18.4648 1.56445"
              stroke="grey"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <span className="recruiting-state">모집 중</span>

        <button
          type="button"
          className={`recruited-state-btn ${isRecruited ? "active" : ""}`}
          onClick={() => {
            setIsRecruited(!isRecruited);
          }}
        >
          <svg
            className="item-toggle-svg"
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
          >
            <path
              className="check2"
              d="M1.34375 8.16948L7.70305 16.7304L18.4648 1.56445"
              stroke="grey"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <span className="recruited-state">모집완료</span>
      </div>
    </div>
  );
};

export default VolunteerListSearch;
