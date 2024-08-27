import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import Home from "../pages/Home/Home";
import SingUp from "../pages/Auth/SingUp";
import SingIn from "../pages/Auth/SingIn";
import Service from "../pages/Service/Service";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:'/service',
        element:<Service/>
      }
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
