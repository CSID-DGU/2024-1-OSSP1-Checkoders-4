import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import './MainPage2.css';

function TaskCalendar() {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div>
      <div className="main-calendar-header">
        <span>과제 마감 기한</span>
      </div>
      <Calendar onChange={onChange} value={date}/>
    </div>
  );
}

export default TaskCalendar;