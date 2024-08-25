import banner from "../../assets/banner.jpg";
import img from "../../assets/Ellipse.png";

const Banner = () => {
  return (
    <div className="relative">
      <img src={banner} alt="" />
      <img className="absolute top-20" src={img} alt="" />
    </div>
  );
};

export default Banner;
