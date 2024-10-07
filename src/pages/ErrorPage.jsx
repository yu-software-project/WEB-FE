import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  let message = "요청한 페이지를 찾을 수 없습니다.";

  if (error.status === 500) {
    message = error.data;
  }

  if (error.status === 404) {
    message = error.data;
  }
  return (
    <>
      <h1>Oops</h1>
      <p>{message}</p>
    </>
  );
};

export default ErrorPage;
