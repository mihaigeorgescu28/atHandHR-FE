import React from "react";
import { Container, Row } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Footer(props) {

  const navigate = useNavigate();
  
  return (
    <footer className={"footer" + (props.default ? " footer-default" : "")} >
      <Container fluid={props.fluid ? true : false}>
      <Row>
      <nav className="footer-nav">
        <ul>
          <li>
            <a onClick={() => navigate("/auth/privacy-policy")} target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            
          </li>
          <li>
            <a onClick={() => navigate("/auth/terms-and-conditions")} target="_blank" rel="noopener noreferrer">
              Terms & Conditions
            </a>
          </li>
        </ul>
      </nav>
      <div className="credits ml-auto">
        <span className="copyright">
          &copy; {1900 + new Date().getYear()} At Hand HR Limited
        </span>
      </div>
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
