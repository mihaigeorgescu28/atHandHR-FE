import React from "react";
import { Container, Row } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";

function Footer(props) {

  const navigate = useNavigate();

  const handleFooterLinks = (endURL) => {
    window.scrollTo(0, 0); // Scroll to the top of the page
    
    const baseURL = process.env.REACT_APP_WEBSITE_URL; // Fallback to localhost if not set
    console.log("baseurl", baseURL)
    const fullURL = `${baseURL}/${endURL}`;
    
    // Check if the endURL is valid
    if (endURL) {
        window.open(fullURL, '_blank'); // Open the constructed URL in a new tab
    } else {
        console.error("Invalid URL: endURL is undefined");
    }
};

  
  return (
    <footer className={"footer" + (props.default ? " footer-default" : "")} >
      
      <Container fluid={props.fluid ? true : false}>
      <Row>
      <nav className="footer-nav ">
    <div className="row align-items-center mb-0 text-center text-md-start">
        <div className="col-md-6">
        &copy; {1900 + new Date().getYear()} At Hand HR Limited
         
        </div>
        <div className="col-md-6 text-md-end mt-3 mt-md-0">
<ul className="list-inline mb-0">
<li className="me-3 list-inline-item">
<Link 
className="list-group-item-action" 
to="#"  // or omit this if not needed
onClick={() => {
        handleFooterLinks("terms-and-conditions"); // Call the handleLoginClick function
    }}
>
Terms & Conditions
</Link>
</li>
<li className="me-3 list-inline-item">
<Link 
className="list-group-item-action" 
to="#"  // or omit this if not needed
onClick={() => {
        handleFooterLinks("privacy-policy"); // Call the handleLoginClick function
    }}
>
Privacy Policy
</Link>
</li>
</ul>
</div>

</div>
      </nav>
      
    </Row>
      </Container>
    </footer>

  );
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool
};

export default Footer;
