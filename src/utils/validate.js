export const checkPassword = (password) => {
  // 패턴: 영문자, 숫자, 특수문자를 포함한 8~16글자
  const pattern =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

  return pattern.test(password);
};
