import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Assignment } from '../types';

interface Props {
  assignments: Assignment[];
}

export default function Calendar({ assignments }: Props) {
  const events = assignments.map(assignment => ({
    id: assignment.id,
    title: `${assignment.subject}: ${assignment.title}`,
    start: assignment.dueDate,
    backgroundColor: assignment.completed ? '#10B981' : '#4F46E5',
    borderColor: assignment.completed ? '#059669' : '#4338CA',
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
        height="auto"
        locale="fr"
      />
    </div>
  );
}