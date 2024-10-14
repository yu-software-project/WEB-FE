import { useEffect, useState } from "react";
import { requestFacilityScaleUpdate } from "services/home/facility";
import "styles/home/facility/FacilityScaleTable.scss";

const FacilityScaleTable = ({ floorSizeList }) => {
  const placeholders = [
    "층수",
    "m^2",
    "숙소 101호, 102호(12인실 2개소), 소회의실, 창고 등 시설 용도",
    "완공 예정 시기 등 추가정보",
  ];

  // Initialize state with floorSizeList
  const [tableData, setTableData] = useState([
    ["층수", "면적", "주요실(용도)", "비고"],
  ]);

  useEffect(() => {
    const initialData = floorSizeList.map(
      ({ floor, area, purpose, remark }) => [
        floor || "",
        area || "",
        purpose || "",
        remark || "",
      ]
    );
    setTableData((prevData) => [...prevData, ...initialData]);
  }, [floorSizeList]);

  const addRow = () => {
    const newRow = new Array(4).fill("");
    setTableData([...tableData, newRow]);
  };

  const handleChange = (i, j, event) => {
    const newData = [...tableData];
    newData[i][j] = event.target.value;
    setTableData(newData);
  };

  const facilityScaleUpdate = async () => {
    const facilityScale = tableData.slice(1);
    const facilityScaleDto = facilityScale.map((row, index) => ({
      floor: row[0] || "",
      area: Number(row[1]) || 0,
      purpose: row[2] || "",
      remark: row[3] || "",
      displayIndex: index, // displayIndex 추가
    }));
    const res = await requestFacilityScaleUpdate(facilityScaleDto);
    console.log(res);
    if (res.status === 200) alert("변경사항이 성공적으로 저장되었습니다.");
    else alert("오류 발생");
  };

  return (
    <>
      <div className="scale-table-controll-container">
        <span className="scale-tool-tip">
          간단한 층별 시설 소개를 해주세요.
        </span>
        <table className="table-container">
          <tbody className="table-body">
            {tableData.map((row, i) => (
              <tr className={`table-row ${i === 0 ? "first-row" : ""}`} key={i}>
                {row.map((cell, j) => (
                  <td className={`table-col ${j === 2 ? "majar" : ""}`} key={j}>
                    <input
                      type="text"
                      placeholder={placeholders[j]}
                      value={cell}
                      onChange={(event) => handleChange(i, j, event)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="button" className="scale-floor-add-btn" onClick={addRow}>
        층수 추가+
      </button>
      <button
        type="button"
        className="facility-scale-submit-btn"
        onClick={facilityScaleUpdate}
      >
        변경사항 저장
      </button>
    </>
  );
};

export default FacilityScaleTable;
