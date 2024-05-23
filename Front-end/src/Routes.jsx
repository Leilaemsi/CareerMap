import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Homepage from "pages/Homepage";
import Test from "pages/Test";
import Login from "pages/Login";
import Signup from "pages/Signup";
import TrialDesc from "pages/TrialDesc";
import AboutUs from "pages/AboutUs";


const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <Login /> },
    { path: "*", element: <NotFound /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/homepage", element: <Homepage /> }, // Corrected path
    { path: "/about", element: <AboutUs /> }, // Corrected path
    { path: "/test", element: <Test /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
  ]);

  return element;
};

export default ProjectRoutes;
