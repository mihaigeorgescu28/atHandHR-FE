import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/business/athandhrlogo_transparent_small.png'; 
import {
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    NavItem,
    NavLink,
    Navbar,
    UncontrolledDropdown,
} from 'reactstrap';
import navLinks from '../../views/helper/NavLinks.js';
const WebsiteNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const [loader, setLoader] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [isCartview, setIsCartview] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggle = () => {
        setIsOpen(!isOpen);
    };
    const [openMenus, setOpenMenus] = useState([]);

    const toggleMenu = (index) => {
        if (openMenus.includes(index)) {
            setOpenMenus(openMenus.filter((item) => item !== index));
        } else {
            setOpenMenus([...openMenus, index]);
        }
    };
    const closeAllMenus = () => {
        setOpenMenus([]);
    };
    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setIsCartview(false);
        }
    };
    const handleScroll = () => {
        var scrollTop =
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop;
        if (scrollTop > 100) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    useEffect(() => {
        if (loader) {
            const timeout = setTimeout(() => {
                setLoader(false);
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [loader]);


    return (
        <header id="site-header" className="header">
            {!loader ? (
                <div id="header-wrap" className={`${visible ? 'fixed-header ' : ''}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                {/* Navbar */}
                                <Navbar className="navbar navbar-expand-lg navbar-light">
                                

                                    <button
                                        className="navbar-toggler"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target="#navbarNavDropdown"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation"
                                        onClick={toggle}
                                    >
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <Collapse
                                        isOpen={isOpen}
                                        className="collapse navbar-collapse"
                                        navbar

                                    >
                                        <Nav className="mx-auto" navbar>
                                            {navLinks.map((navLink, index) => (
                                                <NavItem key={index}>
                                                    {navLink.type && navLink.type === "subMenu" ? (
                                                        <UncontrolledDropdown nav inNavbar isOpen={openMenus.includes(index)}
                                                            toggle={() => toggleMenu(index)}
                                                            onMouseLeave={closeAllMenus}>
                                                            <DropdownToggle nav caret  >
                                                                {navLink.menu_title}
                                                            </DropdownToggle>
                                                            <DropdownMenu
                                                                id={`submenu_${index}`}
                                                                className="dropdown-menu"

                                                            >
                                                                {navLink.child_routes &&
                                                                    navLink.child_routes.map((subNavLink, keys) =>
                                                                        subNavLink.type &&
                                                                            subNavLink.type === "childsubMenu" ? (
                                                                            <UncontrolledDropdown
                                                                                inNavbar
                                                                                className="dropdown-submenu"
                                                                                key={keys}
                                                                            >
                                                                                <DropdownToggle
                                                                                    tag="a"
                                                                                    caret
                                                                                    className="dropdown-item dropdown-toggle cursor-pointe"
                                                                                >
                                                                                    {subNavLink.menu_title}
                                                                                </DropdownToggle>
                                                                                {/* Sub Menu Start */}
                                                                                <DropdownMenu
                                                                                    id={`childsubmenu_${keys}`}
                                                                                    className="dropdown-menu"
                                                                                >
                                                                                    {subNavLink.child_routes &&
                                                                                        subNavLink.child_routes.map(
                                                                                            (ChildsubNavLink, i) => (
                                                                                                <DropdownItem
                                                                                                    key={i}
                                                                                                    tag={Link}
                                                                                                    to={ChildsubNavLink.path}

                                                                                                >
                                                                                                    {ChildsubNavLink.menu_title}
                                                                                                </DropdownItem>
                                                                                            )
                                                                                        )}
                                                                                </DropdownMenu>
                                                                                {/* Sub Menu End */}
                                                                            </UncontrolledDropdown>
                                                                        ) : (
                                                                            <ul className="list-unstyled" key={keys}>
                                                                                <li>
                                                                                    <DropdownItem
                                                                                        tag={Link}
                                                                                        to={subNavLink.path}
                                                                                    >
                                                                                        {subNavLink.menu_title}
                                                                                    </DropdownItem>
                                                                                </li>
                                                                            </ul>
                                                                        )
                                                                    )}
                                                            </DropdownMenu>
                                                        </UncontrolledDropdown>
                                                    ) : (
                                                        <NavLink href={navLink.path} >
                                                            {navLink.menu_title}
                                                        </NavLink>
                                                    )}
                                                </NavItem>
                                            ))}
                                        </Nav>
                                    </Collapse>
                                    <div className="d-sm-flex align-items-center justify-content-end">
                                        <Link className="btn btn-primary btn-sm ms-3 d-sm-inline-block d-none" to="auth/login">Login</Link>
                                    </div>
                                </Navbar>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div id="ht-preloader">
                <div className="loader clear-loader">
                    <img src={logo} style={{ width: '150px', height: 'auto' }} alt="AT HAND HR" className="animated-image" />
                </div>
            </div>
            
            )}
        </header>
    );
};

export default WebsiteNavbar;
