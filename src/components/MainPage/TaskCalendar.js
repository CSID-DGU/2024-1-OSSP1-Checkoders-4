import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import './MainPage2.css';
import './CalendarStyle.css'; // 커스텀 스타일

function TaskCalendar() {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="main-task-calendar">
      <div className="main-calendar-header">
        과제 캘린더
      </div>
      <Calendar onChange={onChange} value={date}/>
    </div>
  );
}

export default TaskCalendar;