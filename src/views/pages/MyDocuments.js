import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardText, Button, Row, Col } from 'reactstrap';

function MyDocuments() {
  return (
    <div className="content">
      <Row>
        <Col md="6">
        <Card style={{width: '20rem'}}>
    <CardImg top src="img-src" alt="..."/>
    <CardBody>
        <CardTitle>Contract</CardTitle>
        <Button color="primary">View</Button>
    </CardBody>
</Card>
</Col>
</Row>
<Row>
  <Col>
<Card style={{width: '20rem'}}>
    <CardImg top src="img-src" alt="..."/>
    <CardBody>
        <CardTitle>Sickness Policy</CardTitle>
        <Button color="primary">View</Button>
    </CardBody>
</Card>
        </Col>
        {/* Add more Col components for additional panels */}
      </Row>
      <Row>
  <Col>
<Card style={{width: '20rem'}}>
    <CardImg top src="img-src" alt="..."/>
    <CardBody>
        <CardTitle>Holiday Policy</CardTitle>
        <Button color="primary">View</Button>
    </CardBody>
</Card>
        </Col>
        {/* Add more Col components for additional panels */}
      </Row>
    </div>
  );
}

export default MyDocuments;
