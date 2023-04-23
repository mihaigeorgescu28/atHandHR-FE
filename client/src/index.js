import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom";
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

  useEffect(() => { // <-- wrap navigate call inside useEffect hook
    if (location.pathname === '/') {
      navigate('/auth/login');
    }
  }, [location.pathname, navigate, isLoggedIn]);

  if (isLoggedIn) {
    return (
      <Routes>
        <Route path="/auth/*" element={<AuthLayout />} />
        <Route path="/admin/dashboard" element={<AdminLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/auth/*" element={<AuthLayout />} />
      </Routes>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
