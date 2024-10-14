import banner from "assets/banner.png";
import Home from "components/home/Home";
import "styles/home/HomePage.scss";
const HomePage = () => {
  return (
    <div className="homepage-content-container">
      <img className="banner-image" src={banner} alt="banner" />
      <Home />
    </div>
  );
};

export default HomePage;
