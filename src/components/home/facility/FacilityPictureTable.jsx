import pictureSelect from "assets/pictureSelect.png";
import { useEffect, useState } from "react";
import { requestFacilityPictureApi } from "services/home/facility";
import "styles/home/facility/FacilityPictureTable.scss";

// URL 이미지를 Base64로 변환하는 함수
const urlToBase64 = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const FacilityPictureTable = ({ floorPictureClusterList }) => {
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [floors, setFloors] = useState([]);
  console.log(floors);

  useEffect(() => {
    const fetchInitialData = async () => {
      const initialData = await Promise.all(
        floorPictureClusterList.map(async ({ floor, floorPictureList }) => {
          const images = await Promise.all(
            Array(4)
              .fill(null)
              .map(async (_, index) => {
                const picture = floorPictureList[index];
                if (picture && picture.pictureUrl) {
                  return await urlToBase64(picture.pictureUrl);
                }
                return null;
              })
          );

          const purposes = Array(4)
            .fill("")
            .map((_, index) => {
              return floorPictureList[index]
                ? floorPictureList[index].purpose || ""
                : "";
            });

          const imageNames = Array(4)
            .fill("")
            .map((_, index) => {
              return floorPictureList[index] &&
                floorPictureList[index].pictureUrl
                ? floorPictureList[index].pictureUrl.split("/").pop()
                : "";
            });

          return {
            floorNumber: floor,
            images,
            purpose: purposes,
            imageNames,
          };
        })
      );
      setFloors(initialData);
    };

    fetchInitialData();
  }, [floorPictureClusterList]);

  const addFloor = () => {
    setCreateMode(true);
    const newFloor = {
      floorNumber: "",
      images: [null, null, null, null],
      purpose: ["", "", "", ""],
      imageNames: ["", "", "", ""],
    };
    setFloors([...floors, newFloor]);
  };

  const handleFileChange = (img, floorIndex, imgIndex, event) => {
    if (img && !editMode) return;
    if (!img && !editMode) setCreateMode(true);
    if (!img && editMode) return;

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedFloors = floors.map((floor, i) => {
          if (i === floorIndex) {
            const updatedImages = [...floor.images];
            updatedImages[imgIndex] = e.target.result;
            const updatedImageNames = [...floor.imageNames];
            updatedImageNames[imgIndex] = file.name;

            return {
              ...floor,
              images: updatedImages,
              imageNames: updatedImageNames,
            };
          }
          return floor;
        });
        setFloors(updatedFloors);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (index, type, value, subIndex) => {
    const updatedFloors = floors.map((floor, i) => {
      if (i === index) {
        if (type === "floorNumber") {
          return { ...floor, floorNumber: parseInt(value, 10) || "" };
        } else if (type === "purpose") {
          const updatedPurpose = [...floor.purpose];
          updatedPurpose[subIndex] = value;
          return { ...floor, purpose: updatedPurpose };
        }
      }
      return floor;
    });
    setFloors(updatedFloors);
  };

  return (
    <>
      <div className="picture-table-controll-container">
        <span className="facility-picture-tool-tip">
          층별 시설 사진을 해주세요.
        </span>
        <table className="table-header-container">
          <tbody>
            <tr>
              <td>층수</td>
              <td>시설1</td>
              <td>시설2</td>
              <td>시설3</td>
              <td>시설4</td>
            </tr>
          </tbody>
        </table>
        {floors.map((floor, index) => (
          <table className="table-container" key={index}>
            <tbody>
              <tr className="row-table">
                <td>
                  <input
                    type="number"
                    value={floor.floorNumber}
                    onChange={(e) =>
                      handleChange(index, "floorNumber", e.target.value)
                    }
                  />
                </td>
                {floor.images.map((img, imgIndex) => (
                  <td key={imgIndex}>
                    <label
                      htmlFor={`image-upload-${index}-${imgIndex}`}
                      className="image-upload-btn"
                    >
                      <input
                        name="image-upload"
                        className="image-input"
                        type="file"
                        id={`image-upload-${index}-${imgIndex}`}
                        accept="image/*"
                        onChange={(e) =>
                          handleFileChange(img, index, imgIndex, e)
                        }
                      />
                      <img
                        src={img ? img : pictureSelect}
                        alt="프로필 이미지"
                      />
                    </label>
                  </td>
                ))}
              </tr>
              <tr>
                <td>용도</td>
                {floor.purpose.map((purpose, purposeIndex) => (
                  <td key={purposeIndex}>
                    <input
                      type="text"
                      value={purpose}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "purpose",
                          e.target.value,
                          purposeIndex
                        )
                      }
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        ))}
      </div>
      <button
        type="button"
        className="picture-floor-add-btn"
        onClick={addFloor}
      >
        층수 추가+
      </button>
      {!createMode && !editMode && (
        <button
          type="button"
          className="facility-picture-submit-btn"
          onClick={() => {
            setEditMode(true);
          }}
        >
          수정
        </button>
      )}

      {!createMode && editMode && (
        <button
          type="button"
          className="facility-picture-submit-btn"
          onClick={() => {
            requestFacilityPictureApi(floors, "update");
            setEditMode(false);
          }}
        >
          수정완료
        </button>
      )}

      {createMode && !editMode && (
        <button
          type="button"
          className="facility-picture-submit-btn"
          onClick={() => {
            requestFacilityPictureApi(floors, "create");
            setCreateMode(false);
          }}
        >
          저장
        </button>
      )}
    </>
  );
};

export default FacilityPictureTable;
