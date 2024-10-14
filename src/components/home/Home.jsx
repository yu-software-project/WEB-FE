const Home = () => {
  const arr = [
    "가장 가까운 봉사",
    "대기자 수",
    "누적 봉사자 수",
    "팔로워 수",
    "누적 공지글 수",
  ];
  const arr2 = ["3/16(목) 중등반 교육 봉사", "60", "78502", "3", "20"];
  return (
    <div className="homepage-statistics-container">
      <div className="home-statistics-content-container">
        {Array(8)
          .fill()
          .map((_, index) => (
            <div className="cell" key={index}>
              <span>{arr[index] || ""}</span>
              <span className="statistics-data">{arr2[index] || ""}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
