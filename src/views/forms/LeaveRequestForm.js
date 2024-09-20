import React, { useState, useEffect, useRef} from "react";
import { Modal, ModalHeader, ModalBody, Button, FormGroup, Label, Input } from 'reactstrap';
import ReactDatetime from "react-datetime";
import Select from "react-select";
import axios from 'axios';
import { submitNewLeaveSuccess, submitNewLeaveError } from '../components/SweetAlert';
import { useNavigate } from 'react-router-dom';
import moment, { invalid } from "moment";



function LeaveRequestForm({ showModal, setShowModal }) {
    // Get the current date and time as a string in ISO format (or customize as needed)
    const initialStartDate = new Date();
    initialStartDate.setHours(9, 0, 0, 0);
    const initialEndDate = new Date();
    initialEndDate.setHours(17, 0, 0, 0);
    
    const [eventsState, setEventsState] = useState([]);
    const [singleSelect, setSingleSelect] = useState("");
    const [singleSelectLabel, setSingleSelectLabel] = useState("");
    const [options, setOptions] = useState([]);
    const [selectedDate, setSelectedDate] = useState(initialStartDate);
    const [endDate, setEndDate] = useState(initialEndDate);
    const [disabled, setDisabled] = useState(true);
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
    const clientID = localStorage.getItem('ClientID');
    const navigate = useNavigate();

  // Use an array to initialize state
  const [users, setUsers] = useState([]);
  const [selectedUserObject, setSelectedUserObject] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedUserLabel, setSelectedUserLabel] = useState('');


  const handleChange = (field, value) => {
    // Update the corresponding state variable
    switch (field) {
      case 'LineManagerID':
        setSelectedUserObject(value);
        setSelectedUser(value.value);
        setSelectedUserLabel(value.label);
        break;
    }
  
  };


  useEffect(() => {
    async function fetchLeaveType() {
      try {
        axios.defaults.withCredentials = true;
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
        axios.defaults.withCredentials = true;
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

  function isWeekend(date) {
    // First, ensure that `date` is a valid moment object or JavaScript Date object
    const momentDate = moment(date);
  
    if (!momentDate.isValid()) {
      throw new Error("Invalid date passed to isWeekend");
    }
  
    // Check if it's a weekend
    const day = momentDate.day(); // 0 for Sunday, 6 for Saturday
    return (day === 0 || day === 6);
  }


  async function isBankHoliday(date) {
    // Ensure the `date` parameter is a valid Date object
    const parsedDate = new Date(date);
  
    if (isNaN(parsedDate.getTime())) {
      console.error("Invalid date passed to isBankHoliday:", date);
      return true; // Return `true` in case of an invalid date
    }
  
    // Convert to local time by adjusting for the timezone offset
    const localDate = new Date(parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60000);
  
    // Extract local date components
    const year = localDate.getFullYear();
    const month = (localDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const day = localDate.getDate().toString().padStart(2, '0');
    const finalDate = `${year}-${month}-${day}`; // Format: YYYY-MM-DD
  
    try {
      // Send the date to your API to check if it's a bank holiday
      axios.defaults.withCredentials = true;
      const result = await axios.post(`${apiUrl}/leave/bankHoliday`, {
        Date: finalDate, // Sending date in ISO format
      });
  
      if (result.status === 200) {
        const bankHolidayCheck = result.data.BankHoliday;
        return bankHolidayCheck !== 'No'; // Return true if it is a bank holiday
      }
    } catch (error) {
      console.error("Error checking bank holiday:", error);
    }
  
    return false; // Default return value if not a bank holiday or in case of error
  }
  


  async function isSameDayExistingLeave(date) {

    const parsedDate = new Date(date);
  
    if (isNaN(parsedDate.getTime())) {
      console.error("Invalid date passed to isBankHoliday:", date);
      return true; // Return `true` in case of an invalid date
    }

    // Convert to local time by adjusting for the timezone offset
    const localDate = new Date(parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60000);

    // Extract local date components
const year = localDate.getFullYear();
const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
const day = localDate.getDate().toString().padStart(2, '0');
const finalDate = `${year}-${month}-${day}`;

    try {
      axios.defaults.withCredentials = true;
      const result = await axios.post(`${apiUrl}/leave/sameDayExistingLeave`, {
        UserID: selectedUser,
        Date: finalDate,
      });
  
      if (result.status === 200) {
        const sameDayExistingLeaveCheck = result.data.SameDayRequest;
        if (sameDayExistingLeaveCheck === 'No') {
          return false;
        }
        else if(sameDayExistingLeaveCheck === 'Yes')
        {
          return true;
        }
      }
    } catch (error) {
      console.error(error);
    }
  
  }

  
  async function calculateDurationEntitelementLeft(start, end) {
    try {
      axios.defaults.withCredentials = true;
      const result = await axios.post(
        `${apiUrl}/leave/userHolidayInfo`,
        {
          UserID: selectedUser,
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


  async function beforeLoadFormCheck(start) {
    try {
      axios.defaults.withCredentials = true;
      const clientResult = await axios.post(`${apiUrl}/user/currentClient`, {
        UserID: UserID,
      });
  
      if (clientResult.status === 200) {
        console.log("Client fetched successfully");
        const workingWeekends = clientResult.data.WorkingWeekends;
  
        // Check for weekends
        const isWeekendCheck = await isWeekend(start);
        if (workingWeekends === "No" && isWeekendCheck) {
          console.log("Weekend check failed");
          setInvalidDate('Weekend');
          return false;
        }
  
        // Check for bank holidays
        console.log("Checking for bank holidays...");
        const bankHolidayCheck = await isBankHoliday(start);
        if (bankHolidayCheck) {
          console.log("Bank holiday check failed");
          setInvalidDate('Bank Holiday');
          return false;
        }
  
        // Check for duplicate leave
        console.log("Checking for duplicate leave...");
        const sameDayExistingLeaveCheck = await isSameDayExistingLeave(start);
        if (sameDayExistingLeaveCheck) {
          console.log("Duplicate leave check failed");
          setInvalidDate('Duplicate Leave');
          return false;
        }
  
        console.log("All checks passed");
        return true;
      }
    } catch (error) {
      console.error("Error in beforeLoadFormCheck:", error);
      return false; // In case of error, prevent the form submission
    }
  }
  
  


async function handleFormSubmit(event) {
  event.preventDefault();

  const clientID = localStorage.getItem('ClientID');
  const fullDays = getDaysFromString(duration);
  const fullHours = getHoursFromString(duration);
  const startDateForm = formatTimestampForSQL(selectedDate);
  const endDateForm = formatTimestampForSQL(endDate);

  // Check before loading the form
const beforeFormLoadCheck = await beforeLoadFormCheck(selectedDate);
if (!beforeFormLoadCheck) {
  console.log("Form not allowed to be submitted");
  setShowNotAllowedAlert(true);
  return; // If it returns false, stop the execution
}


  try {
    axios.defaults.withCredentials = true;
    const result = await axios.post(`${apiUrl}/leave/submitLeave`, {
      UserID: selectedUser,
      LeaveTypeID: singleSelect,
      StartDateTime: startDateForm,
      EndDateTime: endDateForm,
      WorkingDays: fullDays,
      WorkingHours: fullHours,
      Notes: notes
    });

    if (result.status === 200) {
      setShowModal(false);
      setShowAlert(true);
      setEndDate("");
      setSingleSelect("");
      setSelectedDate("");
      setEndDate("");
      setSingleSelectLabel("");
      setSelectedUser("");
      setDuration("");

    } else {
      console.error("Failed to submit the leave request.");
    }
    const response = await axios.get(`${apiUrl}/leave/leaveRequests?ClientID=${clientID}`);
    if (response.status === 200) {
      const data = response.data;
      setEventsState(data);
    }

  } catch (error) {
    console.error("Error during form submission:", error);
    // Optional: handle the form state reset here or notify the user
  }
}

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [showModal]);


  const hideAlert = () => {
    setShowNotAllowedAlert(false);
  };

  const hideSuccessAlert = () => {
    setShowAlert(false);
    // refresh page -> temporary solution - we should handle it better by calling the api's again on the dashboard
    window.location.reload();
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

    const fetchData = async () => {

      try {
        // Fetch line managers
        axios.defaults.withCredentials = true;
        const lineManagersResponse = await axios.post(
          `${apiUrl}/user/getLineManagers`,
          { clientId: clientID },
          { headers: { 'Content-Type': 'application/json' } }
        );
  
        if (lineManagersResponse.data && lineManagersResponse.data.LineManagers) {
          const lineManagersArray = lineManagersResponse.data.LineManagers.map(manager => ({
            value: manager.value,
            label: manager.label,
          }));

setUsers(lineManagersArray);
        

} else {
          console.error('Invalid response format for line managers:', lineManagersResponse.data);
        }
  
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  
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
    calculateDurationEntitelementLeft();
    
  }, [selectedUser, singleSelect, selectedDate, endDate, duration, durationInHours, invalidDate]);


return (
    <div className="content">
    <div>
{showAlert && submitNewLeaveSuccess(() => hideSuccessAlert())}
{showNotAllowedAlert && submitNewLeaveError(() => hideAlert(), getAlertMessage(invalidDate))}
  
  
  
      <Modal
          isOpen={showModal}
          toggle={() => setShowModal(!showModal)}
          style={{ paddingTop: '0px' }} 
        >
          <ModalHeader>Request Leave</ModalHeader>
        
        <ModalBody>
       
        <form onSubmit={handleFormSubmit}>

        <Label>Employee</Label>
              <div>
              <FormGroup>
  
              <Select
    name="linemanagers"
    placeholder="Select From Dropdown"
    value={selectedUserObject}
    options={users}
    onChange={(selectedOption) => {
      if (!selectedOption) { // Check if selectedOption is null (field has been cleared)
        handleChange('LineManagerID', ""); // Call handleChange to handle clearing
      }   
      else
      {
        handleChange('LineManagerID', selectedOption);
      } 
    }}
  />
              </FormGroup>
              </div>
            
            <Label>Leave Type</Label>
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
         
          
            <Label>Start Date</Label>
              <div>
              <FormGroup>
                <ReactDatetime
                  ref={datetimeRef}
                  inputProps={{
                    placeholder: "Select Date",
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
         
            <Label>End Date</Label>
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
            <Label>Leave Balance</Label>
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
            <Label>Leave Left</Label>
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
    </div>
    </div>
  );
}

export default LeaveRequestForm;