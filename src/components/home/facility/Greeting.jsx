import profile from "assets/profile.png";
import { useEffect, useState } from "react";
import { updateFacilityHistory, updateGreeting } from "services/home/greeting";
import "styles/home/facility/Greeting.scss";

const Greeting = ({ greetingLoaderData, facilityHistory }) => {
  const [decadeSelectors, setDecadeSelectors] = useState([true]);
  const [yearSelectors, setYearSelectors] = useState([[]]);
  const [decades, setDecades] = useState([""]);
  const [years, setYears] = useState([[]]);
  const [inputs, setInputs] = useState([[]]);
  const [greeting, setGreeting] = useState(greetingLoaderData);

  useEffect(() => {
    if (facilityHistory.length > 0) {
      const newDecadeSelectors = facilityHistory.map(() => true);
      const newYearSelectors = facilityHistory.map((facility) =>
        facility.yearList.map(() => true)
      );
      const newDecades = facilityHistory.map((facility) =>
        facility.decadeStartYear.toString()
      );
      const newYears = facilityHistory.map((facility) =>
        facility.yearList.map((year) => year.year.toString())
      );
      const newInputs = facilityHistory.map((facility) =>
        facility.yearList.map((year) => year.memo)
      );

      setDecadeSelectors(newDecadeSelectors);
      setYearSelectors(newYearSelectors);
      setDecades(newDecades);
      setYears(newYears);
      setInputs(newInputs);
    }
  }, [facilityHistory]);

  const addDecadeSelector = () => {
    setDecadeSelectors([...decadeSelectors, true]);
    setYearSelectors([...yearSelectors, []]);
    setDecades([...decades, ""]);
    setYears([...years, []]);
    setInputs([...inputs, []]);
  };

  const addYearSelector = (index) => {
    let newYearSelectors = [...yearSelectors];
    newYearSelectors[index] = [...newYearSelectors[index], true];
    setYearSelectors(newYearSelectors);

    let newYears = [...years];
    newYears[index] = [...newYears[index], ""];
    setYears(newYears);

    let newInputs = [...inputs];
    newInputs[index] = [...newInputs[index], ""];
    setInputs(newInputs);
  };

  const handleDecadeChange = (index, value) => {
    let newDecades = [...decades];
    newDecades[index] = value;
    setDecades(newDecades);

    // 초기 yearSelectors 배열을 빈 배열로 설정
    let newYearSelectors = [...yearSelectors];
    newYearSelectors[index] = [];
    setYearSelectors(newYearSelectors);
  };

  const handleYearChange = (decadeIndex, yearIndex, value) => {
    let newYears = [...years];
    newYears[decadeIndex][yearIndex] = value;
    setYears(newYears);
  };

  const handleInputChange = (decadeIndex, inputIndex, value) => {
    let newInputs = [...inputs];
    newInputs[decadeIndex][inputIndex] = value;
    setInputs(newInputs);
  };

  const handleGreetingSubmit = async () => {
    const greetingDto = {
      memo: greeting,
    };
    const res = await updateGreeting(greetingDto);
    console.log(res);
  };

  const handleHistorySubmit = async () => {
    // 모든 yearList의 최대 displayIndex 계산
    const allYears = facilityHistory.flatMap((facility) => facility.yearList);
    const maxDisplayIndex = Math.max(
      0,
      ...allYears.map((year) => year.displayIndex)
    );

    let displayIndexCounter = maxDisplayIndex + 1;

    const result = decades.map((decade, i) => ({
      decadeStartYear: parseInt(decade),
      yearList: years[i].map((year, j) => {
        const existingYear = facilityHistory[i]?.yearList[j];
        return {
          year: parseInt(year),
          memo: inputs[i][j],
          displayIndex: existingYear
            ? existingYear.displayIndex
            : displayIndexCounter++,
        };
      }),
    }));

    console.log(result);
    const res = await updateFacilityHistory(result);
    console.log(res);
    if (res.status === 200) {
      alert("아 굿~");
    }
  };

  return (
    <div className="greeting-container">
      <div className="greeting-content-container">
        <div className="greeting-image-container">
          <img className="profile-image" src={profile} alt="profile" />
        </div>
        <div className="greeting-message-container">
          <span className="greeting-message-tooltip">
            간단한 인사말을 작성해주세요
          </span>
          <textarea
            className="greeting-message-input"
            type="text"
            placeholder="안녕하세요 아지트입니다."
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
          />
        </div>
        <button
          className="greeting-submit-btn"
          type="button"
          onClick={handleGreetingSubmit}
        >
          변경사항 저장
        </button>
      </div>

      <div className="history-container">
        <div className="history-content-container">
          {decadeSelectors.map((_, index) => (
            <div className="one-decade" key={`decade-${index}`}>
              <div className="decade-container">
                <select
                  className="decade-option"
                  value={decades[index]}
                  onChange={(e) => handleDecadeChange(index, e.target.value)}
                >
                  <option value="">연도 선택</option>
                  {[1980, 1990, 2000, 2010, 2020].map((decade) => (
                    <option key={decade} value={decade}>
                      {decade}~
                    </option>
                  ))}
                </select>
                <button onClick={addDecadeSelector}>추가+</button>
              </div>
              {yearSelectors[index].map((_, i) => (
                <div key={`year-${index}-${i}`}>
                  <select
                    className="year-container"
                    value={years[index][i] || ""}
                    onChange={(e) => handleYearChange(index, i, e.target.value)}
                  >
                    <option value="">연도 선택</option>
                    {Array.from({ length: 10 }, (_, yearIndex) => {
                      const yearOption = parseInt(decades[index]) + yearIndex;
                      return (
                        <option
                          key={`year-option-${index}-${yearOption}`}
                          value={yearOption}
                        >
                          {yearOption}
                        </option>
                      );
                    })}
                  </select>
                  <input
                    className="history-input"
                    type="text"
                    value={inputs[index][i] || ""}
                    onChange={(e) =>
                      handleInputChange(index, i, e.target.value)
                    }
                  />
                </div>
              ))}
              <button
                className="year-add-btn"
                onClick={() => addYearSelector(index)}
              >
                추가+
              </button>
            </div>
          ))}
        </div>
        <button
          className="history-submit-btn"
          type="button"
          onClick={handleHistorySubmit}
        >
          변경사항 저장
        </button>
      </div>
    </div>
  );
};

export default Greeting;
