import { create } from "zustand";

export const userToken = create((set) => ({
  accessToken: "",
  setAccessToken: (newToken) => set({ accessToken: newToken }),
}));

export const CenterInfoController = create((set) => ({
  certificateFile: null,
  centerInfo: {
    ceoName: "",
    centerName: "",
    phoneNum: "",
    roadAddress: "",
    detailAddress: "",
  },
  setBusinessFile: (file) => set({ certificateFile: file }),
  setCenterInfo: (centerInfo) => set({ centerInfo }),
}));
