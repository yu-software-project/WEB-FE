import VolunteerList from "components/home/volunteer/list/VolunteerList";
import VolunteerListSearch from "components/home/volunteer/list/VolunteerListSearch";
import VolunteerListTitle from "components/home/volunteer/list/VolunteerListTitle";
import { useState } from "react";
import { getVolunteerList } from "services/home/volunteer";
import "styles/home/volunteer/VolunteerListPage.scss";

const VolunteerListPage = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };
  console.log(searchKeyword);
  return (
    <div className="volunteer-list-page-container">
      <VolunteerListTitle />
      <VolunteerListSearch onSearch={handleSearch} />
      <VolunteerList searchKeyword={searchKeyword} />
    </div>
  );
};

export default VolunteerListPage;

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  const keyword = url.searchParams.get("keyword") || "";
  const response = await getVolunteerList(page, keyword);
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

  return {
    boardData: formattedData,
    totalItemsCount: data2.totalElements,
    page: parseInt(page, 10),
  };
};
