import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";

const Navbar = () => {
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
  return (
    <div className="">
      <div
        className={`flex items-center justify-evenly text-white transition-colors duration-300 ${
            scroll >= 80 ? "bg-[#015496] p-2" : "bg-transparent"
          }`}
      >
        <img className="" src={logo} alt="" />
        <div className="flex items-center gap-x-5">
          <NavLink
            className={({ isActive }) =>
              `${isActive ? "text-[#FFAF00]" : ""} hover:text-red-500`
            }
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${isActive ? "text-[#FFAF00]" : ""} hover:text-red-500`
            }
            to={"ss"}
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${isActive ? "text-[#FFAF00]" : ""} hover:text-red-500`
            }
            to={"s"}
          >
            Contact
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${isActive ? "text-[#FFAF00]" : ""} hover:text-red-500`
            }
            to={"w"}
          >
            Services
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${isActive ? "text-[#FFAF00]" : ""} hover:text-red-500`
            }
            to={"w"}
          >
            Booking
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${isActive ? "text-[#FFAF00]" : ""} hover:text-red-500`
            }
            to={"w"}
          >
            Sing in
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${isActive ? "text-[#FFAF00]" : ""} hover:text-red-500`
            }
            to={"w"}
          >
            Sing up
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
