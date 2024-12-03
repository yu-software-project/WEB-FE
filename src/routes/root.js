import ErrorPage from "pages/ErrorPage";
import RootLayout, { loader as tokenLoader } from "pages/RootLayout";
import { createBrowserRouter } from "react-router-dom";
import auth from "routes/auth";
import home from "routes/home";
import manager from "routes/manager";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [...auth, ...home, ...manager],
  },
]);

export default router;
