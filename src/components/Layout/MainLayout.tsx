import React, { FC, ReactNode, useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

type MainLayoutProps = {
  children?: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="main-wrapper">
      <SideBar />

      <div className="page-wrapper">
        {/* <NavBar /> */}

        <div className="page-content">
          {isLoading ? (
            <div className="spinner-wrapper">
              <div className="spinner">Loading...</div>
            </div>
          ) : (
            <div /*contentAnimate*/>{children}</div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
