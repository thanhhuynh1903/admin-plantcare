import React from 'react';
import './CalendarViewDay.scss';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function CalendarViewDay({ currentDate }) {
  const today = new Date();
  const isToday = (day, month, year) => {
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year) || 7;

    const days = [];

    // Previous month's days
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevMonth, prevMonthYear);

    for (let i = firstDay - 1; i > 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="calendar-day prev-month">
          <p>{daysInPrevMonth - i + 1}</p>
        </div>
      );
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const isCurrentDay = isToday(day, month, year);
      days.push(
        <div key={day} className={`calendar-day current-month ${isCurrentDay ? 'current-day' : ''}`}>
          <p>{day}</p>
        </div>
      );
    }

    // Next month's days
    const totalDaysDisplayed = days.length;
    const nextMonthDays = 42 - totalDaysDisplayed; // 6 weeks = 42 days

    for (let i = 1; i <= nextMonthDays; i++) {
      days.push(
        <div key={`next-${i}`} className="calendar-day next-month">
          <p>{i}</p>
        </div>
      );
    }

    // Group days into weeks (7 days per week)
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    // Remove the last week if all days are from the next month
    const lastWeek = weeks[weeks.length - 1];
    const allNextMonth = lastWeek.every(
      (day) => day.key && day.key.startsWith('next-')
    );

    if (allNextMonth) {
      weeks.pop();
    }

    return weeks.flat();
  };

  return (
    <div className="calendar-view-day">
      <div className="calendar-week-day">
        {daysOfWeek.map((day) => (
          <p key={day}>{day}</p>
        ))}
      </div>
      <div className="calendar-days-grid">
        {renderDays()}
      </div>
    </div>
  );
}
