import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import Home from "../pages/Home/Home";
import SingUp from "../pages/Auth/SingUp";
import SingIn from "../pages/Auth/SingIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path:'/sing-up',
    element:<SingUp/>
  },
  {
    path:'/sing-in',
    element:<SingIn/>
  }
]);

export default router;
