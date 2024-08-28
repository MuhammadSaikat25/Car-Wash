import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import Home from "../pages/Home/Home";
import SingUp from "../pages/Auth/SingUp";
import SingIn from "../pages/Auth/SingIn";
import Service from "../pages/Service/Service";
import ServiceDetails from "../pages/serviceDetails/ServiceDetails";
import BookingPage from "../pages/Booking/BookingPage";

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
        path: "/service",
        element: <Service />,
      },
      {
        path: "/service-details/:id",
        element: <ServiceDetails />,
      },
      {
        path:"/booking-page/:slot",
        element:<BookingPage/>
      }
    ],
  },
  {
    path: "/sing-up",
    element: <SingUp />,
  },
  {
    path: "/sing-in",
    element: <SingIn />,
  },
]);

export default router;
