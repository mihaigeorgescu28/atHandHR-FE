import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import WebsiteLayout from "layouts/Website.js";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.1";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import NotFound from "views/pages/NotFound";

// template winck
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from "redux-persist"; 
import storage from "redux-persist/lib/storage"; 
import rootReducer from "../src/views/helper/RootReducer.js";
import useAxiosInterceptor from './useAxiosInterceptor.js';
import "./Vender.js"
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

const fullAppURL = process.env.REACT_APP_URL;
// Create a URL object from the full URL
const urlObject = new URL(fullAppURL);
// Extract the hostname from the URL object
const appURL = urlObject.hostname;


const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});
const persistor = persistStore(store);

function App() {
  useAxiosInterceptor();  // Apply the global Axios interceptor

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const location = useLocation();
  const navigate = useNavigate();
  const baseURL = window.location.hostname;

  useEffect(() => {
    if (!isLoggedIn && !location.pathname.startsWith('/auth') && baseURL === appURL) {
      navigate('/auth/login');
    } else if (isLoggedIn && location.pathname === '/' && baseURL === appURL) {
      navigate('/admin/newsfeed');
    }
  }, [location.pathname, navigate, isLoggedIn, baseURL]);

  return (
    <Routes>
      {baseURL === appURL ? (
        <>
          {isLoggedIn ? (
            <>
              <Route path="/auth/*" element={<AuthLayout />} />
              <Route path="/admin/dashboard/*" element={<AdminLayout />} />
              <Route path="/admin/*" element={<AdminLayout />} />
              <Route path="*" element={<NotFound />} />
            </>
          ) : (
            <>
              <Route path="/*" element={<Navigate to="/auth/login" />} />
              <Route path="/auth/*" element={<AuthLayout />} />
              <Route path="*" element={<Navigate to="/auth/login" />} />
            </>
          )}
        </>
      ) : (
        <>
          <Route path="/*" element={<WebsiteLayout />} />
          <Route path="*" element={<NotFound />} />
        </>
      )}
    </Routes>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </Router>
);
