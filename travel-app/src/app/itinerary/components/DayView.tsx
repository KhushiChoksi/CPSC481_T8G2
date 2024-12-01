// https://fullcalendar.io/docs/css-customization
// https://fullcalendar.io/docs/bootstrap4
'use client';

import React, { useState } from 'react';
import Calendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import '@fortawesome/fontawesome-free/css/all.css';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { MdCancel } from 'react-icons/md';
import DateSelection from './DateSelection';
import RemoveEventConfirmation from './RemoveEventConfirmation';

const DayView = ({ isEditing }: { isEditing: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<any>(null);
  
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Calgary Tower',
      start: '2024-11-30T09:00:00',
      end: '2024-11-30T10:00:00',
      address: '101 9 Ave SW, Calgary, AB T2P 1J9',
    },
    {
      id: '2',
      title: 'Kinjo Sushi',
      start: '2024-11-30T12:00:00',
      end: '2024-11-30T12:30:00',
      address: '300 8 Ave SW, Calgary, AB T2P 1C6',
    },
  ]);

  const handleDeleteEvent = (eventId: string, eventTitle: string) => {
    setEventToDelete({ id: eventId, title: eventTitle });
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
    <div style={{ justifyContent: 'center', maxWidth: '500px' }}>
    
      {isModalOpen && (
        <DateSelection
          onClose={() => setIsModalOpen(false)}         // close modal
          onGoBack={() => setIsModalOpen(false)}        // go back button
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
        events={events}
        eventContent={(eventInfo) =>
          renderEventContent(eventInfo, isEditing, handleDeleteEvent)
        }
        eventColor="#FDFFD1"
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
  eventInfo: { event: any },
  isEditing: boolean,
  handleDeleteEvent: (id: string, title: string) => void
) {
  const { event } = eventInfo; // access event data
  const address = event.extendedProps.address; // get address from event
  const startTime = event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // get start time
  const endTime = event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // get end time

  return (
    <div style={{ position: 'relative' }}>
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
