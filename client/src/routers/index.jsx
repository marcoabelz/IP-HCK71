import { createBrowserRouter, redirect } from "react-router-dom";

import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { LandingPage } from "../pages/LandingPage";
import { DetailRoom } from "../pages/DetailRoom";
import { BookingForm } from "../pages/BookingForm";
import { MyBooking } from "../pages/MyBooking";
import { CmsRoom } from "../pages/CmsRoom";
import { CmsEditRoom } from "../pages/CmsEditRoom";
import { CmsBooking } from "../pages/CmsBooking";
import { CmsUploadPhotos } from "../pages/CmsUploadPhotos";
import RootLayout from "../layouts/RootLayout";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      return localStorage.getItem("access_token") ? redirect("/") : null;
    },
  },
  {
    path: "/",
    element: <RootLayout />,
    loader: () => {
      return !localStorage.getItem("access_token") ? redirect("/login") : null;
    },
    children: [
      {
        index: true,
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/rooms/:id",
        element: <DetailRoom />,
      },
      {
        path: "/bookings/",
        element: <MyBooking />,
      },
      {
        path: "/bookings/:id",
        element: <BookingForm />,
      },
      {
        path: "/cms/rooms/",
        element: <CmsRoom />,
      },
      {
        path: "cms/rooms/:id/edit",
        element: <CmsEditRoom />,
      },
      {
        path: "cms/bookings",
        element: <CmsBooking />,
      },
      {
        path: "/cms/rooms/:id/upload",
        element: <CmsUploadPhotos />,
      },
    ],
  },
]);

export default router;
