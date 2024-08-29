import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { logOut } from "../redux/feature/auth/authSlice";
const Navbar = () => {
  const [scroll, setScroll] = useState(0);
  const { pathname } = useLocation();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);
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
        className={`flex items-center justify-evenly text-white transition-colors ${
          pathname == "/" && "duration-300"
        } ${
          pathname !== "/" || scroll >= 80
            ? "bg-[#015496] p-2"
            : "bg-transparent"
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
            to={"/service"}
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
          <div className="relative cursor-pointer ">
            {user ? (
              <FaRegUserCircle size={20} onClick={() => setModal(!modal)} />
            ) : (
              <div className="flex items-center gap-x-2">
                <NavLink
                  className={({ isActive }) =>
                    `${isActive ? "text-[#FFAF00]" : ""} hover:text-red-500`
                  }
                  to={"/sing-in"}
                >
                  Sing in
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `${isActive ? "text-[#FFAF00]" : ""} hover:text-red-500`
                  }
                  to={"/sing-up"}
                >
                  Sing up
                </NavLink>
              </div>
            )}
            {modal && (
              <div className="absolute top-10  right-0 bg-[#E8B86D] p-2 rounded text-gray-600 font-semibold">
                <button
                  onClick={() => {
                    dispatch(logOut());
                    setModal(false);
                  }}
                >
                  Logout
                </button>
                <Link to={"/admin/hero"}>Dashboard</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
