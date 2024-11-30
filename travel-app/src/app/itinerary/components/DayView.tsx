// https://fullcalendar.io/docs/css-customization
// https://fullcalendar.io/docs/bootstrap4

'use client';

import React, { useState } from 'react';
import Calendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

// import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';

import bootstrapPlugin from '@fullcalendar/bootstrap';

import DateSelection from './DateSelection';

const DayView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const events = [
    {
      title: 'Calgary Tower',
      start: '2024-11-30T09:00:00',
      end: '2024-11-30T10:00:00',
      address: '101 9 Ave SW, Calgary, AB T2P 1J9',
    },
    {
      title: 'Kinjo Sushi',
      start: '2024-11-30T12:00:00',
      end: '2024-11-30T12:30:00',
      address: '300 8 Ave SW, Calgary, AB T2P 1C6',
    },
  ];

  return (
    <div 
      style={{   
        justifyContent: 'center', 
        maxWidth: '500px',
      }}>

      {isModalOpen && (
        <DateSelection
          onClose={() => setIsModalOpen(false)} // Close the modal
          onGoBack={() => setIsModalOpen(false)} // Go back action, close the modal
        />
      )}

      <Calendar
        themeSystem='bootstrap'

        plugins={[timeGridPlugin, bootstrapPlugin]}
        initialView="timeGridDay"
        events={events}
        eventContent={renderEventContent}

        eventColor='#FDFFD1'
        eventTextColor='black'
        eventBorderColor='black'
        eventTimeFormat={{ hour: '2-digit', minute: '2-digit', hour12: true }}      // show time with AM and PM

        slotDuration="00:30:00"

        height='600px'
        allDaySlot = {false}
        headerToolbar={{
          left: 'calendarIcon',
          center: 'title',
          right: ''
        }}

        customButtons={{
          calendarIcon: {
            text: ' ',
            bootstrapFontAwesome: "fa-calendar-plus",         // calendar icon with plus
            click: function () {
              setIsModalOpen(true); // Open the modal
            },
          },
        }}

        editable = {true}

      />
    </div>
  );
};

function renderEventContent(eventInfo: { event: any; }) {
  const { event } = eventInfo; // access event data
  const address = event.extendedProps.address; // get address from event
  const startTime = event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });   // get start time
  const endTime = event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });       // get end time

  return (
    <div>
      <strong>{event.title}</strong> 
      <div className='italic'>{startTime} - {endTime}</div>
      <div>{address && <p>{address}</p>}</div> {/* Address, only show if available */}
    </div>
  );
}


export default DayView;