import React, { useState, useEffect, useCallback, useRef } from "react";
// react component used to create a calendar with events on it
import {
  Calendar as ReactBigCalendar,
  momentLocalizer
} from "react-big-calendar";
// dependency plugin for react-big-calendar
import moment, { invalid } from "moment";
import ReactDatetime from "react-datetime";
import Select from "react-select";
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';


// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  Col,
  Row,
  Label,
  Modal,
  ModalHeader,
  ModalBody
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
  const [leaveStatus, setLeaveStatus] = useState('');
  const [formattedEnd, setFormattedEnd] = useState('');
  const [titleAlert, setTitleAlert] = useState('');
  const apiUrl = process.env.REACT_APP_APIURL;
  const UserID = localStorage.getItem("UserID");
  const [invalidDate, setInvalidDate] = useState('');
  

  // Define your status to color mapping
  const statusColors = {
    Approved: '#90EE90',
    Requested: '#FFD700',
    Declined: '#F08080',
  };

  // Function to get event style based on status
  const eventPropGetter = (event) => {
    const backgroundColor = statusColors[event.status] || 'defaultColor';
    return {
      style: { backgroundColor },
    };
  };


  function showEventDetails(event) {
    const { title, allDay, start, end, status } = event;
    const newFormattedStart = new Date(start).toLocaleString();
    const newFormattedEnd = new Date(end).toLocaleString();
    setFormattedStart(newFormattedStart);
    setFormattedEnd(newFormattedEnd);
    setTitleAlert(title);
    setLeaveStatus(status);
    setShowEventDetailsAlert(true);
  }



  useEffect(() => {
    async function fetchLeaveType() {
      try {
        const result = await axios.post(
          `${apiUrl}/leave/leaveType`,
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

  const getAlertMessage = (invalidDate) => {
    switch (invalidDate) {
      case "Weekend":
        return "You are not allowed to start your leave on weekend days. Please contact your administrator for more information!";
      case "Bank Holiday":
        return "You are not allowed to start your leave on bank holidays. Please contact your administrator for more information!";
        case "Duplicate Leave":
          return "You already submitted a leave for this day. Please choose another day";  
        default:
        return "";
    }
  };

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
        `${apiUrl}/leave/WithinBankHoliday`,
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
        `${apiUrl}/leave/userHolidayInfo`,
        {
          UserID: UserID,
        }
      );
      if (result.status === 200) {
        const data = result.data;
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
      const clientID = localStorage.getItem('ClientID');
      const fullDays = getDaysFromString(duration)
      const fullHours = getHoursFromString(duration);
      const startDateForm = formatTimestampForSQL(selectedDate)
      const endDateForm = formatTimestampForSQL(endDate);

    try {
      const result = await axios.post(
        `${apiUrl}/leave/submitLeave`,
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

      const response = await axios.get(`${apiUrl}/leave/leaveRequests?ClientID=${clientID}`);
      if (response.status === 200) {
        const data = response.data;
        setEventsState(data);
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
    end: new Date(event.end).toLocaleString(),
    status: event.status
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
        setDuration(duration);
      } else {
        setDuration("");
      }
    };

    updateDuration();

    const updateLeaveLeft = async () => {
    const input = Math.floor((currentBalanceInHours - durationInHours) / workingShiftHours)

    // added total hours left which is a simple difference between balance and duration selected in form. if less than 0, then make the submit button read-only.
    const totalHoursLeft = currentBalanceInHours - durationInHours;
    const hoursLeft = (currentBalanceInHours % workingShiftHours) - durationInHours < 0 ? 
     (currentBalanceInHours - durationInHours) % workingShiftHours :
     (currentBalanceInHours % workingShiftHours) - durationInHours;
    const result = input + (input == 1 ? " day " : " days ")  + hoursLeft + (hoursLeft == 1 ? " hour" : " hours")
    if(selectedDate < endDate && endDate > selectedDate )
    {
      setBalanceAfterDuration(result)
      if(totalHoursLeft < 0 && singleSelect == 1 || singleSelect == '')
        {
          setDisabled(true);
        }
        else setDisabled(false);
    }

    }

    updateLeaveLeft();
    
  }, [singleSelect, selectedDate, endDate, duration, durationInHours]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const clientID = localStorage.getItem('ClientID');
        const response = await axios.get(`${apiUrl}/leave/leaveRequests?ClientID=${clientID}`);
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
        `${apiUrl}/user/user`,
        {
          UserID: UserID
        }
      );
      if (result.status === 200) {
        const data = result.data;
        const fullName = data.FullName;
        const endDateTime = new Date(endDate);
        const statusName = data.StatusName;

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


  function isWeekend(date) {
    // Convert to local time
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

    // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const dayOfWeek = localDate.getDay();

    // Return true if the day is Saturday (6) or Sunday (0)
    return dayOfWeek === 0 || dayOfWeek === 6;
}


  async function isBankHoliday(date) {
    // Convert to local time
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

    // Extract local date components
const year = localDate.getFullYear();
const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
const day = localDate.getDate().toString().padStart(2, '0');
const finalDate = `${year}-${month}-${day}`;

    try {
      const result = await axios.post(`${apiUrl}/leave/bankHoliday`, {
        Date: finalDate,
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

  async function isSameDayExistingLeave(date) {
    try {
      const result = await axios.post(`${apiUrl}/leave/sameDayExistingLeave`, {
        UserID: UserID,
        Date: date,
      });
  
      if (result.status === 200) {
        const sameDayExistingLeaveCheck = result.data.SameDayRequest;
        if (sameDayExistingLeaveCheck === 'No') {
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
      const clientResult = await axios.post(`${apiUrl}/user/currentClient`, {
        UserID: UserID,
      });
  
      if (clientResult.status === 200) {

        const workingWeekends = clientResult.data.WorkingWeekends;
        if (workingWeekends === "No" && isWeekend(slotInfo.start)) {
          setInvalidDate('Weekend');
          return false;
        }

        const bankHolidayCheck = await isBankHoliday(slotInfo.start);
        if (bankHolidayCheck) {
          setInvalidDate('Bank Holiday');
          return false;
        }

        const sameDayExistingLeaveCheck = await isSameDayExistingLeave(slotInfo.start);
        if(sameDayExistingLeaveCheck) {
          setInvalidDate('Duplicate Leave');
          return false;
        }
        
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  
    return false; // Default return value in case of error
  }

  
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
                  eventPropGetter={eventPropGetter}
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
                  longPressThreshold={0}
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
  <p><strong>Status:</strong> {leaveStatus}</p>
  <p><strong>Start:</strong> {formattedStart}</p>
  <p><strong>End:</strong> {formattedEnd}</p>
</SweetAlert>
)}


{showNotAllowedAlert && invalidDate && (
      <SweetAlert
        info
        title=''
        onConfirm={hideAlert}
        onCancel={hideAlert}
      >
        {getAlertMessage(invalidDate)}
      </SweetAlert>
    )}
    
    



      <Modal
        isOpen={showModal}
        toggle={() => setShowModal(!showModal)}
        style={{ paddingTop: '0px' }} 
      >
        <ModalHeader>Request Leave</ModalHeader>
      
      <ModalBody>
     
      <form onSubmit={handleFormSubmit}>
          
          <Label>Leave type</Label>
            <div>
            <FormGroup>

              <Select
                isRequired
                name="singleSelect"
                value={singleSelect.label}
                onChange={(selectedOption) => { setSingleSelect(selectedOption.value); setSingleSelectLabel(selectedOption.label) }}
                options={[
                  ...options,
                ]}
                placeholder="Select From Dropdown"
              />
            </FormGroup>
            </div>
       
        
          <Label>Start date</Label>
            <div>
            <FormGroup>
              <ReactDatetime
                ref={datetimeRef}
                inputProps={{
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
            </div>
       
          <Label>End date</Label>
            <div>
            <FormGroup>
              <ReactDatetime
                inputProps={{
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
            </div>

            <p style={{ color: "red"}}>
                {errorMessage}
              </p>
       
  <Label>Notes</Label>
    <div>
    <FormGroup>
      <Input type="textarea" 
      name="notes"
      onChange={(event) => {setNotes(event.target.value)}} />
    </FormGroup>
    </div>


        <hr />

{showEntitelementFields &&
        <div>
          <Label>Leave balance</Label>
            <FormGroup>
              <Input type="text" value={overallEntitelement} readOnly />
            </FormGroup>
          </div>
      }

        <div>
          <Label>Duration</Label>
            <FormGroup>
              <Input type="text" value={duration} readOnly />
            </FormGroup>
        </div>

        <hr /> 


{showEntitelementFields &&
        <div>
          <Label>Leave left</Label>
            <FormGroup>
              <Input type="text" value={balanceAfterDuration} readOnly />
            </FormGroup>
</div> 
      }
    

        <div className="d-flex justify-content-center">

          {disabled ? (<div title="Please fill in all required fields before submitting." style={{ display: 'inline-block', cursor: 'not-allowed', opacity: disabled ? 0.5 : 1 }}>
            <Button
              type="submit"
              color="success"
              disabled={disabled}
              style={{ position: 'relative', zIndex: 1 }}
              size="sm"
            >
              Submit
            </Button>
          </div>
          ) : (
            <Button
              type="submit"
              color="success"
              disabled={disabled}
              size="sm"
            >
              Submit
            </Button>
          )}


          <Button
            type="reset"
            style={{ display: "inline-block", visibility: "visible" }}
            color="danger"
            size="sm"
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

      </form>
        </ModalBody>
      
      </Modal>


      
      
    </>
  );
}

export default Calendar;


/*
<ModalHeader>Request Leave</ModalHeader>


        */