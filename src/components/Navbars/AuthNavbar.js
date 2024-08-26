import React, {useState, useEffect} from "react";
import classnames from "classnames";
import { Navbar, NavbarBrand, Container } from "reactstrap";
import Logo from "assets/img/bg/athandhrlogo_transparent.png";
import logo from '../../assets/img/business/athandhrlogo_transparent_small.png'; 

function AuthNavbar(props) {
  const [color, setColor] = React.useState("navbar-transparent");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (loader) {
        const timeout = setTimeout(() => {
            setLoader(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }
}, [loader]);

  return (
    <div>
       {!loader ? (
    
    <Navbar
    className={classnames("navbar-absolute fixed-top", color)}
    expand="lg"
  >
   
  </Navbar>
  ) : (
    <div id="ht-preloader">
    <div className="loader clear-loader">
        <img src={logo} style={{ width: '150px', height: 'auto' }} alt="AT HAND HR" className="animated-image" />
    </div>
</div>

)}
  </div>
  
  );

  

}

export default AuthNavbar;




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

    