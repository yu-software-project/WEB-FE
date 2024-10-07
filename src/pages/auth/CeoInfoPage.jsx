import CeoInfo from "components/auth/register/CeoInfo";
import { redirect } from "react-router-dom";
import { requestRegister } from "services/auth/auth";
import { CenterInfoController } from "store/auth";

const CeoInfoPage = () => {
  return <CeoInfo />;
};

export default CeoInfoPage;

export const action = async ({ request }) => {
  const data = await request.formData();

  const ceoInfo = {
    email: data.get("ceo-email"),
    emailVerificationCode: data.get("ceo-email-verify-input"),
    phoneNum: data.get("ceo-phone"),
    phoneVerificationCode: data.get("ceo-phone-verify-input"),
    password: data.get("ceo-password"),
  };

  const { certificateFile, centerInfo } = CenterInfoController.getState();
  const registerInfo = {
    centerInfo,
    ceoInfo,
    certificateFile,
  };

  console.log(registerInfo);
  const res = await requestRegister(registerInfo);
  if (res === 200) {
    return redirect("/register/wait");
  }
  alert("회원가입중 오류가 발생하였습니다.");
  return redirect("/");
};
