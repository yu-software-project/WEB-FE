import Greeting from "components/home/facility/Greeting";
import { useLoaderData } from "react-router-dom";
import { getGreetingPage } from "services/home/greeting";
import "styles/home/HomePage.scss";

const GreetingPage = () => {
  const { greeting, facilityHistory } = useLoaderData();
  console.log(greeting);
  console.log(facilityHistory);

  return (
    <Greeting greetingLoaderData={greeting} facilityHistory={facilityHistory} />
  );
};

export default GreetingPage;

export const loader = async () => {
  // 인사말, 연혁 데이터 로드
  const greetingLoadData = await getGreetingPage();
  //const greeting = greetingLoadData.greeting.memo;
  //const facilityHistory = greetingLoadData.decadeYearList;
  console.log(greetingLoadData);
  const greeting = "hi";
  const facilityHistory = [];

  return { greeting, facilityHistory };
};
