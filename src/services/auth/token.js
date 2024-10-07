import axios from "axios";
import { SERVER_IP } from "constants/api";

const reissueToken = async (refreshToken) => {
  try {
    const res = await axios.post(
      `${SERVER_IP}/auth/update/access/token`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    return res;
  } catch (e) {
    console.error("emergency : ", e);
  }
};

export { reissueToken };
