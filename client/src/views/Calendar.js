import React, { useState, useEffect, useCallback, useRef } from "react";
// react component used to create a calendar with events on it
import {
  Calendar as ReactBigCalendar,
  momentLocalizer
} from "react-big-calendar";
// dependency plugin for react-big-calendar
import moment from "moment";
import { events } from "variables/general.js";
import ReactDatetime from "react-datetime";
import Select from "react-select";
import axios from 'axios';
import "../assets/css/paper-dashboard.css";
import Modal from 'react-modal';


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
  const [eventsState, setEventsState] = React.useState(events);
  const selectedEvent = (event) => { alert(event.title) };
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
  const datetimeRef = useRef();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const inputRef = useRef(null);


  Modal.setAppElement('#root');

  useEffect(() => {
    async function fetchLeaveType() {
      const UserID = localStorage.getItem("UserID");
      try {
        const result = await axios.post(
          "http://localhost:8800/leaveType",
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


  
  async function calculateDurationEntitelementLeft(start, end) {
    const UserID = localStorage.getItem("UserID");
    try {
      const result = await axios.post(
        "http://localhost:8800/userHolidayInfo",
        {
          UserID: UserID,
        }
      );
      if (result.status === 200) {
        const data = result.data;
        const userWorkingShiftDuration = data.WorkingShiftHours;
        const userHolidayEntitelementLeftDays = data.HolidayEntitelementLeftDays == null ? 0 : data.HolidayEntitelementLeftDays;
        const userHolidayEntitelementLeftHours = data.HolidayEntitelementLeftHours == null ? 0 : data.HolidayEntitelementLeftHours;
        const currentUserHolidayEntitelementOverall = (userHolidayEntitelementLeftDays == 1 ? userHolidayEntitelementLeftDays + " day " : userHolidayEntitelementLeftDays + " days ") +  (userHolidayEntitelementLeftHours == 1 ? userHolidayEntitelementLeftHours + " hour ": userHolidayEntitelementLeftHours + " hours ");
        const currentBalanceInHours = userHolidayEntitelementLeftDays * userWorkingShiftDuration + userHolidayEntitelementLeftHours;
        const diffInMs = new Date(end).getTime() - new Date(start).getTime();
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
      }
    } catch (error) {
      console.error(error);
    }
  }
  


  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (selectedSlot) {
      addNewEvent(selectedSlot, singleSelectLabel, selectedDate, endDate);
      setShowModal(false);
      setEndDate("");
      setSingleSelect("");
      setSelectedDate("");
      setSingleSelectLabel("");
    }
  };


  const addNewEventAlert = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setShowModal(true);
  };


  useEffect(() => {
    if (showModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [showModal]);


  
  async function HoursToDays(props) {
    const days = parseFloat(props);
    const totalDays = Math.floor(days % 24);
    const remainingHours = Math.round(days / 24);
    const daysString = totalDays === 1 ? '1 day' : `${totalDays} days`;
    const hoursString = remainingHours === 1 ? '1 hour' : `${remainingHours} hours`;
  
    return `${daysString} ${hoursString}`;
  }
  
  
  
  useEffect(() => {
    if (singleSelect !== '' && selectedDate !== '' && endDate !== '') {
      setDisabled(false);
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
      
    const input = (currentBalanceInHours - durationInHours) / workingShiftHours
   
    const result = await HoursToDays(input)
    setBalanceAfterDuration(result)
    }
    updateLeaveLeft();

    
  }, [singleSelect, selectedDate, endDate, duration, durationInHours]);





  const addNewEvent = async (slotInfo, singleSelectName, selectedDate, endDate) => {
    const UserID = localStorage.getItem("UserID");
    try {
      const result = await axios.post(
        "http://localhost:8800/user",
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



  const eventColors = (event, start, end, isSelected) => {
    var backgroundColor = "event-";
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + "default");
    return {
      className: backgroundColor
    };
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
                  onSelectEvent={(event) => selectedEvent(event)}
                  onSelectSlot={(slotInfo) => { 
                    addNewEventAlert(slotInfo); 
                    setSelectedDate(slotInfo.start.setHours(9, 0, 0, 0)); 
                    setEndDate(slotInfo.start.setHours(17, 0, 0, 0)) }}
                  eventPropGetter={eventColors}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

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
                  placeholder="Select Date"
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
                      console.log("New end date is before selected date");
                      const endDateInput = document.querySelector(".rdtOpen input"); // Get the end date field's input element
                      console.log(endDateInput)
                      if (endDateInput) {
                        console.log("heree", endDateInput)
                        inputRef.current.blur();
                        //endDateInput.blur(); // Remove the focus from the input element to close the field
                      }
                    } else {
                      setEndDate(date);
                    }
                  }}
                  dateFormat="DD/MM/YYYY"
                  timeFormat="HH A"
                  isValidDate={(currentDate) => {
                      return currentDate.isSameOrAfter(selectedDate, "day");
                  }}
                  inputRef={inputRef} 

                
                />
              </FormGroup>


            </Col>
          </Row>

          <hr /> {/* Add horizontal line here */}

          <Row>
            <Label md="3">Leave balance</Label>
            <Col md="9">
              <FormGroup>
                <Input type="text" value={overallEntitelement} readOnly />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Label md="3">Duration</Label>
            <Col md="9">
              <FormGroup>
                <Input type="text" value={duration} readOnly />
              </FormGroup>
            </Col>
          </Row>

          <hr /> {/* Add horizontal line here */}

          <Row>
            <Label md="3">Leave left</Label>
            <Col md="9">
              <FormGroup>
                <Input type="text" value={balanceAfterDuration} readOnly />
              </FormGroup>
            </Col>
          </Row>


          <div className="button-container text-center">

            {disabled ? (<div title="Please fill in all required fields before submitting." style={{ display: 'inline-block', cursor: 'not-allowed', opacity: disabled ? 0.5 : 1 }}>
              <Button
                type="submit"
                className="btn-round"
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
                className="btn-round"
                color="info"
                disabled={disabled}
              >
                Submit
              </Button>
            )}


            <Button
              className="btn-round"
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
