// https://fullcalendar.io/docs/css-customization
// https://fullcalendar.io/docs/bootstrap4

'use client';

import React from 'react';
import Calendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

// import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';

import bootstrapPlugin from '@fullcalendar/bootstrap';

import styles from './DayView.module.css'


const DayView = () => {
  const events = [
    {
      title: 'Calgary Tower',
      start: '2024-11-30T09:00:00',
      end: '2024-11-30T10:00:00',
    },
    {
      title: 'Kinjo Sushi',
      start: '2024-11-30T12:00:00',
      end: '2024-11-30T13:00:00',
    },
  ];

  return (
    <div 
      style={{   
        justifyContent: 'center', 
        maxWidth: '500px',
      }}>
      <Calendar
        themeSystem='bootstrap'

        plugins={[timeGridPlugin, bootstrapPlugin]}
        initialView="timeGridDay"
        events={events}
        eventColor='white'
        eventTextColor='black'
        eventBorderColor='black'
        height='600px'
        allDaySlot = {false}
        headerToolbar={{
          left: 'calendarIcon',
          center: 'title',
          right: ''
        }}
        eventTimeFormat={{ hour: '2-digit', minute: '2-digit', hour12: true }}      // show time with AM and PM
        dayCellClassNames={styles.customDayCell}

        customButtons={{
          calendarIcon: {
            text: ' ',
            bootstrapFontAwesome: "fa-calendar-plus",         // calendar icon with plus
            click: function() {
              alert('clicked the calendar button!');          // filler code for modal pop-up
            }
          },
        }}

        editable = {true}

      />
    </div>
  );
};

export default DayView;
