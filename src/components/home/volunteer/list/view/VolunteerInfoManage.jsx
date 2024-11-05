import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const VolunteerInfoManage = () => {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const location = useLocation();
  const recruitment = location.state?.recruitment;

  const [dayStates, setDayStates] = useState(
    new Array(days.length).fill(false)
  );
  const [isRepetition, setIsRepetition] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isOnlyAdult, setIsOnlyAdult] = useState(false);
  const [isTimeSelect, setIsTimeSelect] = useState(false);
  const [totalApplicants, setTotalApplicants] = useState(0);

  useEffect(() => {
    if (recruitment) {
      setStartDate(recruitment.startDate);
      setEndDate(recruitment.endDate);
      setStartTime(new Date(`1970-01-01T${recruitment.startTime}`));
      setEndTime(new Date(`1970-01-01T${recruitment.endTime}`));
      setDayStates(Object.values(recruitment.repeatedDays));
      setIsRepetition(recruitment.repeatedDate);
      setIsTimeSelect(!recruitment.timeExits);
      setIsOnlyAdult(recruitment.isOnlyAdult || false);
      setTotalApplicants(recruitment.totalApplicants || 0);
    }
  }, [recruitment]);

  const handleButtonClick = (index) => {
    const updatedStates = [...dayStates];
    updatedStates[index] = !updatedStates[index];
    setDayStates(updatedStates);
  };

  const updatedRecruitment = {
    ...recruitment,
    startDate,
    endDate,
    startTime: startTime ? startTime.toTimeString().split(" ")[0] : null,
    endTime: endTime ? endTime.toTimeString().split(" ")[0] : null,
    repeatedDays: {
      sunday: dayStates[6],
      monday: dayStates[0],
      tuesday: dayStates[1],
      wednesday: dayStates[2],
      thursday: dayStates[3],
      friday: dayStates[4],
      saturday: dayStates[5],
    },
    repeatedDate: isRepetition,
    timeExits: !isTimeSelect,
    isOnlyAdult,
    totalApplicants,
  };

  return (
    <div className="volunteer-info-container">
      <input
        className="volunteer-title-input"
        placeholder="봉사 제목을 입력하세요."
        value={recruitment?.name || ""}
        readOnly
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
            value={totalApplicants}
            onChange={(e) => setTotalApplicants(parseInt(e.target.value, 10))}
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
      <Link
        to={`../detail?id=${recruitment.id}`}
        state={{ recruitment: updatedRecruitment }}
        className="volunteer-detail-nav-btn"
      >
        다음
      </Link>
    </div>
  );
};

export default VolunteerInfoManage;
