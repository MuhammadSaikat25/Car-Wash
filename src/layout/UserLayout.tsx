import { Outlet } from "react-router-dom";

import UserNav from "../shared/UserNav";

const UserLayout = () => {
  return (
    <div className="relative min-h-screen flex">
      <div>
        <UserNav />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;

//  className="fixed top-0 w-full z-10"
