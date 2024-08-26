import React from "react";
import { Routes, Route, Outlet, useLocation, useParams } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import WebsiteNavbar from "components/Navbars/WebsiteNavbar.js";
import WebsiteFooter from "components/Footer/WebsiteFooter";
import AuthFooter from "components/Footer/Footer.js";
import LandingPage from "views/pages/LandingPage";
import TermsAndConditions from "views/pages/TermsAndConditions";
import PrivacyPolicy from "views/pages/PrivacyPolicy";

import NotFound from "views/pages/NotFound.js";
import AboutUs from "views/pages/AboutUs";

var ps;

function WebsiteLayout() {
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



  function LandingPageWrapper() {
    const { id } = useParams();
    return <LandingPage />;
  }

  const nestedRoute = () => {
    const { pathname } = location;

    console.log("path: ", pathname)

    if (pathname === "/") {
      console.log("heree")
        return <LandingPage />
     
  }
  else if (pathname === "/privacy-policy") {
    return <PrivacyPolicy />
 
}
else if (pathname === "/terms-and-conditions") {
  return <TermsAndConditions />

}
else if (pathname === "/about-us") {
  return <AboutUs />

}
  else{
    return <NotFound />;
    }

};



  return (
    <>
<WebsiteNavbar />
<div className="wrapper wrapper-full-page" ref={fullPages}>
  <div >
    <Routes>
      <Route path="/" element={<Outlet />} />
    </Routes>
    {nestedRoute()}
  </div>
</div>
<WebsiteFooter />
    </>
  );
}

export default WebsiteLayout;
