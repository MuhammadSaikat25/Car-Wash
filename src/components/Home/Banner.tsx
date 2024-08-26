import banner from "../../assets/banner.jpg";
import img from "../../assets/Ellipse.png";
import asset from "../../assets/Asset.png";

const Banner = () => {
  return (
    <div className="relative">
      <img className="lg:h-fit h-[400px] object-fill" src={banner} alt="" />
      <img className="absolute lg:top-20" src={img} alt="" />
      {/* -------------- text --------------- */}
      <div className="absolute top-[20%] left-5 lg:top-[35%] lg:left-[10%]">
        <div className="text-white md:text-4xl lg:text-7xl font-bold">
          <p>Best Car Service in</p>
          <p>The World</p>
        </div>
        <div className="text-white font-semibold md:text-2xl  md:my-5">
          <p className="my-1">Say Goodbye to Dirty Cars:</p>
          <p>
            Seamlessly Book a Professional{" "}
            <span className="text-black md:text-white lg:text-black">
              Wash in Minutes
            </span>
          </p>
        </div>
        {/* -------------- btn------------ */}
        <div
          className="w-[120px] h-[40px] bg-red-700 relative left-[30%] top-10 md:left-[80%] bg-cover bg-center rounded-md"
          style={{ backgroundImage: `url(${asset})` }}
        >
          <button className="absolute top-[7px] left-[14px] text-white">
            Book Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
