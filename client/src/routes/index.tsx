import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./Home/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
