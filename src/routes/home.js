import HomeLayout, { loader as tokenLoader } from "pages/home/HomeLayout";

const home = [
  {
    path: "home",
    element: <HomeLayout />,
    loader: tokenLoader,
    children: [
      {
        index: true,
      },
    ],
  },
];

export default home;
