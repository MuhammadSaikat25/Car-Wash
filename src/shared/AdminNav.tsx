import { NavLink } from "react-router-dom";

const AdminNav = () => {

  
  return (
    <div className=" w-fit h-screen bg-[#015496] p-2 flex flex-col gap-3 text-white">
      <NavLink
        className={({ isActive }) => (isActive ? "text-orange-400" : "")}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "text-orange-400" : "")}
        to="/admin/service-management"
      >
        Service
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "text-orange-400" : "")}
        to="/admin/user-booking"
      >
        Booking
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "text-orange-400" : "")}
        to="/admin/user-management"
      >
        User
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "text-orange-400" : "")}
        to="/admin/manage-slot"
      >
        Slot
      </NavLink>
    </div>
  );
};

export default AdminNav;
