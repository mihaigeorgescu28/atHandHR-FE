import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import CountUp from 'react-countup';

const counters = [
  { icon: "flaticon-project", end: 5, label: "Companies Trust Us", duration: 3 },
  { icon: "flaticon-group", end: 100, label: "Leave Requests Managed", duration: 6 },
  { icon: "flaticon-opinion", end: 50, label: "Documents Secured", duration: 6 },
  { icon: "flaticon-affection", end: 24, label: "Support Available", duration: 6, is24_7: true },
];

function Counter() {
  return (
    <section>
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg="8">
            <div className="mb-5">
              <h2><span className="font-w-4 d-block"></span> Innovation at Our Core</h2>
              <p className="lead mb-0">Going above and beyond to exceed expectations with cutting-edge solutions.</p>
            </div>
          </Col>
        </Row>
        <Row className="align-items-center text-center">
          {counters.map((counter, index) => (
            <Col key={index} xs="12" sm="6" lg="3" className={index > 0 ? "mt-4 mt-lg-0" : ""}>
              <div>
                <div className="d-flex align-items-center justify-content-center">
                  <i className={`ic-3x text-primary me-2 ${counter.icon}`} />
                  <CountUp
                    className="count-number display-4 text-dark"
                    end={counter.end}
                    duration={counter.duration}
                  />
                  {counter.is24_7 ? (
                    <span className="display-4 text-dark">/7</span>
                  ) : (
                    <span className="display-4 text-dark">+</span>
                  )}
                </div>
                <h6 className="text-light mb-0">{counter.label}</h6>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Counter;
