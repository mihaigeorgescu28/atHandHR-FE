import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { useLocation,useNavigate } from "react-router-dom";
import logo from '../../assets/img/business/athandhrlogo_transparent_small.png'; 
import axios from 'axios';
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";

const apiUrl = process.env.REACT_APP_APIURL;


function AdminNavbar(props) {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [loader, setLoader] = useState(true);
  const [color, setColor] = React.useState("navbar-transparent");
  const [clientName, setClientName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loader) {
        const timeout = setTimeout(() => {
            setLoader(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }
}, [loader]);
  


  React.useEffect(() => {
    window.addEventListener("resize", updateColor);
  });
  React.useEffect(() => {
    if (
      window.outerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
  }, [location]);
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setColor("bg-white");
    } else {
      setColor("navbar-transparent");
    }
  };
  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setSidebarOpen(!sidebarOpen);
  };
  // this function opens and closes the collapse on small devices
  // it also adds navbar-transparent class to the navbar when closed
  // ad bg-white when opened
  const toggleCollapse = () => {
    if (!collapseOpen) {
      setColor("bg-white");
    } else {
      setColor("navbar-transparent");
    }
    setCollapseOpen(!collapseOpen);
  };


  function Logout()
  {
    window.location.href = "/auth/login";
    localStorage.removeItem('isLoggedIn');
  }


    useEffect(() => {
    async function fetchClientName() {
      const UserID = localStorage.getItem("UserID");
      try {
        const result = await axios.post(
          `${apiUrl}/user/currentClient`,
          {
            UserID: UserID,
          }
        );
        if (result.status === 200) {
          setClientName(result.data.ClientName);
          localStorage.setItem('ClientID', result.data.ClientID);
          localStorage.setItem('ClientName', result.data.ClientName);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchClientName();
  }, []);
  

  

  return (
    <>
    <div>
    {!loader ? (
      <Navbar
        className={classnames("navbar-absolute fixed-top", color)}
        expand="lg"
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-minimize">
              <Button
                className="btn-icon btn-round"
                size="sm"
                color="secondary"
                id="minimizeSidebar"
                onClick={props.handleMiniClick}
                type="submit"
              >
                <i className="nc-icon nc-minimal-right text-center visible-on-sidebar-mini" />
                <i className="nc-icon nc-minimal-left text-center visible-on-sidebar-regular" />
              </Button>
            </div>
            <div
              className={classnames("navbar-toggle", {
                toggled: sidebarOpen
              })}
            >
              <button
                className="navbar-toggler"
                type="button"
                onClick={toggleSidebar}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
              <span className="d-none d-md-block">
              {clientName}
              </span>
              <span className="d-block d-md-none">{clientName}</span>
            </NavbarBrand>
          </div>
          <button
            aria-controls="navigation-index"
            aria-expanded={collapseOpen}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            // data-target="#navigation"
            data-toggle="collapse"
            type="button"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </button>
          <Collapse
            className="justify-content-end"
            navbar
            isOpen={collapseOpen}
          >
            <Nav navbar>

            <UncontrolledDropdown nav>
  <DropdownToggle onClick={() => Logout()} nav style={{ fontSize: '18px' }}>
    
  <i className="nc-icon nc-button-power" />
    &nbsp;Log out
  </DropdownToggle>
</UncontrolledDropdown>



            </Nav>
          </Collapse>
        </Container>
      </Navbar>
          ) : (
            <div id="ht-preloader">
            <div className="loader clear-loader">
                <img src={logo} style={{ width: '150px', height: 'auto' }} alt="AT HAND HR" className="animated-image" />
            </div>
        </div>
        
        )}  
    </div>
    </>
  );
}

export default AdminNavbar;
