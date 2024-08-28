import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/img/business/athandhrlogo_transparent_small.png';

function WebsiteFooter() {
    const [Visible, setVisible] = useState(false)
    const [loader, setLoader] = useState(true);
    const handleLoginClick = () => {
        const fullURL = process.env.REACT_APP_URL;
        const loginURL = `${fullURL}/auth/login`;
        // Redirect to the constructed login URL
        window.location.href = loginURL;
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
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (loader === true) {
            setTimeout(() => setLoader(false), 2000);
        }
    }, [loader]);
    const gototop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
    return (
        <>
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-5 col-xl-4 me-auto mb-5 mb-lg-0">
                        <Link to="/">
    <img src={logo} style={{ width: '80px', height: 'auto' }} alt="AT HAND HR" className="logo-image" />
</Link>
                            <p className="my-3">
                            </p>
                            <ul className="list-inline">
                            <li className="list-inline-item">
    <a className="border rounded px-2 py-1 text-dark" href="https://www.linkedin.com/company/at-hand-hr/" target="_blank" rel="noopener noreferrer">
        <i className="la la-linkedin"></i>
    </a>
</li>

                            </ul>
                        </div>
                        <div className="col-12 col-lg-6 col-xl-7">
    <div className="row">
        <div className="col-12 col-sm-4 navbar-light">
            <h5 className="mb-4">Pages</h5>
            <ul className="list-unstyled mb-0">
                <li className="mb-3">
                    <Link 
                        className="list-group-item-action" 
                        to="/" 
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        Home
                    </Link>
                </li>
                <li className="mb-3">
                    <Link 
                        className="list-group-item-action" 
                        to="/about-us" 
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        About Us
                    </Link>
                </li>
            </ul>
        </div>
        <div className="col-12 col-sm-4 mt-6 mt-sm-0 navbar-light">
            <h5 className="mb-4">App</h5>
            <ul className="list-unstyled mb-0">
                <li className="mb-3">
                    <Link 
                        className="list-group-item-action" 
                        to="#"  // or omit this if not needed
    onClick={() => {
        handleLoginClick(); // Call the handleLoginClick function
    }}   
                    >
                        Login
                    </Link>
                </li>
            </ul>
        </div>
        <div className="col-12 col-sm-4 mt-6 mt-sm-0 navbar-light">
            <h5 className="mb-4">Contact Us</h5>
            <div className="mb-3">
                <p className="mb-0 text-muted">
                    support@athandhr.com
                </p>
            </div>
        </div>
    </div>
</div>

                    </div>
                    <div className="row my-5">
                        <div className="col">
                            <hr className="m-0" />
                        </div>
                    </div>
                    <div className="row align-items-center mb-5">
                        <div className="col-md-6">
                        &copy; {1900 + new Date().getYear()} At Hand HR Limited
                         
                        </div>
                        <div className="col-md-6 text-md-end mt-3 mt-md-0">
    <ul className="list-inline mb-0">
        <li className="me-3 list-inline-item">
            <Link 
                className="list-group-item-action" 
                to="/terms-and-conditions"
                onClick={() => window.scrollTo(0, 0)}
            >
                Terms & Conditions
            </Link>
        </li>
        <li className="me-3 list-inline-item">
            <Link 
                className="list-group-item-action" 
                to="/privacy-policy"
                onClick={() => window.scrollTo(0, 0)}
            >
                Privacy Policy
            </Link>
        </li>
    </ul>
</div>

                    </div>
                </div>
            </footer>
            <div className={`${Visible ? 'scroll-top' : ''}`} >
                <div class="smoothscroll" onClick={gototop}>Scroll Top</div>
            </div>
        </>
    )
}

export default WebsiteFooter
