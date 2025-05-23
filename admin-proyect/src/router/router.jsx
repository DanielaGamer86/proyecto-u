import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Views from "../pages/views/Views";
import Areas from "../pages/areas/Areas";
import Cards from "../pages/cards/Cards";
import Analysis from "../pages/analysis/Analysis";
import Roles from "../pages/roles/Roles";
import Settings from "../pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login", // Corregido de "loading" a "login"
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/views",
    element: <Views />,
  },
  {
    path: "/areas",
    element: <Areas />,
  },
  {
    path: "/cards",
    element: <Cards />,
  },
  {
    path: "/analysis",
    element: <Analysis />,
  },
  {
    path: "/roles",
    element: <Roles />,
  },
  {
    path: "/settings",
    element: <Settings />,
  }
]);

export default router;
// estas son las rutas de la aplicacion electron, no las de la aplicacion react, por lo que no se pueden usar en el main.js