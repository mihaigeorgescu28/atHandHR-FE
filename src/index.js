import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.1";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import NotFound from "views/pages/NotFound";

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to /auth/login if not logged in and not already on an auth route
    if (!isLoggedIn && !location.pathname.startsWith('/auth')) {
      navigate('/auth/login');
    }

    console.log("current location", location);

    // Redirect to /admin/newsfeed if user is logged in and on the root path
    if (isLoggedIn && location.pathname === '/') {
      navigate('/admin/newsfeed');
    }
  }, [location.pathname, navigate, isLoggedIn]);

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          {/* Auth Routes */}
          <Route path="/auth/*" element={<AuthLayout />} />

          {/* Admin Dashboard Routes */}
          <Route path="/admin/dashboard/*" element={<AdminLayout />} />

          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminLayout />} />

          {/* Catch-All (NotFound) Route */}
          <Route path="*" element={<NotFound />} />
        </>
      ) : (
        <>
          <Route path="/auth/*" element={<AuthLayout />} />
          {/* Redirect all other paths to /auth/login */}
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </>
      )}
    </Routes>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <App />
  </Router>
);
