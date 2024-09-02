import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { logOut } from "../redux/feature/auth/authSlice";
import ImmediateNextSlot from "../components/Dashboard/User/ImmediateNextSlot";
import { MdOutlineMenu } from "react-icons/md";

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
  const [openNav, setOpenNave] = useState(false);
  return (
    <div className="">
      <div
        className={`md:flex items-center justify-evenly text-white transition-colors hidden  ${
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
                {user?.role === "admin" ? (
                  <Link to={"/admin/service-management"}>Dashboard</Link>
                ) : (
                  <Link to={"/user/Profile"}>Dashboard</Link>
                )}
              </div>
            )}
          </div>
          <ImmediateNextSlot />
        </div>
      </div>
      <div className={`md:hidden fixed flex items-center justify-between top-0 w-full  ${
          pathname == "/" && "duration-300"
        } ${
          pathname !== "/" || scroll >= 80
            ? "bg-[#015496] "
            : "bg-transparent"
        }`}>
        <img className="" src={logo} alt="" />
        <span onClick={() => setOpenNave(true)}>
          <MdOutlineMenu />
        </span>
      </div>
      {/* --------------------- sm --------------------- */}
      {openNav && (
        <div className="md:hidden w-[30%] h-screen bg-[#015496] py-14 px-2 text-white">
          <h1 onClick={() => setOpenNave(false)}>X</h1>
          <div className="flex flex-col">
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
                  {user?.role === "admin" ? (
                    <Link to={"/admin/service-management"}>Dashboard</Link>
                  ) : (
                    <Link to={"/user/Profile"}>Dashboard</Link>
                  )}
                </div>
              )}
            </div>
            <ImmediateNextSlot />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
