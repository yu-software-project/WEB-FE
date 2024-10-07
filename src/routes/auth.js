import CenterInfoPage from "pages/auth/CenterInfoPage";
import CeoInfoPage, { action as ceoInfoAction } from "pages/auth/CeoInfoPage";
import LoginPage, {
  action as loginAction,
  loader as loginLoader,
} from "pages/auth/LoginPage";
import RegisterPage, {
  action as centerInfoAction,
  loader as registerLoader,
} from "pages/auth/RegisterPage";
import WaitPage from "pages/auth/WaitPage";

const auth = [
  {
    index: true,
    element: <LoginPage />,
    loader: loginLoader,
    action: loginAction,
  },
  {
    path: "register",
    element: <RegisterPage />,
    loader: registerLoader,
    action: centerInfoAction,
    children: [
      {
        index: true,
        element: <CenterInfoPage />,
      },
      {
        path: "ceoinfo",
        element: <CeoInfoPage />,
        action: ceoInfoAction,
      },
      {
        path: "wait",
        element: <WaitPage />,
      },
    ],
  },
];

export default auth;
