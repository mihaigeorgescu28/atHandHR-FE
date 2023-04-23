import React from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footer/Footer.js";
import Login from "views/pages/Login.js";
import Register from "views/pages/Register.js";
import LockScreen from "views/pages/LockScreen.js";
import NotFound from "views/pages/NotFound.js"

var ps;


function AuthLayout() {
  const fullPages = React.useRef();
  const location = useLocation();

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(fullPages.current);
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  const nestedRoute = () => {
    const { pathname } = location;
    if (pathname === "/auth/login") {
      return <Login />;
    } else if (pathname === "/auth/register") {
      return <Register/>;
    } else if (pathname === "/auth/lock-screen") {
      return <LockScreen/>;
    }
    else return <NotFound/>;
    
    // Add other cases here for additional routes
  };

  return (
    <>
      <AuthNavbar />
      <div className="wrapper wrapper-full-page" ref={fullPages}>
        <div className="full-page section-image">
          <Routes>
            <Route path="/" element={<Outlet />} />
          </Routes>
          {nestedRoute()}
          <Footer fluid />
        </div>
      </div>
    </>
  );
}

export default AuthLayout;