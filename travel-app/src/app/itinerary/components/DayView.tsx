// https://fullcalendar.io/docs/css-customization

'use client';

import React from 'react';
import Calendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import styles from './DayView.module.css'

const DayView = () => {
  const events = [
    {
      title: 'Calgary Tower',
      start: '2024-11-29T09:00:00',
      end: '2024-11-29T10:00:00',
    },
    {
      title: 'Kinjo Sushi',
      start: '2024-11-29T12:00:00',
      end: '2024-11-29T13:00:00',
    },
  ];

  return (
    <div style={{ width: '95%', height: '100%', background: 'white', justifyContent: 'center'}}>
      <Calendar
        plugins={[timeGridPlugin]}
        initialView="timeGridDay"
        events={events}
        eventColor='white'
        eventTextColor='black'
        eventBorderColor='black'
        height='630px'
        allDaySlot = {false}
        eventTimeFormat={{ hour: '2-digit', minute: '2-digit', hour12: true }}      // show time with AM and PM
        dayCellClassNames={styles.customDayCell}
      />
    </div>
  );
};

export default DayView;
