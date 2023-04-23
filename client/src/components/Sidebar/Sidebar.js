
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Nav, Collapse } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import axios from 'axios';

import avatar from "assets/img/default-avatar.png";
import logo from "assets/img/react-logo.png";
import { useLocation } from "react-router-dom";

var ps;

function Sidebar(props) {
  const location = useLocation();
  const [openAvatar, setOpenAvatar] = React.useState(false);
  const [collapseStates, setCollapseStates] = React.useState({});
  const [userFullName, setUserFullName] = useState('');
  const sidebar = React.useRef();
  // this creates the intial state of this component based on the collapse routes
  // that it gets through props.routes
  const getCollapseStates = (routes) => {
    let initialState = {};
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState
        };
      }
      return null;
    });
    return initialState;
  };
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.js - route /admin/regular-forms
  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (window.location.pathname.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  };
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.sidebar == 'True' )
      {
      
      if (prop.collapse) {
        var st = {};
        st[prop["state"]] = !collapseStates[prop.state];
        
        return (
          <li
            className={getCollapseInitialState(prop.views) ? "active" : ""}
            key={key}
          >
            <a
              href="#pablo"
              data-toggle="collapse"
              aria-expanded={collapseStates[prop.state]}
              onClick={(e) => {
                e.preventDefault();
                setCollapseStates(st);
              }}
            >
              {prop.icon !== undefined ? (
                <>
                  <i className={prop.icon} />
                  <p>
                    {prop.name}
                    <b className="caret" />
                  </p>
                </>
              ) : (
                <>
                  <span className="sidebar-mini-icon">{prop.mini}</span>
                  <span className="sidebar-normal">
                    {prop.name}
                    <b className="caret" />
                  </span>
                </>
              )}
            </a>
            <Collapse isOpen={collapseStates[prop.state]}>
              <ul className="nav">{createLinks(prop.views)}</ul>
            </Collapse>
          </li>
        );
      }
      
        return (

          <li className={activeRoute(prop.layout + prop.path)} key={key}>
            <NavLink to={prop.layout + prop.path} >
              {prop.icon !== undefined ? (
                <>
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </>
              ) : (
                <>
                  <span className="sidebar-mini-icon">{prop.mini}</span>
                  <span className="sidebar-normal">{prop.name}</span>
                </>
              )}
            </NavLink>
          </li>
        );
      }
    });
  };

  useEffect(() => {
    async function fetchUserFullName() {
      const UserID = localStorage.getItem("UserID");
      try {
        const result = await axios.post(
          "http://localhost:8800/user",
          {
            UserID: UserID,
          }
        );
        if (result.status === 200) {
          setUserFullName(result.data.FullName);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserFullName();
  }, []);

  
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  React.useEffect(() => {
    // if you are using a Windows Machine, the scrollbars will have a Mac look
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
    return function cleanup() {
      // we need to destroy the false scrollbar when we navigate
      // to a page that doesn't have this component rendered
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  React.useEffect(() => {
    setCollapseStates(getCollapseStates(props.routes));
  }, []);

  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        <a
          href="https://athandhr.com"
          className="simple-text logo-mini"
        >
          <div className="logo-img">
            <img src={logo} alt="react-logo" />
          </div>
        </a>
        <a
          href="https://athandhr.com"
          className="simple-text logo-normal"
        >
          At Hand HR
        </a>
      </div>

      <div className="sidebar-wrapper" ref={sidebar}>
        <div className="user">
          <div className="photo">
            <img src={avatar} alt="Avatar" />
          </div>
          <div className="info">
            <a
              href="#pablo"
              data-toggle="collapse"
              aria-expanded={openAvatar}
              onClick={() => setOpenAvatar(!openAvatar)}
            >
              <span>
                {userFullName}
                <b className="caret" />
              </span>
            </a>
            <Collapse isOpen={openAvatar}>
              <ul className="nav">
                <li>
                  <NavLink to="/admin/user-profile" >
                    <span className="sidebar-mini-icon">MP</span>
                    <span className="sidebar-normal">My Profile</span>
                  </NavLink>
                </li>
              </ul>
            </Collapse>
          </div>
        </div>
        <Nav>{createLinks(props.routes)}</Nav>
        
      </div>
    </div>
  );
}

export default Sidebar;
