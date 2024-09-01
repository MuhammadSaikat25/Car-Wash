import { NavLink } from "react-router-dom";

const UserNav = () => {
  return (
    <div className=" w-fit h-screen bg-[#015496] p-2 flex flex-col gap-3">
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/user/profile"}>Profile</NavLink>
      <NavLink to={"/user/booking"}>My Booking</NavLink>
    </div>
  );
};

export default UserNav;
