import React from "react";
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Routes, useLocation, Outlet } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import routes from "routes.js";
import NotFound from "views/pages/NotFound";

var ps;

function AuthAdmin(props) {
  const location = useLocation();
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [activeColor, setActiveColor] = React.useState("info");
  const [sidebarMini, setSidebarMini] = React.useState(false);
  const mainPanel = React.useRef();
  const [Id, setId] = React.useState(null);
  const RoleID = localStorage.getItem("RoleID");

  const extractIdFromPathname = (pathname, fieldBeforeId) => {
    const regex = new RegExp(`/${fieldBeforeId}/(\\d+)`); // Dynamically create the regex
    const match = pathname.match(regex);
    return match ? match[1] : null; // Return the captured id or null if no match
  };

  React.useEffect(() => {
    const extractedId = extractIdFromPathname(location.pathname, "totalStaff");
    setId(extractedId);
  }, [location]);


  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanel.current);
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.className += " perfect-scrollbar-off";
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
  }, [location, Id]);

  const updatedRoutes = React.useMemo(() => {
    return routes.map((route) => {
      if (route.path === "/dashboard/totalStaff/:id") {
        const extractedId = extractIdFromPathname(location.pathname, "totalStaff");
        setId(extractedId);
        return {
          ...route,
          path: `/dashboard/totalStaff/${extractedId}`,
        };
      }
      else if(route.path === "/company-documents/:id") {
        const extractedId = extractIdFromPathname(location.pathname, "company-documents");
        setId(extractedId);
        return {
          ...route,
          path: `/company-documents/${extractedId}`,
        };
      }
      return route;
    });
  }, [location.pathname]);

  const nestedRoute = (routes) => {
    const { pathname } = location;

    const route = updatedRoutes.find((updatedRoute) => {
      if (!updatedRoute.layout || !updatedRoute.path) {
        const nestedRoute = updatedRoute.views.find((nested) => {
          if (!nested.layout || !nested.path) {
            return false;
          }
          const fullPath = nested.layout + nested.path;
          return pathname === fullPath;
        });

        if (nestedRoute) {
          return true;
        }
      } else if (updatedRoute.collapse !== true) {
        // Admin can see everything
      if ((parseInt(RoleID) === 1 || (parseInt(updatedRoute.roleId) === parseInt(RoleID) ) && (updatedRoute.sidebar === 'True') || updatedRoute.innerURL === 'True') )
         {
          
        const fullPath = updatedRoute.layout + updatedRoute.path;
        return pathname === fullPath;
      }

      return false;

    }

    });

    if (route) {
      
      if (route.views) {
        const nestedRoute = route.views.find((nested) => {
          if (!nested.layout || !nested.path) {
            return false;
          }
          const fullPath = nested.layout + nested.path;
          return pathname === fullPath;
        });

        if (nestedRoute) {
          return <nestedRoute.component />;
        }
      } else {
        return <route.component />;
      }
    }

    return null;
  };

  const handleActiveClick = (color) => {
    setActiveColor(color);
  };

  const handleBgClick = (color) => {
    setBackgroundColor(color);
  };

  const handleMiniClick = () => {
    if (document.body.classList.contains("sidebar-mini")) {
      setSidebarMini(false);
    } else {
      setSidebarMini(true);
    }
    document.body.classList.toggle("sidebar-mini");
  };

  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={updatedRoutes}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className="main-panel"  ref={mainPanel}>
        <AdminNavbar {...props} handleMiniClick={handleMiniClick} />
        <Routes>
          <Route path="/" element={<Outlet />} />
        </Routes>
        {localStorage.getItem("isLoggedIn") === "true"
          ? nestedRoute(updatedRoutes)
          : <NotFound />}
        {location.pathname.indexOf("full-screen-map") !== -1
          ? null
          : <Footer fluid />}
      </div>
      <FixedPlugin
        bgColor={backgroundColor}
        activeColor={activeColor}
        sidebarMini={sidebarMini}
        handleActiveClick={handleActiveClick}
        handleBgClick={handleBgClick}
        handleMiniClick={handleMiniClick}
      />
    </div>
  );
}

export default AuthAdmin;
