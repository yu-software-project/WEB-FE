import HomeLayout, { loader as tokenLoader } from "pages/home/HomeLayout";
import HomePage from "pages/home/HomePage";
import FacilityPage from "pages/home/facility/FacilityPage";
import GreetingPage, {
  loader as greetingLoader,
} from "pages/home/facility/GreetingPage";
import IntroductionPage, {
  loader as facilityLoader,
} from "pages/home/facility/IntroductionPage";
import RouteInfoPage, {
  loader as routeInfoLoader,
} from "pages/home/facility/RouteInfoPage";

const home = [
  {
    path: "home",
    element: <HomeLayout />,
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "facility",
        element: <FacilityPage />,
        children: [
          {
            path: "greeting",
            element: <GreetingPage />,
            loader: greetingLoader,
          },
          {
            path: "introduction",
            element: <IntroductionPage />,
            loader: facilityLoader,
          },
          {
            path: "route-info",
            element: <RouteInfoPage />,
            loader: routeInfoLoader,
          },
        ],
      },
    ],
  },
];

export default home;
