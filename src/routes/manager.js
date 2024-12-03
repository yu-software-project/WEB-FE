import Approve from "components/manager/Approve";
import ManagerLayout from "pages/manager/ManagerLayout";
import ManagerPage from "pages/manager/ManagerPage";

const manager = [
  {
    path: "manager",
    element: <ManagerLayout />,
    children: [
      {
        index: true,
        element: <ManagerPage />,
      },
      {
        path: "approve",
        element: <Approve />,
      },
    ],
  },
];

export default manager;
