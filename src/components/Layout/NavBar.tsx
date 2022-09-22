import React from "react";
import { MENUS } from "../../utils/constants";
import { MenuItem } from "../../utils/types";

const NavBar = () => {
  const toggleSidebar = () => {};
  const onLogout = () => {};

  return (
    <nav className="navbar">
      <a href="" className="sidebar-toggler" onClick={toggleSidebar}>
        <i className="feather icon-menu"></i>
      </a>
      <div className="navbar-content">
        <form className="search-form">
          <div className="input-group">
            <div className="input-group-text">
              <i className="feather icon-search"></i>
            </div>
            <input type="text" className="form-control" id="navbarForm" placeholder="Search here..." />
          </div>
        </form>
        <ul className="navbar-nav">
          <li className="nav-item" /*ngbDropdown*/>
            <a className="nav-link" /*ngbDropdownToggle*/ id="languageDropdown" role="button">
              <img src="assets/images/flags/us.svg" className="wd-20 me-1" title="us" alt="us" />
              <span className="fw-bold ms-1 me-1 d-none d-md-inline-block">English</span>
            </a>
            <div /*ngbDropdownMenu*/ aria-labelledby="languageDropdown">
              <a /*ngbDropdownItem*/ className="py-2">
                <img src="assets/images/flags/us.svg" className="wd-20 me-1" title="us" alt="us" />{" "}
                <span className="ms-1"> English </span>
              </a>
              <a /*ngbDropdownItem*/ className="py-2">
                <img src="assets/images/flags/fr.svg" className="wd-20 me-1" title="fr" alt="fr" />{" "}
                <span className="ms-1"> French </span>
              </a>
              <a /*ngbDropdownItem*/ className="py-2">
                <img src="assets/images/flags/de.svg" className="wd-20 me-1" title="de" alt="de" />{" "}
                <span className="ms-1"> German </span>
              </a>
              <a /*ngbDropdownItem*/ className="py-2">
                <img src="assets/images/flags/pt.svg" className="wd-20 me-1" title="pt" alt="pt" />{" "}
                <span className="ms-1"> Portuguese </span>
              </a>
              <a /*ngbDropdownItem*/ className="py-2">
                <img src="assets/images/flags/es.svg" className="wd-20 me-1" title="es" alt="es" />{" "}
                <span className="ms-1"> Spanish </span>
              </a>
            </div>
          </li>
          <li className="nav-item nav-apps" /*ngbDropdown*/>
            <a className="nav-link" /*ngbDropdownToggle*/ id="appsDropdown">
              <i className="link-icon feather icon-grid"></i>
            </a>
            <div /*ngbDropdownMenu*/ className="px-0" aria-labelledby="appsDropdown">
              <div className="px-3 py-2 d-flex align-items-center justify-content-between border-bottom">
                <p className="mb-0 fw-bold">Web Apps</p>
                <a href="javascript:;" className="text-muted">
                  Edit
                </a>
              </div>
              <div className="row g-0 p-1">
                <div className="col-3 text-center">
                  <a
                    href="/apps/chat"
                    className="dropdown-item d-flex flex-column align-items-center justify-content-center wd-70 ht-70"
                  >
                    <i className="feather icon-message-square icon-lg mb-1"></i>
                    <p className="tx-12">Chat</p>
                  </a>
                </div>
                <div className="col-3 text-center">
                  <a
                    href="/apps/calendar"
                    className="dropdown-item d-flex flex-column align-items-center justify-content-center wd-70 ht-70"
                  >
                    <i className="feather icon-calendar icon-lg mb-1"></i>
                    <p className="tx-12">Calendar</p>
                  </a>
                </div>
                <div className="col-3 text-center">
                  <a
                    href="/apps/email/inbox"
                    className="dropdown-item d-flex flex-column align-items-center justify-content-center wd-70 ht-70"
                  >
                    <i className="feather icon-mail icon-lg mb-1"></i>
                    <p className="tx-12">Email</p>
                  </a>
                </div>
                <div className="col-3 text-center">
                  <a
                    href="/general/profile"
                    className="dropdown-item d-flex flex-column align-items-center justify-content-center wd-70 ht-70"
                  >
                    <i className="feather icon-instagram icon-lg mb-1"></i>
                    <p className="tx-12">Profile</p>
                  </a>
                </div>
              </div>
              <div className="px-3 py-2 d-flex align-items-center justify-content-center border-top">
                <a href="">View all</a>
              </div>
            </div>
          </li>
          <li className="nav-item nav-messages" /*ngbDropdown*/>
            <a className="nav-link" /*ngbDropdownToggle*/ id="messageDropdown">
              <i className="link-icon feather icon-mail"></i>
            </a>
            <div /*ngbDropdownMenu*/ className="px-0" aria-labelledby="messageDropdown">
              <div className="px-3 py-2 d-flex align-items-center justify-content-between border-bottom">
                <p>9 New Messages</p>
                <a href="" className="text-muted">
                  Clear all
                </a>
              </div>
              <div className="p-1">
                <a href="" className="dropdown-item d-flex align-items-center py-2">
                  <div className="me-3">
                    <img className="wd-30 ht-30 rounded-circle" src="https://via.placeholder.com/30x30" alt="user" />
                  </div>
                  <div className="d-flex justify-content-between flex-grow-1">
                    <div className="me-4">
                      <p>Leonardo Payne</p>
                      <p className="tx-12 text-muted">Project status</p>
                    </div>
                    <p className="tx-12 text-muted">2 min ago</p>
                  </div>
                </a>
                <a href="" className="dropdown-item d-flex align-items-center py-2">
                  <div className="me-3">
                    <img className="wd-30 ht-30 rounded-circle" src="https://via.placeholder.com/30x30" alt="user" />
                  </div>
                  <div className="d-flex justify-content-between flex-grow-1">
                    <div className="me-4">
                      <p>Carl Henson</p>
                      <p className="tx-12 text-muted">Client meeting</p>
                    </div>
                    <p className="tx-12 text-muted">30 min ago</p>
                  </div>
                </a>
                <a href="" className="dropdown-item d-flex align-items-center py-2">
                  <div className="me-3">
                    <img className="wd-30 ht-30 rounded-circle" src="https://via.placeholder.com/30x30" alt="user" />
                  </div>
                  <div className="d-flex justify-content-between flex-grow-1">
                    <div className="me-4">
                      <p>Jensen Combs</p>
                      <p className="tx-12 text-muted">Project updates</p>
                    </div>
                    <p className="tx-12 text-muted">1 hrs ago</p>
                  </div>
                </a>
                <a href="" className="dropdown-item d-flex align-items-center py-2">
                  <div className="me-3">
                    <img className="wd-30 ht-30 rounded-circle" src="https://via.placeholder.com/30x30" alt="user" />
                  </div>
                  <div className="d-flex justify-content-between flex-grow-1">
                    <div className="me-4">
                      <p>Amiah Burton</p>
                      <p className="tx-12 text-muted">Project deatline</p>
                    </div>
                    <p className="tx-12 text-muted">2 hrs ago</p>
                  </div>
                </a>
                <a href="" className="dropdown-item d-flex align-items-center py-2">
                  <div className="me-3">
                    <img className="wd-30 ht-30 rounded-circle" src="https://via.placeholder.com/30x30" alt="user" />
                  </div>
                  <div className="d-flex justify-content-between flex-grow-1">
                    <div className="me-4">
                      <p>Yaretzi Mayo</p>
                      <p className="tx-12 text-muted">New record</p>
                    </div>
                    <p className="tx-12 text-muted">5 hrs ago</p>
                  </div>
                </a>
              </div>
              <div className="px-3 py-2 d-flex align-items-center justify-content-center border-top">
                <a href="">View all</a>
              </div>
            </div>
          </li>
          <li className="nav-item nav-notifications" /*ngbDropdown*/>
            <a className="nav-link" /*ngbDropdownToggle*/ id="notificationDropdown">
              <i className="link-icon feather icon-bell"></i>
              <div className="indicator">
                <div className="circle"></div>
              </div>
            </a>
            <div /*ngbDropdownMenu*/ className="px-0" aria-labelledby="notificationDropdown">
              <div className="px-3 py-2 d-flex align-items-center justify-content-between border-bottom">
                <p>6 New Notifications</p>
                <a href="" className="text-muted">
                  Clear all
                </a>
              </div>
              <div className="p-1">
                <a href="" className="dropdown-item d-flex align-items-center py-2">
                  <div className="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                    <i className="feather icon-gift icon-sm text-white"></i>
                  </div>
                  <div className="flex-grow-1 me-2">
                    <p>New Order Recieved</p>
                    <p className="tx-12 text-muted">30 min ago</p>
                  </div>
                </a>
                <a href="" className="dropdown-item d-flex align-items-center py-2">
                  <div className="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                    <i className="feather icon-alert-circle icon-sm text-white"></i>
                  </div>
                  <div className="flex-grow-1 me-2">
                    <p>Server Limit Reached!</p>
                    <p className="tx-12 text-muted">1 hrs ago</p>
                  </div>
                </a>
                <a href="" className="dropdown-item d-flex align-items-center py-2">
                  <div className="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                    <img className="wd-30 ht-30 rounded-circle" src="https://via.placeholder.com/30x30" alt="userr" />
                  </div>
                  <div className="flex-grow-1 me-2">
                    <p>New customer registered</p>
                    <p className="tx-12 text-muted">2 sec ago</p>
                  </div>
                </a>
                <a href="" className="dropdown-item d-flex align-items-center py-2">
                  <div className="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                    <i className="feather icon-layers icon-sm text-white"></i>
                  </div>
                  <div className="flex-grow-1 me-2">
                    <p>Apps are ready for update</p>
                    <p className="tx-12 text-muted">5 hrs ago</p>
                  </div>
                </a>
                <a href="" className="dropdown-item d-flex align-items-center py-2">
                  <div className="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                    <i className="feather icon-download icon-sm text-white"></i>
                  </div>
                  <div className="flex-grow-1 me-2">
                    <p>Download completed</p>
                    <p className="tx-12 text-muted">6 hrs ago</p>
                  </div>
                </a>
              </div>
              <div className="px-3 py-2 d-flex align-items-center justify-content-center border-top">
                <a href="">View all</a>
              </div>
            </div>
          </li>
          <li className="nav-item nav-profile" /*ngbDropdown*/>
            <a className="nav-link" /*ngbDropdownToggle*/ id="profileDropdown">
              <img className="wd-30 ht-30 rounded-circle" src="https://via.placeholder.com/30x30" alt="profile" />
            </a>
            <div /*ngbDropdownMenu*/ className="px-0" aria-labelledby="profileDropdown">
              <div className="d-flex flex-column align-items-center border-bottom px-5 py-3">
                <div className="mb-3">
                  <img className="wd-80 ht-80 rounded-circle" src="https://via.placeholder.com/80x80" alt="" />
                </div>
                <div className="text-center">
                  <p className="tx-16 fw-bolder">Amiah Burton</p>
                  <p className="tx-12 text-muted">amiahburton@gmail.com</p>
                </div>
              </div>
              <ul className="list-unstyled p-1">
                <li className="dropdown-item py-2">
                  <a href="/general/profile" className="d-flex text-body ms-0">
                    <i className="feather icon-user me-2 icon-md"></i>
                    <span>Profile</span>
                  </a>
                </li>
                <li className="dropdown-item py-2">
                  <a href="" className="d-flex text-body ms-0">
                    <i className="feather icon-edit me-2 icon-md"></i>
                    <span>Edit Profile</span>
                  </a>
                </li>
                <li className="dropdown-item py-2">
                  <a href="" className="d-flex text-body ms-0">
                    <i className="feather icon-repeat me-2 icon-md"></i>
                    <span>Switch User</span>
                  </a>
                </li>
                <li className="dropdown-item py-2">
                  <a href="" onClick={onLogout} className="d-flex text-body ms-0">
                    <i className="feather icon-log-out me-2 icon-md"></i>
                    <span>Log Out</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
