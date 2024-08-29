import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <div className=" w-fit h-screen bg-[#015496] p-2">
      <NavLink to={'/admin/service-management'}>Service</NavLink>
    </div>
  );
};

export default AdminNav;
