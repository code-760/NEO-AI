import { createElement } from "react";
import { createBrowserRouter } from "react-router";
import Login from "../Feature/Auth/pages/Login.jsx";
import Register from "../Feature/Auth/pages/Register.jsx";
import Protected from "../Feature/Auth/Components/Protected.jsx";
import Dashboard from "../Feature/Chat/pages/Dashboard.jsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: (
      <Protected>
        <Dashboard />
      </Protected>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
