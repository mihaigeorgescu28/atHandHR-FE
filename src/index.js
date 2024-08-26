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
import { persistStore, persistReducer } from "redux-persist"; // Import persistStore and persistReducer
import storage from "redux-persist/lib/storage"; // Import the storage option
import rootReducer from "../src/views/helper/RootReducer.js";
import "./Vender.js"
import $ from 'jquery';
window.jQuery = $;
window.$ = $;


const persistConfig = {
  key: "root",
  storage,
};



// Create the persistedReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);


// Create the Redux store
const store = configureStore({
  reducer: persistedReducer, // Use the persistedReducer
});

// Create the persisted store
const persistor = persistStore(store);


function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const location = useLocation();
  const navigate = useNavigate();

  
  useEffect(() => {
    // Redirect to /auth/login if not logged in and not already on an auth route
    //if (!isLoggedIn && !location.pathname.startsWith('/auth')) {
    //  navigate('/auth/login');
    //}
    console.log("pathname", location.pathname)
    console.log("current location", location);

    // Redirect to /admin/newsfeed if user is logged in and on the root path
    //if (isLoggedIn && location.pathname === '/') {
    //  navigate('/admin/newsfeed');
   // }
  }, [location.pathname, navigate, isLoggedIn]);

  return (

    <Routes>
  {isLoggedIn ? (
    <>

      {/* Auth Routes */}
      <Route path="/auth/*" element={<AuthLayout />} />

      {/* Admin Dashboard Routes */}
      <Route path="/admin/dashboard/*" element={
          <>
            {console.log('Admin Dashboard Route is being rendered')}
            <AdminLayout />
          </>
        }  />

      {/* Admin Routes */}
      <Route path="/admin/*" element={<AdminLayout />} />

      {/* Website Routes*/}
      <Route path="/*" element={<WebsiteLayout />} />

      {/* Catch-All (NotFound) Route */}
      <Route path="*" element={<NotFound />} />
    </>
  ) : (
    <>

      {/* Website Routes*/}
      <Route path="/*" element={<WebsiteLayout />} />

      {/* Auth Routes */}
      <Route path="/auth/*" element={<AuthLayout />} />

      {/* Redirect if trying to access /admin and not logged in */}
      <Route path="/admin/*" element={<Navigate to="/auth/login" />} />

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
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
  </Router>
);
