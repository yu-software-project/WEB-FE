const DetailName = ({ path }) => {
  let content1, content2;
  switch (path) {
    case "greeting":
      content1 = "인사말";
      content2 = "연혁";
      break;
    case "introduction":
      content1 = "시설규모";
      content2 = "시설 사진";
      break;
    case "route-info":
      content1 = "기관 주소";
      content2 = "찾아오는 길";
      break;
    default:
      content1 = "";
  }
  return (
    <div className="facility-detail-name-container">
      <div className="content1">{content1}</div>
      <div className="content2">{content2}</div>
    </div>
  );
};

export default DetailName;
