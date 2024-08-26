import React from "react";
import { Routes, Route, Outlet, useLocation, useParams } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footer/Footer.js";
import Login from "views/pages/Login.js";
import VerifyEmail from "views/pages/VerifyEmail.js"; 
import ResetPassword from "views/pages/ResetPassword.js";
import TemporaryPassword from "views/pages/TemporaryPassword.js"; 
import Register from "views/pages/Register.js";
import LockScreen from "views/pages/LockScreen.js";
import NotFound from "views/pages/NotFound.js";
import TermsAndConditions from "views/pages/TermsAndConditions";
import PrivacyPolicy from "views/pages/PrivacyPolicy";
import LandingPage from "views/pages/LandingPage";

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

  

  const extractIdFromPathname = (pathname, property) => {
    const match = pathname.match(new RegExp(`\/${property}\/([0-9a-fA-F-]+)$`));
    return match ? match[1] : null;
};


  function RegisterWrapper() {
    const { id } = useParams();
    return <Register />;
  }

  function VerifyEmailWrapper() {
    const { id } = useParams();
    return <VerifyEmail />;
  }

  function ResetPasswordWrapper() {
    const { id } = useParams();
    return <ResetPassword />;
  }

  function TemporaryPasswordWrapper() {
    const { id } = useParams();
    return <TemporaryPassword />;
  }

  function LandingPageWrapper() {
    const { id } = useParams();
    return <LandingPage />;
  }

  const nestedRoute = () => {
    const { pathname } = location;

    if (pathname === "/auth/login") {
      return <Login />;
    } else if (pathname.startsWith("/auth/register/")) {
      const id = extractIdFromPathname(pathname, 'register');
      return <RegisterWrapper />;
    } else if (pathname.startsWith("/auth/verifyUser/")) {
      const id = extractIdFromPathname(pathname, 'verifyUser');
      return <VerifyEmailWrapper />;
      
    } else if (pathname.startsWith("/auth/resetUserPassword/")) {
      const id = extractIdFromPathname(pathname, 'resetUserPassword');
      return <ResetPasswordWrapper />; 
    }
    else if (pathname.startsWith("/auth/temporaryPassword/")) {
      const id = extractIdFromPathname(pathname, 'temporaryPassword');
      return <TemporaryPasswordWrapper />; 
    }
    else if (pathname === "/auth/lock-screen") {
      return <LockScreen />;
    }
      else {
    return <NotFound />;
    }
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
