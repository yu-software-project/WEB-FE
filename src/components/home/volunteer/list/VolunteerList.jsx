import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";
import { getVolunteerListBySearch } from "services/home/volunteer";

const VolunteerList = ({ searchKeyword }) => {
  const [boardData, setBoardData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const navigate = useNavigate();

  const getList = async (page, searchKeyword) => {
    const tmp = {
      recruitmentName: searchKeyword,
    };
    const response = await getVolunteerListBySearch(tmp);
    const data = response;

    const formattedData = data.recruitments.map((item) => ({
      id: item.id,
      title: item.name,
      period: `${item.recruitmentStartDate} ~ ${item.recruitmentEndDate}`,
      status: `${item.currentApplicants} / ${item.totalApplicants}`,
      views: `조회수${item.view}`,
      originalData: item,
    }));

    setBoardData(formattedData);
    setTotalItemsCount(data.totalElements);
  };

  useEffect(() => {
    if (searchKeyword != null) {
      getList(page, searchKeyword);
    }
  }, [page, searchKeyword]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const routeToDetailPage = (item) => {
    navigate(`../view/info?id=${item.id}`, {
      state: { recruitment: item.originalData },
    });
  };

  const routeToRecruitStatePage = (item) => {
    navigate(`/home/volunteer/view/manage?id=${item.id}`);
  };

  const navigateManagePage = (item) => {
    navigate(`/home/volunteer/view/manage?id=${item.id}`);
  };

  return (
    <div className="volunteer-list-container">
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>공고 제목</th>
            <th>봉사 기간</th>
            <th>모집현황</th>
            <th></th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {boardData.map((item, index) => (
            <tr key={item.id}>
              <td>{(page - 1) * 10 + index + 1}</td>
              <td
                className="volunteer-title"
                onClick={() => routeToDetailPage(item)}
              >
                {item.title}
              </td>
              <td>{item.period}</td>
              <td
                className="volunteer-period"
                onClick={() => routeToRecruitStatePage(item.id)}
              >
                {item.status}
              </td>
              <td>
                <button
                  className="navigation-btn"
                  onClick={() => {
                    navigateManagePage(item);
                  }}
                >
                  지원자 관리
                </button>
              </td>
              <td>{item.views}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="page-navigation-container">
        <Pagination
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={10}
          prevPageText={"< 이전"}
          nextPageText={"다음 >"}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default VolunteerList;
