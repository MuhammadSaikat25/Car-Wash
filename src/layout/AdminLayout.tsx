import { Outlet } from "react-router-dom";
import AdminNav from "../shared/AdminNav";

const AdminLayout = () => {
  return (
    <div className="relative min-h-screen flex">
      <div>
        <AdminNav />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

//  className="fixed top-0 w-full z-10"
