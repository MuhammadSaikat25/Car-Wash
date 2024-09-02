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
import UserHero from "../components/Dashboard/User/UserHero";
import UserLayout from "../layout/UserLayout";
import UserProfile from "../components/Dashboard/User/UserProfile";
import UserBooking from "../pages/Dashboard/User/UserBooking";
import NotFound from "../pages/NotFound";
import PaymentSuccessful from "../pages/Booking/payment/PaymentSuccessful";
import AllReviews from "../pages/AllReviews";
import AdminPrivate from "./privateRoute/AdminPrivate";
import UserPrivate from "./privateRoute/UserPrivate";

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
        element: (
          <UserPrivate>
            <ServiceDetails />
          </UserPrivate>
        ),
      },
      {
        path: "/booking-page/:serviceId/:slots",
        element: (
          <UserPrivate>
            <BookingPage />
          </UserPrivate>
        ),
      },
      {
        path: "/payment-success",
        element: <PaymentSuccessful />,
      },
      {
        path: "/all-reviews",
        element: (
          <UserPrivate>
            <AllReviews />
          </UserPrivate>
        ),
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
        element: (
          <AdminPrivate>
            <ServiceManagement />
          </AdminPrivate>
        ),
      },
      {
        path: "/admin/user-booking",
        element: (
          <AdminPrivate>
            <AllBooking />
          </AdminPrivate>
        ),
      },
      {
        path: "/admin/user-management",
        element: (
          <AdminPrivate>
            <ManageUser />
          </AdminPrivate>
        ),
      },
      {
        path: "/admin/manage-slot",
        element: (
          <AdminPrivate>
            {" "}
            <ManageSlot />
          </AdminPrivate>
        ),
      },
    ],
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "/user/hero",
        element: (
          <UserPrivate>
            <UserHero />
          </UserPrivate>
        ),
      },
      {
        path: "/user/Profile",
        element: (
          <UserPrivate>
            <UserProfile />
          </UserPrivate>
        ),
      },
      {
        path: "/user/booking",
        element: (
          <UserPrivate>
            <UserBooking />
          </UserPrivate>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
