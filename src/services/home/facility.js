import axios from "axios";
import { SERVER_IP } from "constants/api";
import { userToken } from "store/auth";

/**
 * auth API 요청 Interface
 * @param {String} url 통신 URI
 * @param {String} data 입력 데이터
 * @param {String} params 쿼리 데이터
 * @returns 응답 객체
 */
const facilityAPIInterface = async (
  method,
  url,
  data = {},
  params = null,
  contentType = "application/json"
) => {
  const { accessToken } = userToken.getState();
  try {
    const res = await axios({
      method: method,
      url: `${SERVER_IP}/${url}`,
      data: method === "get" ? {} : data,
      params: method === "get" ? data : {},
      headers: {
        "Content-Type": contentType,
        Authorization: `Bearer ${accessToken}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });

    return res;
  } catch (e) {
    console.error("error : ", e);
    return e; // 임시
  }
};

const requestFacilityData = async (data) => {
  console.log(data);
  const res = await facilityAPIInterface(
    "get",
    "get/facility/size/and/ficture",
    data
  );
  return res.data;
};

const requestFacilityScaleUpdate = async (data) => {
  console.log(data);
  const res = await facilityAPIInterface(
    "post",
    "api/facility/floorSize/create",
    data
  );
  console.log(res);
  return res;
};

function base64ToBlob(base64, mimeType) {
  try {
    const base64WithoutPrefix = base64.includes(",")
      ? base64.split(",")[1]
      : base64;
    const bytes = window.atob(base64WithoutPrefix);
    let array = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) {
      array[i] = bytes.charCodeAt(i);
    }
    return new Blob([array], { type: mimeType });
  } catch (error) {
    console.error("Failed to convert base64 to Blob:", error);
    return null;
  }
}

async function urlToBase64(url) {
  const response = await fetch(url, { mode: "cors" });
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

const requestFacilityPictureApi = async (floorDataArray, mode) => {
  console.log(floorDataArray);
  console.log(mode);
  let formData = new FormData();
  const updateFloorPictureDto = [];
  const dtoName =
    mode === "create" ? "CreateFloorPictureDto" : "UpdateFloorPictureDto";

  for (const floorData of floorDataArray) {
    for (let index = 0; index < floorData.images.length; index++) {
      const image = floorData.images[index];
      const purpose = floorData.purpose[index];
      const imageName = floorData.imageNames[index];
      if (image && purpose) {
        updateFloorPictureDto.push({
          floor: floorData.floorNumber,
          purpose: purpose,
          imageIndex: index,
          imageName: imageName,
        });

        let imageBlob = null;
        if (image.startsWith("data:image")) {
          imageBlob = base64ToBlob(image, "image/png");
        } else if (image.startsWith("http")) {
          const base64Image = await urlToBase64(image);
          imageBlob = base64ToBlob(base64Image, "image/png");
        }

        if (imageBlob) {
          console.log(imageBlob);
          formData.append("FloorPictureFile", imageBlob, imageName);
        } else {
          console.error("Failed to convert image to Blob for", imageName);
        }
      }
    }
  }

  console.log(updateFloorPictureDto);
  const json = JSON.stringify(updateFloorPictureDto);
  const blob = new Blob([json], { type: "application/json" });
  formData.append(dtoName, blob);
  const method = mode === "create" ? "post" : "put";
  const res = await facilityAPIInterface(
    method,
    `api/facility/floorPicture/${mode}`,
    formData,
    null,
    "multipart/form-data"
  );
  console.log(res);
  return res;
};

export {
  requestFacilityData,
  requestFacilityScaleUpdate,
  requestFacilityPictureApi,
};
