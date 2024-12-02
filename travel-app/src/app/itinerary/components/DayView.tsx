// https://fullcalendar.io/docs/css-customization
// https://fullcalendar.io/docs/bootstrap4
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Calendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import '@fortawesome/fontawesome-free/css/all.css';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { MdCancel } from 'react-icons/md';
import DateSelection from './DateSelection';
import RemoveEventConfirmation from './RemoveEventConfirmation';

import { Value } from 'react-calendar/dist/esm/shared/types.js';
import "../../globals.css";

interface Event {
  id: string;
  title: string;
  start: string | Date | null;
  end: string | Date | null;
  extendedProps: {
    address?: string;
  };
}

const DayView = ({ isEditing }: { isEditing: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<Event | null >(null);

  const [currentDate, setCurrentDate] = useState(new Date());     // initial date as today
  const calendarRef = useRef<Calendar | null>(null);

  const handleDateChange = (value: Value) => {
    if (value === null) return;           // return if no date is selected

    const selectedDate = Array.isArray(value) ? value[0] : value;       // if a range of dates is selected, take the first date

    if (selectedDate !== null) {
      const localDate = new Date(selectedDate);               // fix the selected date to local time

      localDate.setHours(0, 0, 0, 0);                         // set the time to midnight to avoid timezone shifts

      localStorage.setItem('selectedDate', localDate.toISOString());      // save the date, so it doesn't reset each time the user goes to a different screen

      setCurrentDate(localDate);                              // set the corrected date to currentDate state

      console.log(localDate);                                 // print selected date to console to ensure it works right

      // move itinerary view to the new date
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.gotoDate(localDate);
      }
    }
  };

  // useEffect(() => {
  //   if (calendarRef.current) {
  //     const calendarApi = calendarRef.current.getApi();
  //     calendarApi.gotoDate(currentDate); // Move the calendar to the selected date when `currentDate` changes
  //   }
  // }, [currentDate]);

  useEffect(() => {
    // Retrieve the saved date from localStorage
    const savedDate = localStorage.getItem('selectedDate');
  
    if (savedDate) {
      const localDate = new Date(savedDate);
      setCurrentDate(localDate);
  
      // Move FullCalendar to the saved date
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.gotoDate(localDate);
      }
    }
  }, []);
  

  
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Calgary Tower',
      start: '2024-12-01T09:00:00',
      end: '2024-12-01T10:00:00',
      extendedProps: {address: '101 9 Ave SW, Calgary, AB T2P 1J9'},
    },
    {
      id: '2',
      title: 'Kinjo Sushi',
      start: '2024-12-01T12:00:00',
      end: '2024-12-01T12:30:00',
      extendedProps : {address: '300 8 Ave SW, Calgary, AB T2P 1C6'},
    },
  ]);

  const handleDeleteEvent = (eventId: string, eventTitle: string) => {
    // setEventToDelete({ id: eventId, title: eventTitle });

    // Find the event by its ID
    const eventToDelete = events.find((event) => event.id === eventId);
    
    // If event is found, set it in state
    if (eventToDelete) {
      setEventToDelete({id: eventId, title: eventTitle, start: '', end: '', extendedProps: {address: ''}}); // Set the full event to delete
      setIsModalOpen(true); // Open the modal
    } else {
      console.error('Event not found');
    }
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (eventToDelete) {
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventToDelete.id));
      setIsModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setEventToDelete(null);
  };

  return (
    <div className="justify-center max-w-[500]">
    
      {isModalOpen && (
        <DateSelection
          onClose={() => setIsModalOpen(false)}         // close modal
          onGoBack={() => setIsModalOpen(false)}        // go back button
          handleDateChange={handleDateChange}
        />
      )}

      {isModalOpen && eventToDelete && (
        <RemoveEventConfirmation
          eventTitle={eventToDelete.title}
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}

      <Calendar
        themeSystem="bootstrap"
        plugins={[timeGridPlugin, bootstrapPlugin]}
        initialView="timeGridDay"

        timeZone="local"                  // use local time
        initialDate={currentDate}
        ref={calendarRef}        

        events={events}
        eventContent={(eventInfo) =>
          renderEventContent(eventInfo, isEditing, handleDeleteEvent)
        }
        eventColor="#FDFFD1"
        eventMaxStack={1}
        eventTextColor="black"
        eventBorderColor="black"
        eventTimeFormat={{ hour: '2-digit', minute: '2-digit', hour12: true }} // show time with AM and PM
        slotDuration="00:30:00"
        height="550px"
        allDaySlot={false}
        headerToolbar={{
          left: 'calendarIcon',
          center: 'title',
          right: '',
        }}
        customButtons={{
          calendarIcon: {
            text: ' ',
            bootstrapFontAwesome: 'fa-calendar-plus', // calendar icon with plus
            click: function () {
              setIsModalOpen(true);
            },
          },
        }}
        editable={true}
      />
    </div>
  );
};

function renderEventContent(
  eventInfo: { event: Event },
  isEditing: boolean,
  handleDeleteEvent: (id: string, title: string) => void
) {
  const { event } = eventInfo; // access event data
  const address = event.extendedProps.address; // get address from event
  const startTime = event.start?.toLocaleString([], { hour: '2-digit', minute: '2-digit' }); // get start time
  const endTime = event.end?.toLocaleString([], { hour: '2-digit', minute: '2-digit' }); // get end time

  return (
    <div className="relative">
      {isEditing && (
        <MdCancel
          style={{
            color: 'red',
            position: 'absolute',
            top: '-1px',
            right: '-1px',
            cursor: 'pointer',
            fontSize: '30px',
          }}
          onClick={() => handleDeleteEvent(event.id, event.title)}
          title="Delete Event"
        />
      )}
      <strong>{event.title}</strong>
      <div className="italic"> {startTime} - {endTime} </div>
      {address && <div>{address}</div>}
    </div>
  );
}

export default DayView;
