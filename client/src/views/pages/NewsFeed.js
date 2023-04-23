import React from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardBody,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Row,
  Col
} from "reactstrap";

function NewsFeed() {
  return (
    <>
      <div className="content">
        <div className="header text-center">
          <h3 className="title">Latest News</h3>
        </div>
        <Row>
          <Col md="12">
            <Card className="card-timeline card-plain">
              <CardBody>
                <ul className="timeline">
                  <li className="timeline-inverted">
                    <div className="timeline-badge danger">
                      <i className="nc-icon nc-single-copy-04" />
                    </div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <Badge color="danger" pill>
                          Company Meeting
                        </Badge>
                      </div>
                      <div className="timeline-body">
                        <p>
                        We wanted to inform you that there will be a company-wide meeting next Monday at 10 am. Attendance is mandatory for all staff.
                        </p>
                      </div>
                      <h6>
                        <i className="fa fa-clock-o" />
                        11 hours ago
                      </h6>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-badge success">
                      <i className="nc-icon nc-sun-fog-29" />
                    </div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <Badge color="success" pill>
                          Benefit Package
                        </Badge>
                      </div>
                      <div className="timeline-body">
                        <p>
                        We are pleased to announce that the company has decided to offer a new benefit package starting next month. Please review the details provided in the email we sent to you earlier today.
                        </p>
                      </div>

                      <h6>
                        <i className="fa fa-clock-o" />
                        5 days ago
                      </h6>
                    </div>
                  </li>
                  <li className="timeline-inverted">
                    <div className="timeline-badge info">
                      <i className="nc-icon nc-world-2" />
                    </div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <Badge color="info" pill>
                          Work Anniversary
                        </Badge>
                      </div>
                      <div className="timeline-body">
                        <p>
                        Let's all congratulate Adam on his 2nd work anniversary! We appreciate your hard work and dedication to the company and look forward to many more years of working together.
                        </p>
                       
                      </div>

                      <h6>
                        <i className="fa fa-clock-o" />
                        2 weeks ago
                      </h6>
                    </div>
                  </li>
                  <li>
                    <div className="timeline-badge warning">
                      <i className="nc-icon nc-istanbul" />
                    </div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <Badge color="warning" pill>
                          Flexible Work
                        </Badge>
                      </div>
                      <div className="timeline-body">
                        <p>
                        We would like to remind our staff that we have a flexible work policy, which allows for remote work arrangements, flexible schedules, and job sharing. Please speak to your manager if you would like to explore these options.
                        </p>
                      </div>

                      <h6>
                        <i className="fa fa-clock-o" />
                        1 month ago
                      </h6>
                    </div>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default NewsFeed;
