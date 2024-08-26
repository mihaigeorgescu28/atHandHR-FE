import React from "react";
import { Card, CardBody, CardTitle, Button, Row, Col } from 'reactstrap';
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from React Router

function SiteMap() {
  const navigate = useNavigate(); 

  const handleViewNewsfeed = () => {
    navigate('/admin/sitemap/newsfeed');
  };

  const handleViewPositions = () => {
    navigate('/admin/sitemap/positions');
  };

  const handleViewLeaveTypes = () => {
    navigate('/admin/sitemap/leave-types'); 
  };

  const handleClientDefaults = () => {
    navigate('/admin/sitemap/client-defaults'); 
  };

  return (
    <div className="content">
      <Row>
        <Col md="4">
          <Card style={{width: '24rem'}}>
            <CardBody className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <i className="nc-icon nc-bell-55 mr-2" style={{ fontSize: '35px' }} />
                <CardTitle style={{ marginTop: '12px' }}>Newsfeed</CardTitle>
              </div>
              <Button size="sm" type="submit" className="btn-round" color="info" onClick={handleViewNewsfeed}>View</Button> {/* Attach onClick event handler */}
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card style={{width: '24rem'}}>
            <CardBody className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <i className="nc-icon nc-briefcase-24 mr-2" style={{ fontSize: '35px' }} />
                <CardTitle style={{ marginTop: '12px' }}>Employee Positions</CardTitle>
              </div>
              <Button size="sm" type="submit" className="btn-round" color="info" onClick={handleViewPositions}>View</Button> {/* Attach onClick event handler */}
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card style={{width: '24rem'}}>
            <CardBody className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <i className="nc-icon nc-calendar-60" style={{ fontSize: '35px' }} />
                <CardTitle style={{ marginTop: '12px', paddingLeft: '10px' }}>Leave Types</CardTitle>
              </div>
              <Button size="sm" type="submit" className="btn-round" color="info" onClick={handleViewLeaveTypes}>View</Button> {/* Attach onClick event handler */}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
      <Col md="4">
          <Card style={{width: '24rem'}}>
            <CardBody className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <i className="nc-icon nc-vector" style={{ fontSize: '35px' }} />
                <CardTitle style={{ marginTop: '12px', paddingLeft: '10px' }}>Client Defaults</CardTitle>
              </div>
              <Button size="sm" type="submit" className="btn-round" color="info" onClick={handleClientDefaults}>View</Button> {/* Attach onClick event handler */}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default SiteMap;
