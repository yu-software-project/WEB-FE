import { useState } from "react";
import { Form } from "react-router-dom";
import "styles/auth/login/LoginForm.scss";

const LoginForm = ({ myEmail }) => {
  const [email, setEmail] = useState(myEmail || "");
  const [password, setPassword] = useState("");
  const [isManager, setIsManager] = useState(false);
  console.log(isManager);

  return (
    <Form method="post">
      <div className="login-form-container">
        <div className="login-input-container">
          <div className="login-email-container">
            <input
              className="login-email-form"
              name="email"
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="login-password-container">
            <input
              className="login-password-form"
              name="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="manager-login-container">
            <label className="toggle-button-label">
              <input
                type="checkbox"
                name="isManager"
                value={isManager}
                checked={isManager}
                onChange={() => setIsManager(!isManager)}
                className="toggle-button-input"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className={isManager ? "checked" : ""}
              >
                <path d="M9 19l-7-7 1.41-1.41L9 16.17l11.29-11.29 1.41 1.41z" />
              </svg>
              <span>관리자용 로그인</span>
            </label>
          </div>
        </div>
        <button type="submit" className="login-btn">
          로그인
        </button>
      </div>
    </Form>
  );
};

export default LoginForm;
