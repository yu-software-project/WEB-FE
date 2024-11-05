import VolunteerDetailInfoManage from "components/home/volunteer/list/view/VolunteerDetailInfoManage";
import VolunteerInfoManage from "components/home/volunteer/list/view/VolunteerInfoManage";
import VolunteerManage from "components/home/volunteer/list/view/VolunteerManage";
import VolunteerDetailInfo from "components/home/volunteer/upload/VolunteerDetailInfo";
import VolunteerInfo from "components/home/volunteer/upload/VolunteerInfo";
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
import VolunteerLayout from "pages/home/volunteer/VolunteerLayout";
import VolunteerListPage, {
  loader as volunteerListLoader,
} from "pages/home/volunteer/VolunteerListPage";
import VolunteerPage from "pages/home/volunteer/VolunteerPage";
import VolunteerUploadPage from "pages/home/volunteer/VolunteerUploadPage";

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
      {
        path: "volunteer",
        element: <VolunteerLayout />,
        children: [
          {
            path: "view",
            element: <VolunteerPage />,
            children: [
              {
                path: "info",
                element: <VolunteerInfoManage />,
              },
              {
                path: "detail",
                element: <VolunteerDetailInfoManage />,
              },
              {
                path: "manage",
                element: <VolunteerManage />,
              },
            ],
          },

          {
            path: "list",
            element: <VolunteerListPage />,
            loader: volunteerListLoader,
          },
          {
            path: "upload",
            element: <VolunteerUploadPage />,
            children: [
              {
                index: true,
                element: <VolunteerInfo />,
              },
              {
                path: "detail",
                element: <VolunteerDetailInfo />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default home;
