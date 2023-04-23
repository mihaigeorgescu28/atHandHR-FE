
import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import {Route, Routes, useLocation, Outlet, useNavigate} from "react-router-dom";

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
  const navigate = useNavigate();

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
  }, [location]);


  const nestedRoute = (routes) => {
    const { pathname } = location;
  
    const route = routes.find((route) => {
      if (!route.layout || !route.path) {
        const nestedRoute = route.views.find((nested) => {
          if (!nested.layout || !nested.path) {
            return false;
          }
          const fullPath = nested.layout + nested.path;
          return pathname === fullPath;
        });
  
        if (nestedRoute) {
          return true;
        }
      } else if (route.collapse !== true) {
        const fullPath = route.layout + route.path;
        return pathname === fullPath;
      }
  
      return false;
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
        routes={routes}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className="main-panel" ref={mainPanel}>
        <AdminNavbar {...props} handleMiniClick={handleMiniClick} />
        <Routes>

          <Route path="/" element={<Outlet />} 
          />

        </Routes>
        
        {
        // if user is not logged in and tries to access /admin layout then shows 404 page
        // if user is logged in then call nestedRoute function
        localStorage.getItem('isLoggedIn') == "true" ? nestedRoute(routes) : <NotFound/> } 
        {
          // we don't want the Footer to be rendered on full screen maps page
          location.pathname.indexOf("full-screen-map") !== -1 ? null : (
          
            <Footer fluid />
          )
        }
        
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
