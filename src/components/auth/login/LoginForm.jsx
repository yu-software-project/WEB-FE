import { useState } from "react";
import { Form } from "react-router-dom";
import "styles/auth/login/LoginForm.scss";

const LoginForm = ({ myEmail }) => {
  const [email, setEmail] = useState(myEmail || "");
  const [password, setPassword] = useState("");

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
        </div>
        <button type="submit" className="login-btn">
          로그인
        </button>
      </div>
    </Form>
  );
};

export default LoginForm;
