import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VolunteerInfo = () => {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const [dayStates, setDayStates] = useState(
    new Array(days.length).fill(false)
  );
  const [isRepetition, setIsRepetition] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isOnlyAdult, setIsOnlyAdult] = useState(false);
  const [isTimeSelect, setIsTimeSelect] = useState(false);
  const [minPeople, setMinPeople] = useState(0);
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const handleButtonClick = (index) => {
    const updatedStates = [...dayStates];
    updatedStates[index] = !updatedStates[index];
    setDayStates(updatedStates);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    return `${d.getFullYear()}-${month}-${day}`;
  };

  const formatTime = (date) => {
    const hours = `${date.getHours()}`.padStart(2, "0");
    const minutes = `${date.getMinutes()}`.padStart(2, "0");
    const seconds = `${date.getSeconds()}`.padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleSubmit = () => {
    const data = {
      name: title,
      recruitmentEndDate: formatDate(endDate),
      startTime: formatTime(startTime),
      endTime: formatTime(endTime),
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      totalApplicants: minPeople,
      isRepeatedDate: isRepetition,
      repeatedDays: dayStates,
      detailInfo: "",
      timeExits: isTimeSelect,
    };

    console.log(data);
    navigate("./detail", { state: data });
  };

  return (
    <div className="volunteer-info-container">
      <input
        className="volunteer-title-input"
        placeholder="봉사 제목을 입력하세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="cycle-select-container">
        <span>반복 설정</span>
        <select
          className="cycle-select"
          value={isRepetition}
          onChange={(e) => setIsRepetition(e.target.value === "true")}
        >
          <option value={true}>반복 설정</option>
          <option value={false}>반복 없음</option>
        </select>
      </div>

      <label>일정을 반복할 요일을 선택해주세요.</label>
      <div className="cycle-date-select-container">
        {days.map((day, index) => (
          <button
            className={`cycle-date-select-btn ${
              dayStates[index] ? "active" : ""
            }`}
            key={index}
            onClick={() => handleButtonClick(index)}
          >
            {day}
          </button>
        ))}
      </div>

      <label>종료일은 현재로부터 3개월 이내만 가능합니다.</label>
      <div className="volunteer-period-container">
        <span className="volunteer-period-title">봉사 기간</span>
        <div className="volunteer-start-date-container">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
            />
          </LocalizationProvider>
        </div>
        <span className="wave">~</span>
        <div className="volunteer-end-date-container">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
            />
          </LocalizationProvider>
        </div>
      </div>

      <div className="volunteer-time-container">
        <span>봉사 시간</span>
        <div className="volunteer-start-time-container">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              value={startTime}
              onChange={(newValue) => {
                setStartTime(newValue);
              }}
            />
          </LocalizationProvider>
        </div>
        <span className="wave">~</span>
        <div className="volunteer-end-time-container">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              value={endTime}
              onChange={(newValue) => {
                setEndTime(newValue);
              }}
            />
          </LocalizationProvider>
        </div>
      </div>

      <div className="is-time-select-container">
        <button
          type="button"
          className={`is-time-select-btn ${isTimeSelect ? "active" : ""}`}
          onClick={() => {
            setIsTimeSelect(!isTimeSelect);
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
        <span className="check-btn">시간 선택 안 함</span>
      </div>

      <div className="volunteer-number-of-people-container">
        <div className="volunteer-min-people-input-container">
          <input
            type="number"
            placeholder="0"
            value={minPeople}
            onChange={(e) => setMinPeople(parseInt(e.target.value))}
          />
          <span>명</span>
        </div>
      </div>

      <div className="only-adult-check-container">
        <button
          type="button"
          className={`is-only-adult-btn ${isOnlyAdult ? "active" : ""}`}
          onClick={() => {
            setIsOnlyAdult(!isOnlyAdult);
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
        <span>성인만 신청 가능</span>
      </div>
      <button onClick={handleSubmit} className="volunteer-detail-nav-btn">
        다음
      </button>
    </div>
  );
};

export default VolunteerInfo;
