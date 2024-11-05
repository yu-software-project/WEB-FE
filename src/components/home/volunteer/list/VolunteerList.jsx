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
    const data2 = {
      recruitments: [
        {
          id: 1,
          name: "Basic Yoga Class",
          recruitmentStartDate: "2024-11-01",
          recruitmentEndDate: "2024-11-07",
          startTime: {
            hour: 9,
            minute: 0,
            second: 0,
            nano: 0,
          },
          endTime: {
            hour: 10,
            minute: 30,
            second: 0,
            nano: 0,
          },
          startDate: "2024-11-10",
          endDate: "2024-12-31",
          repeatedDays: {
            sunday: false,
            monday: true,
            tuesday: false,
            wednesday: true,
            thursday: false,
            friday: true,
            saturday: false,
          },
          view: 125,
          totalApplicants: 30,
          currentApplicants: 10,
          detailInfo:
            "A yoga class for beginners, held every Monday, Wednesday, and Friday.",
          recruitmentWaitings: [
            {
              id: 1,
              recruitmentDates: ["2024-11-10", "2024-11-12"],
            },
          ],
          timeExits: true,
          repeatedDate: true,
        },
        {
          id: 2,
          name: "Advanced Coding Bootcamp",
          recruitmentStartDate: "2024-11-05",
          recruitmentEndDate: "2024-12-01",
          startTime: {
            hour: 18,
            minute: 0,
            second: 0,
            nano: 0,
          },
          endTime: {
            hour: 20,
            minute: 0,
            second: 0,
            nano: 0,
          },
          startDate: "2024-12-05",
          endDate: "2025-01-15",
          repeatedDays: {
            sunday: false,
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: false,
          },
          view: 300,
          totalApplicants: 100,
          currentApplicants: 75,
          detailInfo:
            "An intensive bootcamp for advanced coding skills, held on weekdays.",
          recruitmentWaitings: [
            {
              id: 2,
              recruitmentDates: ["2024-12-05", "2024-12-06", "2024-12-07"],
            },
          ],
          timeExits: true,
          repeatedDate: true,
        },
      ],
      totalElements: 2,
      totalPages: 1,
    };
    const formattedData = data2.recruitments.map((item) => ({
      id: item.id,
      title: item.name,
      period: `${item.recruitmentStartDate} ~ ${item.recruitmentEndDate}`,
      status: `${item.currentApplicants} / ${item.totalApplicants}`,
      views: `조회수${item.view}`,
      originalData: item,
    }));

    setBoardData(formattedData);
    setTotalItemsCount(data2.totalElements);
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

  const routeToRecruitStatePage = (id) => {
    navigate(`/home/volunteer/view/manage?id=${id}`);
  };

  const navigateManagePage = (id) => {
    navigate(`/home/volunteer/view/manage?id=${id}`);
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
