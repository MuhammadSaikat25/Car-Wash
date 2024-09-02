import { Link } from "react-router-dom";
import err from "../assets/error.png";
const NotFound = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="">
        <img src={err} alt="" />
        <p className="text-center text-2xl font-semibold">
          OooPs! Page Not Found
        </p>
        <div className="w-fit mx-auto mt-3">
          <Link
            className="bg-yellow-700 text-white hover:bg-black hover:text-white duration-300 p-1 rounded-sm "
            to={"/"}
          >
            {" "}
            BACK TO HOME
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
