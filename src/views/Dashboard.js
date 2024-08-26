import React, { useState,useEffect,useRef } from "react";
// react plugin used to create charts
import { Line, Bar, Doughnut,Pie } from "react-chartjs-2";

import TotalStaffTable from "./tables/TotalStaffTable.js";
import StaffOnLeaveTable from "./tables/StaffOnLeave.js";
import LeaveRequestsTable from "./tables/LeaveRequestsTable.js";
import TimeManagementTable from "./tables/TimeManagementTable.js";
import CustomPieChart from './CustomPieChart'; 
import CustomDoughnutChart from "./CustomDoughnutChart.js";
import CustomLineChart from "./CustomLineChart.js";
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
  const [tableDateRange, setTableDateRange] = useState("");
  const [leaveStatusID, setLeaveStatusID] = useState({});
  const [leaveTypeGroupID, setLeaveTypeGroupID] = useState({});
  const [leaveType, setLeaveType] = useState({});
  const [actionTypeID, setActionTypeID] = useState({});
  const [timeManagementStatus, setTimeManagementStatus] = useState({});
  const [panelName, setPanelName] = useState(null);
  const [datasetName, setDatasetName] = useState(null);

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
const fetchUpdatedData = async () => {
  try {
    const clientID = localStorage.getItem('ClientID');
    const response = await axios.get(`${apiUrl}/leave/countStaffData?ClientID=${clientID}`);
    
    if (response.data) {
      const {
        TotalStaff,
        StaffOnLeave,
        StaffOnLeaveNext30Days
      } = response.data;

      setTotalStaffCount(TotalStaff);
      setStaffOnLeaveCount(StaffOnLeave);
      setStaffOnLeaveCountNext30Days(StaffOnLeaveNext30Days);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const fetchLeaveUpdatedData = async () => {
  try {
    // Get the ClientID from local storage
    const clientID = localStorage.getItem('ClientID');
  
    axios.get(`${apiUrl}/leave/leaveRequestLastUpdated?ClientID=${clientID}&LeaveTypeID=1`)
      .then((response) => {
        if (response.data.length > 0) {
          setLastHolidayLeaveUpdated(response.data[0].LastUpdatedLeaveDate);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    axios.get(`${apiUrl}/leave/leaveRequestLastUpdated?ClientID=${clientID}&LeaveTypeID=2`)
      .then((response) => {
        if (response.data.length > 0) {
          setLastSickLeaveUpdated(response.data[0].LastUpdatedLeaveDate);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

      axios.get(`${apiUrl}/leave/leaveRequestsStatus?ClientID=${clientID}&LeaveTypeGroupID=2`)
      .then((response) => {
        if (response.data.length > 0) {
          const newData = {
            labels: ['Declined', 'Approved', 'Requested'],
            datasets: [
              {
                label: 'Holiday',
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

      axios.get(`${apiUrl}/leave/leaveRequestsStatus?ClientID=${clientID}&LeaveTypeGroupID=1`)
      .then((response) => {
        if (response.data.length > 0) {
          const newData = {
            labels: ['Declined', 'Approved', 'Requested'],
            datasets: [
              {
                label: 'Sick',
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

      axios.get(`${apiUrl}/leave/leaveRequestsType?ClientID=${clientID}&LeaveTypeGroupID=2&StatusID=1`)
      .then((response) => {
        if (response.data.length > 0) {
          // Extract LeaveTypeName values from the response data
          const leaveTypeNames = response.data.map(item => item.LeaveTypeName);
          const leaveTypeRequests = response.data.map(item => item.NoOfLeaveTypeRequests);
  
          const newData = {
            labels: leaveTypeNames, // Set labels as an array
            datasets: [
              {
                label: 'Pending',
                pointRadius: 0,
                pointHoverRadius: 0,
                backgroundColor: ['#f17e5d', '#4acccd', '#fcc468'],
                borderWidth: 0,
                barPercentage: 1.6,
                data: leaveTypeRequests, // Use the extracted leaveTypeRequests
              },
            ],
          };
  
          setPendingApproval(newData);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

      axios.get(`${apiUrl}/leave/leaveRequestsType?ClientID=${clientID}&LeaveTypeGroupID=2&StatusID=2`)
      .then((response) => {
        if (response.data.length > 0) {
          // Extract LeaveTypeName values from the response data
          const leaveTypeNames = response.data.map(item => item.LeaveTypeName);
          const leaveTypeRequests = response.data.map(item => item.NoOfLeaveTypeRequests);
  
          const newData = {
            labels: leaveTypeNames, // Set labels as an array
            datasets: [
              {
                label: 'Pending',
                pointRadius: 0,
                pointHoverRadius: 0,
                backgroundColor: ['#f17e5d', '#4acccd', '#fcc468'],
                borderWidth: 0,
                barPercentage: 1.6,
                data: leaveTypeRequests, // Use the extracted leaveTypeRequests
              },
            ],
          };
  
          setApprovedLeaves(newData);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};



  const handleToggleDrilldown = (chartType, drilldownName, dateRange, leaveTypeGroupID, responseType, response, panelName) => {
    if ( 
      (openDrilldown === drilldownName && chartType == 'count')
       ) {
      setOpenDrilldown(null); // Close the currently open drilldown
    } else if (chartType == 'pie' || chartType == 'count') {
      setOpenDrilldown(drilldownName); // Open the requested drilldown
      setTableDateRange(dateRange);
      setDatasetName(response);
      setPanelName(panelName);

      if(responseType == 'Status')
      {
        
        
        if(response == 'Requested')
      {
        setLeaveStatusID(1);
        
      }
      else if(response == 'Approved')
      {
        setLeaveStatusID(2);
      }
      else if(response == 'Declined')
      {
        setLeaveStatusID(3);
      }

      if(leaveTypeGroupID == 'Holiday')
      {
        setLeaveTypeGroupID(2);
      }
      else if(leaveTypeGroupID == 'Sick')
      {
        setLeaveTypeGroupID(1);
      }

      setLeaveType('');

      }
      else if(responseType == 'Leave Type Pending')
      {

        setLeaveStatusID(1);
        setLeaveTypeGroupID('');
        
        if(response == 'Holiday')
      {
        setLeaveType(1);

      }
      else if(response == 'Unpaid')
      {
        setLeaveType(4);
      }

      }
      else if(responseType == 'Leave Type Approved')
      {

        setLeaveStatusID(2);
        setLeaveTypeGroupID('');
        
        if(response == 'Holiday')
      {
        setLeaveType(1);

      }
      else if(response == 'Unpaid')
      {
        setLeaveType(4);
      }

      }
    }
    else if (chartType == 'doughnut')
    {
      setOpenDrilldown(drilldownName); // Open the requested drilldown
      setPanelName(panelName)
      setDatasetName(response);

      setTableDateRange(dateRange);
      if(drilldownName == 'signIn')
      {
        setActionTypeID(1);

        if(response == 'Signed In')
        {
          setTimeManagementStatus("OnTime")
        }
        else if(response == 'Pending')
        {
          setTimeManagementStatus("Pending")
        }
      }
      else if(drilldownName == 'signOut')
      {
        setActionTypeID(2);

        if(response == 'Signed Out')
        {
          setTimeManagementStatus("OnTime")
        }
        else if(response == 'Pending')
        {
          setTimeManagementStatus("Pending")
        }
      }
    }
    else if (chartType == 'line')
    {
      setPanelName(panelName);
      
      if(drilldownName == 'signIn')
      {
        setActionTypeID(1);
        setDatasetName("Sign In " + "("+response+")");
      }
      else if(drilldownName == 'signOut')
      {
        setActionTypeID(2);
        setDatasetName("Sign Out " + "("+response+")");
      }

      setTableDateRange(dateRange);
      setOpenDrilldown('timeManagementReport'); // Open the requested drilldown
      setTimeManagementStatus('OnTime');
    }
  };

  const [chartData, setChartData] = useState({
    labels: ['Declined', 'Approved', 'Outstanding'],
    datasets: [
      {
        label: 'Holiday',
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
        label: 'Sick',
        pointRadius: 0,
        pointHoverRadius: 0,
        backgroundColor: ['#f17e5d', '#4acccd', '#fcc468'],
        borderWidth: 0,
        barPercentage: 1.6,
        data: [542, 480, 430], // Initialize with static data
      },
    ],
  });

  const [pendingApproval, setPendingApproval] = useState({
    labels: ['Holiday', 'Unpaid', 'Appointment', 'Maternity'],
    datasets: [
      {
        label: 'Pending Approval',
        pointRadius: 0,
        pointHoverRadius: 0,
        backgroundColor: ['#f17e5d', '#4acccd', '#fcc468', '#fcc268'],
        borderWidth: 0,
        barPercentage: 1.6,
        data: [542, 480, 430, 0], // Initialize with static data
      },
    ],
  });

  const [approvedLeaves, setApprovedLeaves] = useState({
    labels: ['Holiday', 'Unpaid', 'Appointment', 'Maternity'],
    datasets: [
      {
        label: 'Approved Leaves',
        pointRadius: 0,
        pointHoverRadius: 0,
        backgroundColor: ['#f17e5d', '#4acccd', '#fcc468', '#fcc268'],
        borderWidth: 0,
        barPercentage: 1.6,
        data: [542, 480, 430, 0], // Initialize with static data
      },
    ],
  });


  const [signOutChart, setSignOutChart] = useState({
    data: {
      labels: ['Signed In', 'Pending'],
      datasets: [
        {
          label: "Signed In",
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
          label: "Signed In",
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
      },
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const segment = signInChart.data.labels[elements[0].index];
        }
      }
    }
  })

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
        },
        {
          label: "Active Users",
          borderColor: "#6bd098",
          pointRadius: 0,
          pointHoverRadius: 0,
          fill: false,
          borderWidth: 3,
          barPercentage: 1.6,
          tension: 0.4,
          data: [0, 6, 7, 3, 10, 4, 12, 14, 6, 2,6,10]
        }
      ]
    });

  
  const optionsMonthlyChart = {
      plugins: {
        legend: {
          display: true, // Set to true to display the legend
          position: 'top', // You can change the legend position to 'top', 'bottom', etc.
        },
        tooltip: { enabled: true,  mode: 'nearest' }
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
        enabled: true,
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

  const [timeManagementChart, setTimeManagementChart] = useState({
    data: {
      labels: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
      datasets: [
        {
          label: "Sign In",
          borderColor: "#6bd098",
          backgroundColor: "#6bd098",
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          data: Array(12).fill(0), // Initialize with zeros for all months
        },
        {
          label: "Sign Out",
          borderColor: "#f17e5d",
          backgroundColor: "#f17e5d",
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          data: Array(12).fill(0), // Initialize with zeros for all months
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: { enabled: true, mode: 'nearest' }
      },
      scales: {
        y: {
          ticks: {
            stepSize: 1,
            color: "#9f9f9f",
            beginAtZero: true,
            maxTicksLimit: 6
          },
          grid: {
            drawBorder: true,
            display: true
          },
          max: 10
        },
        x: {
          barPercentage: 1.6,
          grid: {
            drawBorder: true,
            display: true
          },
          ticks: {
            padding: 20,
            color: "#9f9f9f"
          }
        }
      },
      elements: {
        point: {
          radius: 0.1,
          hitRadius: 30,
        },
      },
    }
  });
  


  const handlePieChartClick = (label, leaveTypeGroupID, responseType, panelName) => {
    // Handle the pie chart click with the label received from CustomPieChart
    handleToggleDrilldown('pie','leaveRequests', 0, leaveTypeGroupID, responseType, label, panelName);
  };

  const handleDoughnutChartClick = (label, chartName, panelName) => {
    // Add your custom logic here to handle the click event for the selected option.
    if(chartName == 'Sign In')
    {
      handleToggleDrilldown('doughnut','signIn', 0, 0, 0, label, panelName);
  }
  else if(chartName == 'Sign Out')
    {
      handleToggleDrilldown('doughnut','signOut', 0, 0, 0, label, panelName);
    }

  }

  const handleLineChartClick = (label, chartName, panelName) => {
    // Add your custom logic here to handle the click event for the selected option.
    if(chartName == 'Sign In')
    {
      handleToggleDrilldown('line','signIn', label, 0, 0, label, panelName);
  }
  else if(chartName == 'Sign Out')
    {
      handleToggleDrilldown('line','signOut', label, 0, 0, label, panelName);
    }

  }


 
// updated X days ago 
  useEffect(() => {
    // Get the ClientID from local storage
    const clientID = localStorage.getItem('ClientID');
  
    axios.get(`${apiUrl}/leave/leaveRequestLastUpdated?ClientID=${clientID}&LeaveTypeID=1`)
      .then((response) => {
        if (response.data.length > 0) {
          setLastHolidayLeaveUpdated(response.data[0].LastUpdatedLeaveDate);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    axios.get(`${apiUrl}/leave/leaveRequestLastUpdated?ClientID=${clientID}&LeaveTypeID=2`)
      .then((response) => {
        if (response.data.length > 0) {
          setLastSickLeaveUpdated(response.data[0].LastUpdatedLeaveDate);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    axios.get(`${apiUrl}/timeManagement/SignInOutLastUpdated?ClientID=${clientID}&ActionTypeID=1`)
      .then((response) => {
        if (response.data.length > 0) {
          setLastSignInUpdated(response.data[0].LastSignInOutLeaveDate);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    axios.get(`${apiUrl}/timeManagement/SignInOutLastUpdated?ClientID=${clientID}&ActionTypeID=2`)
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
  
    axios.get(`${apiUrl}/leave/leaveRequestsStatus?ClientID=${clientID}&LeaveTypeGroupID=2`)
      .then((response) => {
        if (response.data.length > 0) {
          const newData = {
            labels: ['Declined', 'Approved', 'Requested'],
            datasets: [
              {
                label: 'Holiday',
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
  
    axios.get(`${apiUrl}/leave/leaveRequestsStatus?ClientID=${clientID}&LeaveTypeGroupID=1`)
      .then((response) => {
        if (response.data.length > 0) {
          const newData = {
            labels: ['Declined', 'Approved', 'Requested'],
            datasets: [
              {
                label: 'Sick',
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

  useEffect(() => {
    // Get the ClientID from local storage
    const clientID = localStorage.getItem('ClientID');
  
    axios.get(`${apiUrl}/leave/leaveRequestsType?ClientID=${clientID}&LeaveTypeGroupID=2&StatusID=1`)
      .then((response) => {
        if (response.data.length > 0) {
          // Extract LeaveTypeName values from the response data
          const leaveTypeNames = response.data.map(item => item.LeaveTypeName);
          const leaveTypeRequests = response.data.map(item => item.NoOfLeaveTypeRequests);
  
          const newData = {
            labels: leaveTypeNames, // Set labels as an array
            datasets: [
              {
                label: 'Pending',
                pointRadius: 0,
                pointHoverRadius: 0,
                backgroundColor: ['#f17e5d', '#4acccd', '#fcc468'],
                borderWidth: 0,
                barPercentage: 1.6,
                data: leaveTypeRequests, // Use the extracted leaveTypeRequests
              },
            ],
          };
  
          setPendingApproval(newData);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    // Get the ClientID from local storage
    const clientID = localStorage.getItem('ClientID');
  
    axios.get(`${apiUrl}/leave/leaveRequestsType?ClientID=${clientID}&LeaveTypeGroupID=2&StatusID=2`)
      .then((response) => {
        if (response.data.length > 0) {
          // Extract LeaveTypeName values from the response data
          const leaveTypeNames = response.data.map(item => item.LeaveTypeName);
          const leaveTypeRequests = response.data.map(item => item.NoOfLeaveTypeRequests);
  
          const newData = {
            labels: leaveTypeNames, // Set labels as an array
            datasets: [
              {
                label: 'Pending',
                pointRadius: 0,
                pointHoverRadius: 0,
                backgroundColor: ['#f17e5d', '#4acccd', '#fcc468'],
                borderWidth: 0,
                barPercentage: 1.6,
                data: leaveTypeRequests, // Use the extracted leaveTypeRequests
              },
            ],
          };
  
          setApprovedLeaves(newData);
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
  
    // Function to fetch combined data
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/leave/countStaffData?ClientID=${clientID}`);
        if (response.data) {
          const { TotalStaff, StaffOnLeave, StaffOnLeaveNext30Days } = response.data;
          setTotalStaffCount(TotalStaff);
          setStaffOnLeaveCount(StaffOnLeave);
          setStaffOnLeaveCountNext30Days(StaffOnLeaveNext30Days);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // Fetch data on component mount and whenever fetchUpdatedData is called
    fetchData();
  }, [fetchUpdatedData]); // Adding fetchUpdatedData as a dependency
  
  

// SIGN OUT REPORT
useEffect(() => {
  // Get the ClientID from local storage
  const clientID = localStorage.getItem('ClientID');


  axios.get(`${apiUrl}/timeManagement/SignInOutReportToday?ClientID=${clientID}&ActionTypeID=2`)
    .then((response) => {
      if (Object.keys(response.data).length > 0) {
        const SignOutChart = {
          data: {
            labels: ['Signed Out', 'Pending'],
            datasets: [
              {
                label: "Sign Out",
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


  axios.get(`${apiUrl}/timeManagement/SignInOutReportToday?ClientID=${clientID}&ActionTypeID=1`)
    .then((response) => {
      if (Object.keys(response.data).length > 0) {
        const SignInChart = {
          data: {
            labels: ['Signed In', 'Pending'],
            datasets: [
              {
                label: "Sign In",
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
          },
          onClick: (event, elements) => {
            if (elements.length > 0) {
              const segment = signInChart.data.labels[elements[0].index];
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
  axios.get(`${apiUrl}/leave/CurrentNumberOfLeaveRequests?ClientID=${clientID}`)
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
  axios.get(`${apiUrl}/leave/CurrentNumberOfLeaveRequestsByMonth?ClientID=${clientID}`)
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

useEffect(() => {
  const clientID = localStorage.getItem('ClientID'); // Modify this as needed

  const signInEndpoint = `${apiUrl}/timeManagement/SignInOutMonthlyReport?ClientID=${clientID}&ActionTypeID=1`;
  const signOutEndpoint = `${apiUrl}/timeManagement/SignInOutMonthlyReport?ClientID=${clientID}&ActionTypeID=2`;

  // Fetch data for ActionTypeID 1
axios.get(signInEndpoint)
  .then((response) => {
    if (Array.isArray(response.data)) {
      setTimeManagementChart(prevState => {
        const updatedData = { ...prevState };

        // Extract the maximum value from the fetched data
        const maxDataValue = Math.max(
          ...response.data.map(item => item.NumberOfSignInsOuts)
        );

        // Add 1 to the maximum value on y axis to look better for user
        const newMaxValue = maxDataValue + 1;

        // Set the new maximum value on the y-axis
        updatedData.options.scales.y.max = newMaxValue;

        response.data.forEach((item) => {
          const monthIndex = updatedData.data.labels.indexOf(item.Month);
          if (monthIndex !== -1) {
            updatedData.data.datasets[0].data[monthIndex] = item.NumberOfSignInsOuts;
          }
        });

        return { ...updatedData };
      });
    }
  })
  .catch((error) => {
    console.error('Error fetching data for ActionTypeID 1:', error);
  });



  // Fetch data for ActionTypeID 2
axios.get(signOutEndpoint)
.then((response) => {
  if (Array.isArray(response.data)) {
    setTimeManagementChart((prevChart) => {
      const updatedData = { ...prevChart.data };
      response.data.forEach((item) => {
        const monthIndex = updatedData.labels.indexOf(item.Month);
        if (monthIndex !== -1) {
          updatedData.datasets[1].data[monthIndex] = item.NumberOfSignInsOuts;
        }
      });
      return { data: updatedData, options: prevChart.options };
    });
  }
})
.catch((error) => {
  console.error('Error fetching data for ActionTypeID 2:', error);
});
}, []);




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
                    <div className="footer-title">View/Edit staff</div>
                  </Col>
                  <Col sm="5">
                    <div className="pull-right">
                      <Button
                        className="btn-round btn-icon"
                        color="danger"
                        size="sm"
                        
                      >
                        <i className="nc-icon nc-button-play"
                        onClick={() => handleToggleDrilldown('count','totalStaff', 0, 0 , '')} />
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
                        onClick={() => handleToggleDrilldown('count','staffOnLeave', 0, 0, '')} />
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
                         onClick={() => handleToggleDrilldown('count', 'staffOnLeave30Days', 30, 0, '')} />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>

        <div>

          
        {openDrilldown === 'totalStaff' ? (
        <TotalStaffTable fetchUpdatedData={fetchUpdatedData}/>
        
        ) : openDrilldown === 'staffOnLeave' ? (
        <StaffOnLeaveTable TableDateRange={tableDateRange} />
        ) : openDrilldown === 'staffOnLeave30Days' ? (
        <StaffOnLeaveTable TableDateRange={tableDateRange} />
        ) :  null}
        </div>

        <Col md="3">
        <Card>
  <CardHeader>
    <CardTitle>Pending Approval</CardTitle>
    <p className="card-category">Year to date</p>
  </CardHeader>
  <CardBody style={{ height: "250px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {pendingApproval.datasets[0].data.every(value => value === 0) ? (
      <div style={{ textAlign: 'center', color: '#999' }}>
        <i className="fa fa-info-circle" style={{ fontSize: '48px', marginBottom: '8px' }} />
        <p>No data available.</p>
      </div>
    ) : (
      <CustomPieChart
        chartData={pendingApproval}
        optionsPieChart={optionsPieChart}
        handlePieChartClick={handlePieChartClick}
        responseType={"Leave Type Pending"}
        panelName={"Pending Approval"}
      />
    )}
  </CardBody>
  {/* Conditionally render the CardFooter based on data availability */}
  {pendingApproval.datasets[0].data.some(value => value !== 0) ? (
    <CardFooter>
      <hr />
      <div className="stats" style={{ color: '#999' }}>
        <i className="fa fa-clock-o" style={{ fontSize: '16px', marginRight: '8px' }} />
        Updated {lastSickLeaveUpdated !== null ? lastSickLeaveUpdated : 'Loading...'} ago
      </div>
    </CardFooter>
  ) : (
    <CardFooter>
      <hr />
      <div className="stats" style={{ color: '#999' }}>
        <i className="fa fa-info-circle" style={{ fontSize: '16px', marginRight: '8px', color: '#999' }} />
        No data available
      </div>
    </CardFooter>
  )}
</Card>


  </Col>

  <Col md="3">
  <Card>
  <CardHeader>
    <CardTitle>Approved Leaves</CardTitle>
    <p className="card-category">Year to date</p>
  </CardHeader>
  <CardBody style={{ height: "250px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {approvedLeaves.datasets[0].data.every(value => value === 0) ? (
      <div style={{ textAlign: 'center', color: '#999' }}>
        <i className="fa fa-info-circle" style={{ fontSize: '48px', marginBottom: '8px' }} />
        <p>No data available.</p>
      </div>
    ) : (
      <CustomPieChart
        chartData={approvedLeaves}
        optionsPieChart={optionsPieChart}
        handlePieChartClick={handlePieChartClick}
        responseType={"Leave Type Approved"}
        panelName={"Approved Leaves"}
      />
    )}
  </CardBody>
  {/* Conditionally render the CardFooter based on data availability */}
  {approvedLeaves.datasets[0].data.some(value => value !== 0) ? (
    <CardFooter>
      <hr />
      <div className="stats" style={{ color: '#999' }}>
        <i className="fa fa-clock-o" style={{ fontSize: '16px', marginRight: '8px' }} />
        Updated {lastSickLeaveUpdated !== null ? lastSickLeaveUpdated : 'Loading...'} ago
      </div>
    </CardFooter>
  ) : (
    <CardFooter>
      <hr />
      <div className="stats" style={{ color: '#999' }}>
        <i className="fa fa-info-circle" style={{ fontSize: '16px', marginRight: '8px', color: '#999' }} />
        No data available
      </div>
    </CardFooter>
  )}
</Card>

  </Col>

        <Col md="3">
        <Card>
  <CardHeader>
    <CardTitle>Holiday Requests</CardTitle>
    <p className="card-category">Year to date</p>
  </CardHeader>
  <CardBody style={{ height: "250px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {chartData.datasets[0].data.every(value => value === 0) ? (
      // Placeholder message when no data is available
      <div style={{ textAlign: 'center', color: '#999' }}>
        <i className="fa fa-info-circle" style={{ fontSize: '48px', marginBottom: '8px' }} />
        <p>No data available.</p>
      </div>
    ) : (
      // Display the chart when data is available
      <CustomPieChart
        chartData={chartData}
        optionsPieChart={optionsPieChart}
        handlePieChartClick={handlePieChartClick}
        responseType={"Status"}
        panelName={"Holiday Requests"}
      />
    )}
  </CardBody>
  {/* Conditionally render the CardFooter based on data availability */}
  <CardFooter>
    <hr />
    <div className="stats" style={{ color: chartData.datasets[0].data.every(value => value === 0) ? '#999' : 'inherit' }}>
      {chartData.datasets[0].data.every(value => value === 0) ? (
        <>
          <i className="fa fa-info-circle" style={{ fontSize: '16px', marginRight: '8px', color: '#999' }} />
          No data available
        </>
      ) : (
        <>
          <i className="fa fa-clock-o" style={{ fontSize: '16px', marginRight: '8px' }} />
          Updated {lastHolidayLeaveUpdated !== null ? lastHolidayLeaveUpdated : 'Loading...'} ago
        </>
      )}
    </div>
  </CardFooter>
</Card>


    </Col>

  <Col md="3">
  <Card>
  <CardHeader>
    <CardTitle>Absence Log</CardTitle>
    <p className="card-category">Year to date</p>
  </CardHeader>
  <CardBody style={{ height: "250px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {sickRequestPieChart.datasets[0].data.every(value => value === 0) ? (
      // Placeholder message when no data is available
      <div style={{ textAlign: 'center', color: '#999' }}>
        <i className="fa fa-info-circle" style={{ fontSize: '48px', marginBottom: '8px' }} />
        <p>No data available.</p>
      </div>
    ) : (
      // Display the chart when data is available
      <CustomPieChart
        chartData={sickRequestPieChart}
        optionsPieChart={optionsPieChart}
        handlePieChartClick={handlePieChartClick}
        responseType={"Status"}
        panelName={"Absence Log"}
      />
    )}
  </CardBody>
  {/* Conditionally render the CardFooter based on data availability */}
  <CardFooter>
    <hr />
    <div className="stats" style={{ color: '#999' }}>
      {sickRequestPieChart.datasets[0].data.every(value => value === 0) ? (
        <>
          <i className="fa fa-info-circle" style={{ fontSize: '16px', marginRight: '8px', color: '#999' }} />
          No data available
        </>
      ) : (
        <>
          <i className="fa fa-clock-o" style={{ fontSize: '16px', marginRight: '8px' }} />
          Updated {lastSickLeaveUpdated !== null ? lastSickLeaveUpdated : 'Loading...'} ago
        </>
      )}
    </div>
  </CardFooter>
</Card>


  </Col>

  <div>
  {openDrilldown === 'leaveRequests' ? (
    <LeaveRequestsTable leaveTypeGroupID={leaveTypeGroupID} leaveStatusID={leaveStatusID} leaveTypeID={leaveType} panelName={panelName} datasetName={datasetName}  fetchLeaveUpdatedData={fetchLeaveUpdatedData}/>
  ) : null}
</div>

<Col md="3">
<Card>
  <CardHeader>
    <CardTitle>Staff Signed In Today</CardTitle>
    <p className="card-category">Out of total number</p>
  </CardHeader>
  <CardBody style={{ height: "253px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {signInChart.data.datasets[0].data.every(value => value === 0) ? (
      // Placeholder message when no data is available
      <div style={{ textAlign: 'center', color: '#999' }}>
        <i className="fa fa-info-circle" style={{ fontSize: '48px', marginBottom: '8px' }} />
        <p>No data available.</p>
      </div>
    ) : (
      // Display the chart when data is available
      <CustomDoughnutChart
        signInChartData={signInChart.data}
        signInChartOptions={signInChart.options}
        handleDoughnutChartClick={handleDoughnutChartClick}
        panelName={"Staff Signed In Today"}
        className="ct-chart ct-perfect-fourth"
        height={300}
        width={456}
      />
    )}
  </CardBody>
  <CardFooter>
    <hr />
    <div className="stats" style={{ color: '#999' }}>
      {signInChart.data.datasets[0].data.every(value => value === 0) ? (
        <>
          <i className="fa fa-info-circle" style={{ fontSize: '16px', marginRight: '8px', color: '#999' }} />
          No data available
        </>
      ) : (
        <>
          <i className="fa fa-clock-o" style={{ fontSize: '16px', marginRight: '8px' }} />
          Updated {lastSignInUpdated !== null ? lastSignInUpdated : 'Loading...'} ago
        </>
      )}
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
  <CardBody style={{ height: "253px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {signOutChart.data.datasets[0].data.every(value => value === 0) ? (
      // Placeholder message when no data is available
      <div style={{ textAlign: 'center', color: '#999' }}>
        <i className="fa fa-info-circle" style={{ fontSize: '48px', marginBottom: '8px' }} />
        <p>No data available.</p>
      </div>
    ) : (
      // Display the chart when data is available
      <CustomDoughnutChart
        signInChartData={signOutChart.data}
        signInChartOptions={signOutChart.options}
        handleDoughnutChartClick={handleDoughnutChartClick}
        panelName={"Staff Signed Out Today"}
        className="ct-chart ct-perfect-fourth"
        height={300}
        width={456}
      />
    )}
  </CardBody>
  {/* Conditionally render the CardFooter based on data availability */}
  <CardFooter>
    <hr />
    <div className="stats" style={{ color: '#999' }}>
      {signOutChart.data.datasets[0].data.every(value => value === 0) ? (
        <>
           <i className="fa fa-info-circle" style={{ fontSize: '16px', marginRight: '8px', color: '#999' }} />
          No data available
        </>
      ) : (
        <>
          <i className="fa fa-clock-o" style={{ fontSize: '16px', marginRight: '8px' }} />
          Updated {lastSignOutUpdated !== null ? lastSignOutUpdated : 'Loading...'} ago
        </>
      )}
    </div>
  </CardFooter>
</Card>


  </Col>

  <Col md="6">
  <Card className="custom-chart-monthly-overview">
  <CardHeader>
    <CardTitle>Time Management Overview</CardTitle>
    <p className="card-category">Annual Report</p>
  </CardHeader>
  <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '278px' }}>
    {timeManagementChart.data.datasets[0].data.every(value => value === 0) ? (
      <div style={{ textAlign: 'center', color: '#999' }}>
        <i className="fa fa-info-circle" style={{ fontSize: '48px', marginBottom: '8px' }} />
        <p>No data available.</p>
      </div>
    ) : (
      <CustomLineChart
        timeManagementChartData={timeManagementChart.data}
        timeManagementChartOptions={timeManagementChart.options}
        handleLineChartClick={handleLineChartClick}
        panelName={"Time Management Overview"}
        width={400}
        height={200}
      />
    )}
  </CardBody>
  <CardFooter>
    <hr />
  </CardFooter>
</Card>

    </Col>

    <div>
  {openDrilldown === 'signIn' || openDrilldown === 'signOut' ? (
    <TimeManagementTable actionTypeID={actionTypeID} timeManagementStatus={timeManagementStatus} panelName={panelName} datasetName={datasetName}/>
  ) : openDrilldown === 'timeManagementReport' ? (
    <TimeManagementTable actionTypeID={actionTypeID} timeManagementStatus={timeManagementStatus} tableDateRange={tableDateRange} panelName={panelName} datasetName={datasetName}/>
  ) : null}
</div>





</Row>
 {/*
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

        
        
*/

    }
      
      </div>
    </>
  );
}

export default Dashboard;
