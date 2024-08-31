import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <div className=" w-fit h-screen bg-[#015496] p-2 flex flex-col gap-3">
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/admin/service-management"}>Service</NavLink>
      <NavLink to={"/admin/user-booking"}>Booking</NavLink>
      <NavLink to={"/admin/user-management"}>User</NavLink>
    </div>
  );
};

export default AdminNav;
