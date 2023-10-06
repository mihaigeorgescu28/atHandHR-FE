import React, { useState,useEffect } from "react";
// react plugin used to create charts
import { Line, Bar, Doughnut,Pie } from "react-chartjs-2";

// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";

import TotalStaffTable from "./tables/TotalStaffTable.js";
import StaffOnLeaveTable from "./tables/StaffOnLeave.js";
import axios from 'axios';

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


function Dashboard() {

  const [openDrilldown, setOpenDrilldown] = useState(null);
  const [totalStaffCount, setTotalStaffCount] = useState(null);
  const [staffOnLeaveCount, setStaffOnLeaveCount] = useState(null);
  const [staffOnLeaveCountNext30Days, setStaffOnLeaveCountNext30Days] = useState(null);
  const [lastHolidayLeaveUpdated, setLastHolidayLeaveUpdated] = useState(null);
  const [lastSickLeaveUpdated, setLastSickLeaveUpdated] = useState(null);
  const [lastSignInUpdated, setLastSignInUpdated] = useState(null);
  const [lastSignOutUpdated, setLastSignOutUpdated] = useState(null);
  const [numberOfHolidayRequests, setNumberOfHolidayRequests] = useState(null);
  const [numberOfSickRequests, setNumberOfSickRequests] = useState(null);
  const [numberOfMiscellaneousRequests, setNumberOfMiscellaneousRequests] = useState(null);
  const [leaveRequestData, setLeaveRequestData] = useState({});
  const [tableDateRange, setTableDateRange] = useState({});

  const apiUrl = process.env.REACT_APP_APIURL;

  // Create a function to extract data for the chart
const createChartData = () => {
  const labels = Object.keys(leaveRequestData);
  const holidayData = labels.map(month => leaveRequestData[month].NumberOfHolidayRequests);
  const sickData = labels.map(month => leaveRequestData[month].NumberOfSickRequests);
  const miscellaneousData = labels.map(month => leaveRequestData[month].NumberOfMiscellaneousRequests);

  return {
    labels,
    datasets: [
      {
        label: "Holiday Requests",
        borderColor: "#6bd098",
        pointRadius: 0,
        pointHoverRadius: 0,
        fill: false,
        borderWidth: 3,
        barPercentage: 1.6,
        tension: 0.4,
        data: holidayData,
      },
      {
        label: "Sick Requests",
        borderColor: "#ff9900",
        pointRadius: 0,
        pointHoverRadius: 0,
        fill: false,
        borderWidth: 3,
        barPercentage: 1.6,
        tension: 0.4,
        data: sickData,
      },
      {
        label: "Miscellaneous Requests",
        borderColor: "#f76578",
        pointRadius: 0,
        pointHoverRadius: 0,
        fill: false,
        borderWidth: 3,
        barPercentage: 1.6,
        tension: 0.4,
        data: miscellaneousData,
      },
    ],
  };
};



  const handleToggleDrilldown = (drilldownName, dateRange) => {
    if (openDrilldown === drilldownName) {
      setOpenDrilldown(null); // Close the currently open drilldown
      console.log("closing: ", drilldownName)
    } else {
      setOpenDrilldown(drilldownName); // Open the requested drilldown
      setTableDateRange(dateRange);
      console.log("opening: ", drilldownName)
    }
  };

  const [chartData, setChartData] = useState({
    labels: ['Declined', 'Approved', 'Outstanding'],
    datasets: [
      {
        label: 'Emails',
        pointRadius: 0,
        pointHoverRadius: 0,
        backgroundColor: ['#f17e5d', '#4acccd', '#fcc468'],
        borderWidth: 0,
        barPercentage: 1.6,
        data: [542, 480, 430], // Initialize with static data
      },
    ],
  });

  const [sickRequestPieChart, setSickRequestPieChart] = useState({
    labels: ['Declined', 'Approved', 'Outstanding'],
    datasets: [
      {
        label: 'Emails',
        pointRadius: 0,
        pointHoverRadius: 0,
        backgroundColor: ['#f17e5d', '#4acccd', '#fcc468'],
        borderWidth: 0,
        barPercentage: 1.6,
        data: [542, 480, 430], // Initialize with static data
      },
    ],
  });


  const [signOutChart, setSignOutChart] = useState({
    data: {
      labels: ['Signed In', 'Pending'],
      datasets: [
        {
          label: "Emails",
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: ["#66615b", "#f4f3ef"],
          borderWidth: 0,
          barPercentage: 1.6,
          data: [82, 18]
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        title: {
          display: true,
          text: "82%",
          position: "bottom",
          color: "#66615c",
          font: {
            weight: 400,
            size: 30
          }
        }
      },
      maintainAspectRatio: false,
      cutout: "90%",
      scales: {
        y: {
          ticks: {
            display: false
          },
          grid: {
            drawBorder: false,
            display: false
          }
        },
        x: {
          grid: {
            drawBorder: false,
            display: false
          },
          ticks: {
            display: false
          }
        }
      }
    }
  });

    const [signInChart, setSignInChart] = useState({
      data: {
        labels: ['Signed In', 'Pending'],
        datasets: [
          {
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: ["#66615b", "#f4f3ef"],
            borderWidth: 0,
            barPercentage: 1.6,
            data: [82, 18]
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltips: {
            enabled: false
          },
          title: {
            display: true,
            text: "82%",
            position: "bottom",
            color: "#66615c",
            font: {
              weight: 400,
              size: 30
            }
          }
        },
        maintainAspectRatio: false,
        cutout: "90%",
        scales: {
          y: {
            ticks: {
              display: false
            },
            grid: {
              drawBorder: false,
              display: false
            }
          },
          x: {
            grid: {
              drawBorder: false,
              display: false
            },
            ticks: {
              display: false
            }
          }
        }
      }
    });

    const [holidayMonthlyChart, setHolidayMonthlyChart] = useState({
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      datasets: [
        {
          label: "Active Users",
          borderColor: "#6bd098",
          pointRadius: 0,
          pointHoverRadius: 0,
          fill: false,
          borderWidth: 3,
          barPercentage: 1.6,
          tension: 0.4,
          data: [0, 2, 3, 1, 5, 2, 6, 7, 3, 1,3,5]
        }
      ]
    });

    const [sickMonthlyChart, setSickMonthlyChart] = useState({
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      datasets: [
        {
          label: "Active Users",
          borderColor: "#6bd098",
          pointRadius: 0,
          pointHoverRadius: 0,
          fill: false,
          borderWidth: 3,
          barPercentage: 1.6,
          tension: 0.4,
          data: [0, 2, 3, 1, 5, 2, 6, 7, 3, 1,3,5]
        }
      ]
    });

    const [miscellaneousChart, setMiscellaneousChart] = useState({
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      datasets: [
        {
          label: "Active Users",
          borderColor: "#6bd098",
          pointRadius: 0,
          pointHoverRadius: 0,
          fill: false,
          borderWidth: 3,
          barPercentage: 1.6,
          tension: 0.4,
          data: [0, 2, 3, 1, 5, 2, 6, 7, 3, 1,3,5]
        }
      ]
    });

  
  const optionsMonthlyChart = {
      plugins: {
        legend: {
          display: false
        },
  
        tooltips: {
          enabled: false
        }
      },
  
      scales: {
        y: {
          ticks: {
            color: "#9f9f9f",
            beginAtZero: false,
            maxTicksLimit: 5
            //padding: 20
          },
          grid: {
            drawBorder: false,
            display: false
          }
        },
        x: {
          grid: {
            drawBorder: false,
            display: false
          },
          ticks: {
            padding: 20,
            color: "#9f9f9f"
          }
        }
      }
  }

  const optionsPieChart = {
    plugins: {
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          display: false,
        },
        grid: {
          drawBorder: false,
          zeroLineColor: 'transparent',
          color: 'rgba(255,255,255,0.05)',
        },
      },
      x: {
        grid: {
          drawBorder: false,
          color: 'rgba(255,255,255,0.1)',
          zeroLineColor: 'transparent',
        },
        ticks: {
          display: false,
        },
      },
    },
  };

 
// updated X days ago 
  useEffect(() => {
    // Get the ClientID from local storage
    const clientID = localStorage.getItem('ClientID');
  
    axios.get(`${apiUrl}/leaveRequestLastUpdated?ClientID=${clientID}&LeaveTypeID=1`)
      .then((response) => {
        if (response.data.length > 0) {
          setLastHolidayLeaveUpdated(response.data[0].LastUpdatedLeaveDate);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    axios.get(`${apiUrl}/leaveRequestLastUpdated?ClientID=${clientID}&LeaveTypeID=2`)
      .then((response) => {
        if (response.data.length > 0) {
          setLastSickLeaveUpdated(response.data[0].LastUpdatedLeaveDate);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    axios.get(`${apiUrl}/SignInOutLastUpdated?ClientID=${clientID}&ActionTypeID=1`)
      .then((response) => {
        if (response.data.length > 0) {
          setLastSignInUpdated(response.data[0].LastSignInOutLeaveDate);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    axios.get(`${apiUrl}/SignInOutLastUpdated?ClientID=${clientID}&ActionTypeID=2`)
      .then((response) => {
        if (response.data.length > 0) {
          setLastSignOutUpdated(response.data[0].LastSignInOutLeaveDate);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    
  }, []);


  useEffect(() => {
    // Get the ClientID from local storage
    const clientID = localStorage.getItem('ClientID');
  
    axios.get(`${apiUrl}/leaveRequestsReport?ClientID=${clientID}&LeaveTypeID=1`)
      .then((response) => {
        if (response.data.length > 0) {
          const newData = {
            labels: ['Declined', 'Approved', 'Requested'],
            datasets: [
              {
                label: 'Emails',
                pointRadius: 0,
                pointHoverRadius: 0,
                backgroundColor: ['#f17e5d', '#4acccd', '#fcc468'],
                borderWidth: 0,
                barPercentage: 1.6,
                data: response.data, // Use the response data directly
              },
            ],
          };
          setChartData(newData);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    // Get the ClientID from local storage
    const clientID = localStorage.getItem('ClientID');
  
    axios.get(`${apiUrl}/leaveRequestsReport?ClientID=${clientID}&LeaveTypeID=2`)
      .then((response) => {
        if (response.data.length > 0) {
          const newData = {
            labels: ['Declined', 'Approved', 'Requested'],
            datasets: [
              {
                label: 'Emails',
                pointRadius: 0,
                pointHoverRadius: 0,
                backgroundColor: ['#f17e5d', '#4acccd', '#fcc468'],
                borderWidth: 0,
                barPercentage: 1.6,
                data: response.data, // Use the response data directly
              },
            ],
          };
          setSickRequestPieChart(newData);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  // total staff, staff on leave (today), staff on leave (next 30 days)
  useEffect(() => {
    // Get the ClientID from local storage
    const clientID = localStorage.getItem('ClientID');

    // Make the API call using Axios for combined data
    axios.get(`${apiUrl}/countStaffData?ClientID=${clientID}`)
      .then(response => {
        if (response.data) {
          const {
            TotalStaff,
            StaffOnLeave,
            StaffOnLeaveNext30Days
          } = response.data;

          // Update the existing states with the API response data
          setTotalStaffCount(TotalStaff);
          setStaffOnLeaveCount(StaffOnLeave);
          setStaffOnLeaveCountNext30Days(StaffOnLeaveNext30Days);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

// SIGN OUT REPORT
useEffect(() => {
  // Get the ClientID from local storage
  const clientID = localStorage.getItem('ClientID');


  axios.get(`${apiUrl}/SignInOutReportToday?ClientID=${clientID}&ActionTypeID=2`)
    .then((response) => {
      if (Object.keys(response.data).length > 0) {
        const SignOutChart = {
          data: {
            labels: ['Signed Out', 'Pending'],
            datasets: [
              {
                label: "Emails",
                pointRadius: 0,
                pointHoverRadius: 0,
                backgroundColor: ["#66615b", "#f4f3ef"],
                borderWidth: 0,
                barPercentage: 1.6,
                data: response.data.SignInOutPending
              }
            ]
          },
          options: {
            plugins: {
              legend: {
                display: false
              },
              tooltips: {
                enabled: false
              },
              title: {
                display: true,
                text: response.data.PercentageOfUsersSignedInOutToday + '%',
                position: "bottom",
                color: "#66615c",
                font: {
                  weight: 400,
                  size: 30
                }
              }
            },
            maintainAspectRatio: false,
            cutout: "90%",
            scales: {
              y: {
                ticks: {
                  display: false
                },
                grid: {
                  drawBorder: false,
                  display: false
                }
              },
              x: {
                grid: {
                  drawBorder: false,
                  display: false
                },
                ticks: {
                  display: false
                }
              }
            }
          }
        };

        // Update the state with the new data
        setSignOutChart(SignOutChart);

      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}, []);

// SIGN IN REPORT
useEffect(() => {
  // Get the ClientID from local storage
  const clientID = localStorage.getItem('ClientID');


  axios.get(`${apiUrl}/SignInOutReportToday?ClientID=${clientID}&ActionTypeID=1`)
    .then((response) => {
      if (Object.keys(response.data).length > 0) {
        const SignInChart = {
          data: {
            labels: ['Signed In', 'Pending'],
            datasets: [
              {
                label: "Emails",
                pointRadius: 0,
                pointHoverRadius: 0,
                backgroundColor: ["#66615b", "#f4f3ef"],
                borderWidth: 0,
                barPercentage: 1.6,
                data: response.data.SignInOutPending
              }
            ]
          },
          options: {
            plugins: {
              legend: {
                display: false
              },
              tooltips: {
                enabled: false
              },
              title: {
                display: true,
                text: response.data.PercentageOfUsersSignedInOutToday + '%',
                position: "bottom",
                color: "#66615c",
                font: {
                  weight: 400,
                  size: 30
                }
              }
            },
            maintainAspectRatio: false,
            cutout: "90%",
            scales: {
              y: {
                ticks: {
                  display: false
                },
                grid: {
                  drawBorder: false,
                  display: false
                }
              },
              x: {
                grid: {
                  drawBorder: false,
                  display: false
                },
                ticks: {
                  display: false
                }
              }
            }
          }
        };

        // Update the state with the new data
        setSignInChart(SignInChart);

      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}, []);


useEffect(() => {
  // Get the ClientID from local storage
  const clientID = localStorage.getItem('ClientID');

  // Make the API call using Axios to fetch all three values in one request
  axios.get(`${apiUrl}/CurrentNumberOfLeaveRequests?ClientID=${clientID}`)
    .then(response => {
      const {
        NumberOfHolidayRequests,
        NumberOfSickRequests,
        NumberOfMiscellaneousRequests
      } = response.data;

      // Update the state with the API response data
      setNumberOfHolidayRequests(NumberOfHolidayRequests);
      setNumberOfSickRequests(NumberOfSickRequests);
      setNumberOfMiscellaneousRequests(NumberOfMiscellaneousRequests);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);

useEffect(() => {
  // Get the ClientID from local storage
  const clientID = localStorage.getItem('ClientID');

  // Make the API call using Axios to fetch all three values in one request
  axios.get(`${apiUrl}/CurrentNumberOfLeaveRequestsByMonth?ClientID=${clientID}`)
    .then(response => {
      // Update the state with the API response data
      setLeaveRequestData(response.data);
      
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);

useEffect(() => {
  // Call createChartData to generate chart data when leaveRequestData updates
  const chartData = createChartData();
  
  // Extract the first dataset from chartData and store it in a separate variable
  const holidayDataset = chartData.datasets[0];
  const sickDataset = chartData.datasets[1];
  const miscellaneousDataset = chartData.datasets[2];
  
  setHolidayMonthlyChart((prevChart) => ({
    ...prevChart,
    datasets: [holidayDataset], // Only the first dataset
  }));

  setSickMonthlyChart((prevChart) => ({
    ...prevChart,
    datasets: [sickDataset], // Only the first dataset
  }));

  setMiscellaneousChart((prevChart) => ({
    ...prevChart,
    datasets: [miscellaneousDataset], // Only the first dataset
  }));

  

}, [leaveRequestData]);



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
                      <CardTitle tag="p">  {totalStaffCount !== null ? totalStaffCount : 'Loading...'}
                      
                      </CardTitle>
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
                        <i className="nc-icon nc-button-play"
                        onClick={() => handleToggleDrilldown('totalStaff', 0)} />
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
                      <CardTitle tag="p"> {staffOnLeaveCount !== null ? staffOnLeaveCount : 'Loading...'} </CardTitle>
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
                        <i className="nc-icon nc-button-play"
                        onClick={() => handleToggleDrilldown('staffOnLeave', 0)} />
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
                      <CardTitle tag="p"> {staffOnLeaveCountNext30Days !== null ? staffOnLeaveCountNext30Days : 'Loading...'} </CardTitle>
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
                        <i className="nc-icon nc-button-play"
                         onClick={() => handleToggleDrilldown('staffOnLeave30Days', 30)} />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>

          <Row>
          {openDrilldown === 'totalStaff' ? (
  <TotalStaffTable />
) : openDrilldown === 'staffOnLeave' ? (
  <StaffOnLeaveTable TableDateRange={tableDateRange} />
) : openDrilldown === 'staffOnLeave30Days' ? (
  <StaffOnLeaveTable TableDateRange={tableDateRange} />
)
:  null}

</Row>

        

<Col md="3">
    <Card>
      <CardHeader>
        <CardTitle>Holiday Requests</CardTitle>
        <p className="card-category">Year to date</p>
      </CardHeader>
      <CardBody style={{ height: "250px" }}>
        <Pie
          data={chartData}
          options={optionsPieChart}
          width={456}
          height={300}
        />
      </CardBody>
      <CardFooter>
        <hr />
        <div className="stats">
          <i className="fa fa-clock-o" />
          Updated  {lastHolidayLeaveUpdated !== null ? lastHolidayLeaveUpdated : 'Loading...'} ago
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
          data={sickRequestPieChart}
          options={optionsPieChart}
          width={456}
          height={300}
        />
      </CardBody>
      <CardFooter>
        <hr />
        <div className="stats">
          <i className="fa fa-clock-o" />
          Updated  {lastSickLeaveUpdated !== null ? lastSickLeaveUpdated : 'Loading...'} ago
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
          data={signInChart.data}
          options={signInChart.options}
          className="ct-chart ct-perfect-fourth"
          height={300}
          width={456}
        />
      </CardBody>
      <CardFooter>

        

        <hr />
        <div className="stats">
          <i className="fa fa-clock-o" />
          Updated {lastSignInUpdated !== null ? lastSignInUpdated : 'Loading...'} ago
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
          data={signOutChart.data}
          options={signOutChart.options}
          className="ct-chart ct-perfect-fourth"
          height={300}
          width={456}
        />
      </CardBody>
      <CardFooter>

        <hr />
        <div className="stats">
          <i className="fa fa-clock-o" />
          Updated {lastSignOutUpdated !== null ? lastSignOutUpdated : 'Loading...'} ago
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
                    <div className="numbers pull-left"> {numberOfHolidayRequests !== null ? numberOfHolidayRequests : 'Loading...'} </div>
                  </Col>
                  <Col sm="5">
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <h6 className="big-title">
                  No. of holiday requests (Year to date)
                </h6>
                <Line
                  data={holidayMonthlyChart}
                  options={optionsMonthlyChart}
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
                    <div className="numbers pull-left"> {numberOfSickRequests !== null ? numberOfSickRequests : 'Loading...'} </div>
                  </Col>
                  <Col sm="5">
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <h6 className="big-title">
                  No. of sick requests (Year to date)
                </h6>
                <Line
                  data={sickMonthlyChart}
                  options={optionsMonthlyChart}
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
                    <div className="numbers pull-left"> {numberOfMiscellaneousRequests !== null ? numberOfMiscellaneousRequests : 'Loading...'} </div>
                  </Col>
                  <Col sm="5">
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <h6 className="big-title">
                  No. of miscellaneous requests (Year to date)
                </h6>
                <Line
                  data={miscellaneousChart}
                  options={optionsMonthlyChart}
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
