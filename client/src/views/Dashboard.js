import React from "react";
// react plugin used to create charts
import { Line, Bar, Doughnut,Pie } from "react-chartjs-2";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";


// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
  chartExample5,
  chartExample6,
  chartExample7,
  chartExample8,
  chartExample111,
  chartExample11,
  chartExample13,
  chartExample14
} from "variables/charts.js";

var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920
};

function Dashboard() {
  return (
    <>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Total staff</p>
                      <CardTitle tag="p">73</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <Row>
                  <Col sm="7">
                    <div className="footer-title">View all staff</div>
                  </Col>
                  <Col sm="5">
                    <div className="pull-right">
                      <Button
                        className="btn-round btn-icon"
                        color="danger"
                        size="sm"
                      >
                        <i className="nc-icon nc-button-play" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="4" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Staff on leave (Today)</p>
                      <CardTitle tag="p">2</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <Row>
                  <Col sm="7">
                    <div className="footer-title">View staff on leave</div>
                  </Col>
                  <Col sm="5">
                    <div className="pull-right">
                      <Button
                        className="btn-round btn-icon"
                        color="danger"
                        size="sm"
                      >
                        <i className="nc-icon nc-button-play" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="5" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Staff on leave (Next 30 days)</p>
                      <CardTitle tag="p">23</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <Row>
                  <Col sm="7">
                    <div className="footer-title">View staff on leave</div>
                  </Col>
                  <Col sm="5">
                    <div className="pull-right">
                      <Button
                        className="btn-round btn-icon"
                        color="danger"
                        size="sm"
                      >
                        <i className="nc-icon nc-button-play" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>

        </Row>

        <Row>

<Col md="3">
    <Card>
      <CardHeader>
        <CardTitle>Holiday Requests</CardTitle>
        <p className="card-category">Year to date</p>
      </CardHeader>
      <CardBody style={{ height: "250px" }}>
        <Pie
          data={chartExample11.data}
          options={chartExample11.options}
          width={456}
          height={300}
        />
      </CardBody>
      <CardFooter>
        <hr />
        <div className="stats">
          <i className="fa fa-clock-o" />
          Updated 1 day ago
        </div>
      </CardFooter>
    </Card>
  </Col>

  <Col md="3">
    <Card>
      <CardHeader>
        <CardTitle>Sick Requests</CardTitle>
        <p className="card-category">Year to date</p>
      </CardHeader>
      <CardBody style={{ height: "250px" }}>
        <Pie
          data={chartExample13.data}
          options={chartExample13.options}
          width={456}
          height={300}
        />
      </CardBody>
      <CardFooter>
        <hr />
        <div className="stats">
          <i className="fa fa-clock-o" />
          Updated 1 week ago
        </div>
      </CardFooter>
    </Card>
  </Col>

  


  <Col md="3">
    <Card>
      <CardHeader>
        <CardTitle>Staff Signed In Today</CardTitle>
        <p className="card-category">Out of total number</p>
      </CardHeader>
      <CardBody style={{ height: "253px" }}>
        <Doughnut
          data={chartExample8.data}
          options={chartExample8.options}
          className="ct-chart ct-perfect-fourth"
          height={300}
          width={456}
        />
      </CardBody>
      <CardFooter>

        <hr />
        <div className="stats">
          <i className="fa fa-clock-o" />
          Updated 5 minutes ago
        </div>
      </CardFooter>
    </Card>
  </Col>

  <Col md="3">
    <Card>
      <CardHeader>
        <CardTitle>Staff Signed Out Today</CardTitle>
        <p className="card-category">Out of total number</p>
      </CardHeader>
      <CardBody style={{ height: "253px" }}>
        <Doughnut
          data={chartExample14.data}
          options={chartExample14.options}
          className="ct-chart ct-perfect-fourth"
          height={300}
          width={456}
        />
      </CardBody>
      <CardFooter>

        <hr />
        <div className="stats">
          <i className="fa fa-clock-o" />
          Updated 2 minutes ago
        </div>
      </CardFooter>
    </Card>
  </Col>
</Row>


        <Row>
    
          <Col lg="4" sm="6">
            <Card>
              <CardHeader>
                <Row>
                  <Col sm="7">
                    <div className="numbers pull-left">65</div>
                  </Col>
                  <Col sm="5">
                    <div className="pull-right">
                      <Badge color="success" pill>
                        +18% Last month
                      </Badge>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <h6 className="big-title">
                  No. of holiday requests (Year to date)
                </h6>
                <Line
                  data={chartExample1.data}
                  options={chartExample1.options}
                  height={380}
                  width={826}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <Row>
                  <Col sm="7">
                    <div className="footer-title">View more details</div>
                  </Col>
                  <Col sm="5">
                    <div className="pull-right">
                      <Button
                        className="btn-round btn-icon"
                        color="success"
                        size="sm"
                      >
                        <i className="nc-icon nc-simple-add" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="4" sm="6">
            <Card>
              <CardHeader>
                <Row>
                  <Col sm="7">
                    <div className="numbers pull-left">38</div>
                  </Col>
                  <Col sm="5">
                    <div className="pull-right">
                      <Badge color="danger" pill>
                        +50% Last month
                      </Badge>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <h6 className="big-title">
                  No. of sick requests (Year to date)
                </h6>
                <Line
                  data={chartExample111.data}
                  options={chartExample111.options}
                  height={380}
                  width={826}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <Row>
                  <Col sm="7">
                    <div className="footer-title">View more details</div>
                  </Col>
                  <Col sm="5">
                    <div className="pull-right">
                      <Button
                        className="btn-round btn-icon"
                        color="success"
                        size="sm"
                      >
                        <i className="nc-icon nc-simple-add" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>

          <Col lg="4" sm="6">
            <Card>
              <CardHeader>
                <Row>
                  <Col sm="7">
                    <div className="numbers pull-left">16</div>
                  </Col>
                  <Col sm="5">
                    <div className="pull-right">
                      <Badge color="danger" pill>
                        +10% Last month
                      </Badge>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <h6 className="big-title">
                  No. of miscellaneous requests (Year to date)
                </h6>
                <Line
                  data={chartExample111.data}
                  options={chartExample111.options}
                  height={380}
                  width={826}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <Row>
                  <Col sm="7">
                    <div className="footer-title">View more details</div>
                  </Col>
                  <Col sm="5">
                    <div className="pull-right">
                      <Button
                        className="btn-round btn-icon"
                        color="success"
                        size="sm"
                      >
                        <i className="nc-icon nc-simple-add" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
          
        </Row>
        
 
      
      </div>
    </>
  );
}

export default Dashboard;
