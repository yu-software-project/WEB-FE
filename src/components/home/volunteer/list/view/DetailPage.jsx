const DetailName = ({ path }) => {
  let content1, content2, content3;
  switch (path) {
    case "info":
      content1 = "봉사 제목";
      content2 = "일정";
      content3 = "모집인원";
      break;
    case "detail":
      content1 = "상세정보";
      content2 = "";
      content3 = "";
      break;
    default:
      content1 = "";
  }
  return (
    <div className="volunteer-upload-detail-name-container">
      <div className="content1">{content1}</div>
      <div className="content2">{content2}</div>
      <div className="content3">{content3}</div>
    </div>
  );
};

export default DetailName;
