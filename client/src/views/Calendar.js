import React, { useState, useEffect, useCallback, useRef } from "react";
// react component used to create a calendar with events on it
import {
  Calendar as ReactBigCalendar,
  momentLocalizer
} from "react-big-calendar";
// dependency plugin for react-big-calendar
import moment from "moment";
import ReactDatetime from "react-datetime";
import Select from "react-select";
import axios from 'axios';
import "../assets/css/paper-dashboard.css";
import Modal from 'react-modal';
import SweetAlert from 'react-bootstrap-sweetalert';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Input,
  Container,
  Col,
  Row,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Tooltip
} from "reactstrap";


const localizer = momentLocalizer(moment);

function Calendar() {
  const [eventsState, setEventsState] = useState([]);
  const selectedEvent = (event) => {showEventDetails(event)};
  const [endDate, setEndDate] = useState("");
  const [singleSelect, setSingleSelect] = useState("");
  const [singleSelectLabel, setSingleSelectLabel] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [duration, setDuration] = useState("");
  const [currentBalanceInHours, setCurrentBalanceInHours] = useState("");
  const [durationInHours, setDurationInHours] = useState("");
  const [balanceAfterDuration, setBalanceAfterDuration] = useState("");
  const [overallEntitelement, setOveralEntitelement] = useState("");
  const [workingShiftHours, setWorkingShiftHours] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const datetimeRef = useRef();
  const inputRef = useRef(null);
  const [showEntitelementFields, setShowEntitelementFields] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showNotAllowedAlert, setShowNotAllowedAlert] = useState(false);
  const [notes, setNotes] = useState("");
  const [workingWeekends, setWorkingWeekends] = useState("")
  const [showEventDetailsAlert, setShowEventDetailsAlert] = useState(false);
  const [formattedStart, setFormattedStart] = useState('');
  const [formattedEnd, setFormattedEnd] = useState('');
  const [titleAlert, setTitleAlert] = useState('');
  const apiUrl = process.env.REACT_APP_APIURL;
  
  Modal.setAppElement('#root');

  function showEventDetails(event) {
    const { title, allDay, start, end } = event;

    const newFormattedStart = new Date(start).toLocaleString();
    const newFormattedEnd = new Date(end).toLocaleString();
    setFormattedStart(newFormattedStart);
    setFormattedEnd(newFormattedEnd);
    setTitleAlert(title);
    setShowEventDetailsAlert(true);
  }

  useEffect(() => {
    async function fetchLeaveType() {
      const UserID = localStorage.getItem("UserID");
      try {
        const result = await axios.post(
          `${apiUrl}/leaveType`,
          {
            UserID: UserID
          }
        );
        if (result.status === 200) {
          const data = result.data;

          // Format data into array of objects with `value` and `label` keys
          const formattedOptions = data.map((record) =>
          ({
            value: record.value,
            label: record.name,
          }));

          setOptions(formattedOptions);

        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchLeaveType();
  }, []);

  async function diffInMsExcludeWeekends(start, end) {
    const startMs = new Date(start).getTime();
    const endMs = new Date(end).getTime();
    const dayMs = 24 * 60 * 60 * 1000; // milliseconds in a day
  
    let diffMs = endMs - startMs;
    let numWeekends = 0;
  
    // Loop through each day between the start and end date
    for (let day = startMs; day <= endMs; day += dayMs) {
      const dayOfWeek = new Date(day).getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) { // Weekend day
        numWeekends++;
      }
    }
  
    // Subtract the number of weekend days from the total difference in milliseconds
    diffMs -= numWeekends * dayMs;
  
    return diffMs;
  }

  async function diffInMsExcludeBankHolidays(start, end, diffInMs) {
    
    try 
    {
        const result = await axios.post(
        `${apiUrl}/WithinBankHoliday`,
        {
          start : start,
          end: end,
          diffInMs: diffInMs
        }
      );
      if (result.status === 200) {
        return result.data.updatedDiffInMs
      } 
    }
    catch (error) {
        console.error(error);
      }
  

  }


  async function calculateDurationEntitelementLeft(start, end) {
    const UserID = localStorage.getItem("UserID");
    try {
      const result = await axios.post(
        `${apiUrl}/userHolidayInfo`,
        {
          UserID: UserID,
        }
      );
      if (result.status === 200) {
        const data = result.data;
        console.log("data is:", data)
        const userWorkingShiftDuration = data.WorkingShiftHours !== null ? data.WorkingShiftHours : 8;
        const workingWeekends = data.WorkingWeekends
        const userHolidayEntitelementLeftDays = data.HolidayEntitelementLeftDays == null ? 0 : data.HolidayEntitelementLeftDays;
        const userHolidayEntitelementLeftHours = data.HolidayEntitelementLeftHours == null ? 0 : data.HolidayEntitelementLeftHours;
        const currentUserHolidayEntitelementOverall = (userHolidayEntitelementLeftDays == 1 ? userHolidayEntitelementLeftDays + " day " : userHolidayEntitelementLeftDays + " days ") +  (userHolidayEntitelementLeftHours == 1 ? userHolidayEntitelementLeftHours + " hour ": userHolidayEntitelementLeftHours + " hours ");
        const currentBalanceInHours = userHolidayEntitelementLeftDays * userWorkingShiftDuration + userHolidayEntitelementLeftHours;
        
        let diffInMs;
          if (workingWeekends == 'No') {
            diffInMs = await diffInMsExcludeWeekends(start, end);
            
          } else {
            diffInMs = new Date(end).getTime() - new Date(start).getTime(); 
          }
          diffInMs = await diffInMsExcludeBankHolidays(start, end, diffInMs);

        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const days =  Math.floor(diffInHours / 24);
        const hours = diffInHours - days * 24;
        // if user does not have setup how many hours he works a day then we assume it will be 8 hours
        if (userWorkingShiftDuration == "null" || userWorkingShiftDuration < 0) {
          userWorkingShiftDuration = 8;
        }
        
        const currentDurationInWorkingHours = diffInHours < 24 ?
        (
        diffInHours < workingShiftHours ? diffInHours : workingShiftHours
        )
         : 
         (
         (diffInHours % 24) > workingShiftHours ?  (Math.floor(diffInHours / 24) * workingShiftHours) + workingShiftHours :
         (Math.floor(diffInHours / 24) * workingShiftHours) + (diffInHours % 24)
         )
        
        const fullDays = Math.floor(currentDurationInWorkingHours / workingShiftHours)
        const fullHours = currentDurationInWorkingHours % workingShiftHours

        setWorkingShiftHours(userWorkingShiftDuration)
        setOveralEntitelement(currentUserHolidayEntitelementOverall);
        setCurrentBalanceInHours(currentBalanceInHours);
        setDurationInHours(currentDurationInWorkingHours)

          if (fullDays > 1)
          {
            if(fullHours != 1)
            {
              return fullDays + " days " + fullHours + " hours"
            }
            else if(fullHours == 1)
            {
              return fullDays + " days " + fullHours + " hour"
            }
          }
          else if(fullDays == 1)
          {
            if(fullHours != 1)
            {
              return fullDays + " day " + fullHours + " hours"
            }
            else if (fullHours == 1)
            {
              return fullDays + " day " + fullHours + " hour"
            }
          }
          else if(fullDays == 0)
          {
            if(fullHours != 1)
            {
              return fullHours + " hours"
            }
            else if(fullHours == 1)
            {
              return fullHours + " hour"
            }
          }
          else return "No duration found";
    } } catch (error) {
      console.error(error);
    }
  }
  


  async function handleFormSubmit(event) {
    event.preventDefault();
    if (selectedSlot) {
      const UserID = localStorage.getItem("UserID");
      const fullDays = getDaysFromString(duration)
      const fullHours = getHoursFromString(duration);
      const startDateForm = formatTimestampForSQL(selectedDate)
      const endDateForm = formatTimestampForSQL(endDate);

    try {
      const result = await axios.post(
        `${apiUrl}/submitLeave`,
        {
          UserID: UserID,
          LeaveTypeID: singleSelect,
          StartDateTime: startDateForm,
          EndDateTime: endDateForm,
          WorkingDays: fullDays,
          WorkingHours: fullHours,
          Notes: notes
        }
      );
      if (result.status === 200) {
      addNewEvent(selectedSlot, singleSelectLabel, selectedDate, endDate);
      setShowModal(false);
      setEndDate("");
      setSingleSelect("");
      setSelectedDate("");
      setSingleSelectLabel("");
      setDuration("");
      setShowAlert(true); // Show the SweetAlert
      }
    } catch (error) {
    console.error(error);
  }


    }
  };
  


  const addNewEventAlert = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setShowModal(true);
  };

  function EventDetailsAlert({ event, isOpen, toggle }) {
  const [formData, setFormData] = useState({
    title: event.title,
    allDay: event.allDay,
    start: new Date(event.start).toLocaleString(),
    end: new Date(event.end).toLocaleString()
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

}
  

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [showModal]);

 /* function successAlert() {
    Swal.fire({
      title: 'Success',
      text: 'Your request was submitted',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        hideAlert(); // Hide the SweetAlert
      }
    });
  }*/

  const hideAlert = () => {
    setShowAlert(false);
    setShowNotAllowedAlert(false);
    setShowEventDetailsAlert(false);
  };



    

  function getDaysFromString(str) {
    const regex = /(\d+) day/;
    const match = str.match(regex);
  
    if (match && match.length > 1) {
      return parseInt(match[1], 10);
    }
  
    return 0;
  }

  function getHoursFromString(str) {
    const regex = /(\d+) hour/;
    const match = str.match(regex);
  
    if (match && match.length > 1) {
      return parseInt(match[1], 10);
    }
  
    return 0;
  }
  
  function formatTimestampForSQL(timestamp) {
    const date = new Date(timestamp);
  
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
  
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }


  
  useEffect(() => {

    if (singleSelect !== '' && selectedDate !== '' && endDate !== '' && errorMessage == '') {
      setDisabled(false);
    }
    else
    {
      setDisabled(true);
    }

    
    
    if (singleSelect == 1)
    {
      setShowEntitelementFields(true);
    }
    else
    {
      setShowEntitelementFields(false);
    }
  
    const updateDuration = async () => {
      if (selectedDate && endDate) {
        const duration = await calculateDurationEntitelementLeft(selectedDate, endDate);
        console.log("selectedDate is: ", selectedDate);
        console.log("selectedDate is: ", endDate);
        console.log("duration is: ", duration)
        setDuration(duration);
      } else {
        setDuration("");
      }
    };

    updateDuration();

    const updateLeaveLeft = async () => {
    const input = Math.floor((currentBalanceInHours - durationInHours) / workingShiftHours)
    const hoursLeft = (currentBalanceInHours % workingShiftHours) - durationInHours < 0 ? 
     (currentBalanceInHours - durationInHours) % workingShiftHours :
     (currentBalanceInHours % workingShiftHours) - durationInHours;
    const result = input + (input == 1 ? " day " : " days ")  + hoursLeft + (hoursLeft == 1 ? " hour" : " hours")
    if(selectedDate < endDate && endDate > selectedDate)
    {
      setBalanceAfterDuration(result)
    }

    }

    updateLeaveLeft();
    
  }, [singleSelect, selectedDate, endDate, duration, durationInHours]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const clientID = localStorage.getItem('ClientID');
        const response = await axios.get(`${apiUrl}/leaveRequests?ClientID=${clientID}`);
        if (response.status === 200) {
          const data = response.data;
          setEventsState(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchEvents();
  }, []);


  const addNewEvent = async (slotInfo, singleSelectName, selectedDate, endDate) => {
    const UserID = localStorage.getItem("UserID");
    try {
      const result = await axios.post(
        `${apiUrl}/user`,
        {
          UserID: UserID
        }
      );
      if (result.status === 200) {
        const data = result.data;
        const fullName = data.FullName;
        const endDateTime = new Date(endDate);

        if (slotInfo.start) {
          setEventsState(prevState => {
            const newEvents = [...prevState, {
              title: singleSelectName + " - " + fullName,
              start: slotInfo.start,
              end: endDateTime
            }];
            return newEvents;
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.classList.remove("modal-open");
  };

  function isWeekend(date) {
    const day = date.getDay(); // Get the day of the week (0-6, where 0 is Sunday)
    return day === 0 || day === 6; // Return true if it's Sunday (0) or Saturday (6)
  }

  async function isBankHoliday(date) {
    try {
      const result = await axios.post(`${apiUrl}/bankHoliday`, {
        Date: date,
      });
  
      if (result.status === 200) {
        const bankHolidayCheck = result.data.BankHoliday;
        if (bankHolidayCheck === 'No') {
          return false;
        }
      }
    } catch (error) {
      console.error(error);
    }
  
    return true; // Default return value in case of error
  }

  async function beforeLoadFormCheck(slotInfo) {
    try {
      const UserID = localStorage.getItem("UserID");
      const clientResult = await axios.post(`${apiUrl}/currentClient`, {
        UserID: UserID,
      });
  
      if (clientResult.status === 200) {
        const workingWeekends = clientResult.data.WorkingWeekends;
  
        if (workingWeekends === "No" && isWeekend(slotInfo.start)) {
          return false;
        }
        const bankHolidayCheck = await isBankHoliday(slotInfo.start);
        if (bankHolidayCheck) {
          return false;
        }
        
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  
    return false; // Default return value in case of error
  }
  
  const eventColors = (event, start, end, isSelected) => {
    /*var backgroundColor = "event-";
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + "default");
    return {
      className: backgroundColor
    };*/
  };

  
  return (
    <>
      <div className="content">
        <Row>
          <Col className="ml-auto mr-auto" md="10">
            <Card className="card-calendar">
              <CardBody>
              <ReactBigCalendar
                  selectable
                  localizer={localizer}
                  events={eventsState}
                  defaultView="month"
                  scrollToTime={new Date(1970, 1, 1, 6)}
                  defaultDate={new Date()}
                  eventPropGetter={eventColors}
                  onSelectEvent={(event) => selectedEvent(event)}
                  onSelectSlot={async (slotInfo) => {
                    if (await beforeLoadFormCheck(slotInfo)) {
                      addNewEventAlert(slotInfo);
                      setSelectedDate(slotInfo.start.setHours(9, 0, 0, 0));
                      setEndDate(slotInfo.start.setHours(17, 0, 0, 0));
                    } else {
                      setShowNotAllowedAlert(true);
                    }
                  }}
                  views={['month']}

                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>


      {showAlert && (
  <SweetAlert
    success
    title="Success!"
    onConfirm={hideAlert}
    onCancel={hideAlert}
  >
    Your request was submitted
  </SweetAlert>
)}

{showEventDetailsAlert && (
  <SweetAlert
  info
  title="Event Details"
  onConfirm={hideAlert}
  onCancel={hideAlert}
  customClass="sweet-alert-custom"
>
<p className="sweet-alert-title"></p>
  <p className="sweet-alert-title"><strong>Leave:</strong><strong> {titleAlert}</strong> </p>
  <p><strong>Start:</strong> {formattedStart}</p>
  <p><strong>End:</strong> {formattedEnd}</p>
</SweetAlert>
)}


{showNotAllowedAlert && (
  <SweetAlert
    info
    title=''
    onConfirm={hideAlert}
    onCancel={hideAlert}
  >
    You are not allowed to start your leave on weekend days or bank holidays. Please contact your administrator for more information!
  </SweetAlert>
)}

      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        className="custom-modal"
      >
        <h5 className="ReactModal__Title custom-title">Leave Request Form</h5>

        
        <Form onSubmit={handleFormSubmit} className="form-horizontal" method="">
          <Row>
            <Label md="3" style={{ marginTop: "10px" }}>Leave type</Label>
            <Col md="9">
              <FormGroup className="first-input-group">

                <Select
                  isRequired
                  className="react-select primary"
                  classNamePrefix="react-select"
                  name="singleSelect"
                  value={singleSelect.label}
                  onChange={(selectedOption) => { setSingleSelect(selectedOption.value); setSingleSelectLabel(selectedOption.label) }}
                  options={[
                    ...options,
                  ]}
                  placeholder="Leave type"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Label md="3">Start date</Label>
            <Col md="9">
              <FormGroup>
                <ReactDatetime
                  ref={datetimeRef}
                  inputProps={{
                    className: "form-control",
                    placeholder: "Start Date Time",
                  }}
                  renderInput={(props, openCalendar) => (
                    <input
                      {...props}
                      onClick={openCalendar} // still allow the calendar to open on click
                    />
                  )}
                  onChange={(date) => {

                    const newStartDate = date.valueOf(); // Convert new end date to Unix timestamp
                    if (newStartDate >= endDate.valueOf()) {
                      const startDateInput = document.querySelector(".rdtOpen input"); // Get the end date field's input element

                      if (startDateInput) {
                        setErrorMessage("Start date cannot be the same or greater than the end date")
                        setDisabled(true)
                      }
                    } 
                    else {
                      setErrorMessage("")
                    }
                    
                    setSelectedDate(date);
                  }}
                  value={selectedDate}
                  dateFormat="DD/MM/YYYY"
                  timeFormat="HH A"
                  isValidDate={(currentDate) => { // disable earlier dates
                    if (endDate != "") {
                      return currentDate.isSameOrBefore(endDate, 'day');
                    }
                  }}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Label md="3">End date</Label>
            <Col md="9">
              <FormGroup>
                <ReactDatetime
                  inputProps={{
                    className: "form-control",
                    placeholder: "Select Date"
                  }}
                  value={endDate}
                  onChange={(date) => {
                    const newEndDate = date.valueOf(); // Convert new end date to Unix timestamp
                    if (newEndDate <= selectedDate.valueOf()) {
                      const endDateInput = document.querySelector(".rdtOpen input"); // Get the end date field's input element

                      if (endDateInput) {
                        setErrorMessage("End date cannot be the same or less than the start date")
                        setDisabled(true)
                      }
                    } 
                    else {
                      setErrorMessage("")
                    }
                    setEndDate(date);
                  }}
                  dateFormat="DD/MM/YYYY"
                  timeFormat="HH A"
                  isValidDate={(currentDate) => {
                      return currentDate.isSameOrAfter(selectedDate, "day");
                  }}
                  inputRef={inputRef} 

                
                />
              </FormGroup>


              <p style={{ color: "red"}}>
                  {errorMessage}
                </p>


            </Col>
          </Row>

          <Row>
    <Label md="3">Notes</Label>
    <Col md="9">
      <FormGroup>
        <Input type="textarea" 
        name="notes"
        onChange={(event) => {setNotes(event.target.value)}} />
      </FormGroup>
    </Col>
  </Row>

          <hr />

{showEntitelementFields &&
          <Row>
            <Label md="3">Leave balance</Label>
            <Col md="9">
              <FormGroup>
                <Input type="text" value={overallEntitelement} readOnly />
              </FormGroup>
            </Col>
          </Row>
        }

          <Row>
            <Label md="3">Duration</Label>
            <Col md="9">
              <FormGroup>
                <Input type="text" value={duration} readOnly />
              </FormGroup>
            </Col>
          </Row>

          <hr /> 


{showEntitelementFields &&
          <Row>
            <Label md="3">Leave left</Label>
            <Col md="9">
              <FormGroup>
                <Input type="text" value={balanceAfterDuration} readOnly />
              </FormGroup>
            </Col>
          </Row>
        }

              

          <div className="button-container text-center">

            {disabled ? (<div title="Please fill in all required fields before submitting." style={{ display: 'inline-block', cursor: 'not-allowed', opacity: disabled ? 0.5 : 1 }}>
              <Button
                type="submit"
                color="info"
                disabled={disabled}
                style={{ position: 'relative', zIndex: 1 }}
              >
                Submit
              </Button>
            </div>
            ) : (
              <Button
                type="submit"
                color="info"
                disabled={disabled}
              >
                Submit
              </Button>
            )}


            <Button
              type="submit"
              style={{ display: "inline-block", visibility: "visible" }}
              color="danger"
              onClick={() => {
                setShowModal(false);
                setEndDate("");
                setSingleSelect("");
                document.body.classList.remove("modal-open");
              }}
            >
              Cancel
            </Button>
          </div>

        </Form>
      </Modal>
    </>
  );
}

export default Calendar;
