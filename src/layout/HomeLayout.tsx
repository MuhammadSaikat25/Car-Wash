import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { useEffect, useState } from "react";
import { FaLongArrowAltUp } from "react-icons/fa";

const HomeLayout = () => {
  const [scroll, setScroll] = useState(0);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed top-0 w-full z-10">
        <Navbar />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Outlet />
        <Footer />
        <div className={`${scroll >= 200 && "fixed bottom-1 right-2"}`}>
          <button
            className="bg-red-500 w-[40px] h-[40px] rounded-full relative mx-auto"
            onClick={scrollTop}
          >
            <FaLongArrowAltUp className="absolute top-[28%] text-white left-[26%]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
