import React from "react";
import classnames from "classnames";
import { Navbar, NavbarBrand, Container } from "reactstrap";
import Logo from "assets/img/bg/athandhrlogo_transparent.png";

function AuthNavbar(props) {
  const [color, setColor] = React.useState("navbar-transparent");

  const handleRedirect = () => {
    window.location.href = "https://www.athandhr.com"; // Redirect to the external URL
  };

  return (
    <Navbar
    className={classnames("navbar-absolute fixed-top", color)}
    expand="lg"
  >
   
  </Navbar>
  
  );
}

export default AuthNavbar;


/*

 <div 
      className="navbar-wrapper" 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%' 
      }}
    >
      <img 
        src={Logo} 
        alt="AT HAND HR" 
        style={{ height: '200px', width: 'auto' }} 
      /> 
    </div>

    */