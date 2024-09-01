import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import Home from "../pages/Home/Home";
import SingUp from "../pages/Auth/SingUp";
import SingIn from "../pages/Auth/SingIn";
import Service from "../pages/Service/Service";
import ServiceDetails from "../pages/serviceDetails/ServiceDetails";
import BookingPage from "../pages/Booking/BookingPage";
import AdminLayout from "../layout/AdminLayout";
import Admin from "../pages/Dashboard/Admin/Admin";
import ServiceManagement from "../pages/Dashboard/Admin/ServiceManagement";
import AllBooking from "../pages/Dashboard/Admin/AllBooking";
import ManageUser from "../pages/Dashboard/Admin/ManageUser";
import ManageSlot from "../pages/Dashboard/Admin/ManageSlot";

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
        path: "/booking-page/:serviceId/:slots",
        element: <BookingPage />,
      },
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
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/hero",
        element: <Admin />,
      },
      {
        path: "/admin/service-management",
        element: <ServiceManagement />,
      },
      {
        path: "/admin/user-booking",
        element: <AllBooking />,
      },
      {
        path: "/admin/user-management",
        element: <ManageUser />,
      },
      {
        path: "/admin/manage-slot",
        element: <ManageSlot />,
      },
    ],
  },
]);

export default router;
