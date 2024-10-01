import React from "react";
import "./CalendarViewDay.scss";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { getApiCalendarDay, DATE_TYPE } from "./CalendarViewDay.prop";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CalendarViewDay({ currentDate }) {
  const [calendarDays, setCalendarDays] = React.useState(getApiCalendarDay());

  const today = new Date();
  const isToday = (day, month, year) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const formatUrl = (year, month, day) => {
    // Format year, month, and day as yyyyMMdd
    const formattedMonth = (month + 1).toString().padStart(2, "0");
    const formattedDay = day.toString().padStart(2, "0");
    return `/calendar/${year}${formattedMonth}${formattedDay}`;
  };

  const findEventsForDay = (day, month, year) => {
    return calendarDays.find(
      (d) => d.day === day && d.month === month + 1 && d.year === year
    )?.events || [];
  };

  const renderEventNodes = (events) => {
    return events.map((event) => (
      <div key={event.id} className="event-node" style={DATE_TYPE[event.type]}>
        <p>{event.name}</p>
      </div>
    ));
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year) || 7;

    const days = [];

    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevMonth, prevMonthYear);

    // Previous month's days
    for (let i = firstDay - 1; i > 0; i--) {
      const prevDay = daysInPrevMonth - i + 1;
      const events = findEventsForDay(prevDay, prevMonth, prevMonthYear);
      days.push(
        <Box
          key={`prev-${i}`}
          className="calendar-day prev-month"
          component={Link}
          to={formatUrl(prevMonthYear, prevMonth, prevDay)}
        >
          <p>{prevDay}</p>
          <Box className="event-list">{renderEventNodes(events)}</Box>
        </Box>
      );
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const isCurrentDay = isToday(day, month, year);
      const events = findEventsForDay(day, month, year);
      days.push(
        <Box
          key={day}
          className={`calendar-day current-month ${
            isCurrentDay ? "current-day" : ""
          }`}
          component={Link}
          to={formatUrl(year, month, day)}
        >
          <p>{day}</p>
          <Box className="event-list">{renderEventNodes(events)}</Box>
        </Box>
      );
    }

    // Next month's days
    const totalDaysDisplayed = days.length;
    const nextMonthDays = 42 - totalDaysDisplayed; // 6 weeks = 42 days

    for (let i = 1; i <= nextMonthDays; i++) {
      const events = findEventsForDay(i, month + 1, year);
      days.push(
        <Box
          key={`next-${i}`}
          className="calendar-day next-month"
          component={Link}
          to={formatUrl(year, month + 1, i)}
        >
          <p>{i}</p>
          <Box className="event-list">{renderEventNodes(events)}</Box>
        </Box>
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
      (day) => day.key && day.key.startsWith("next-")
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
      <div className="calendar-days-grid">{renderDays()}</div>
    </div>
  );
}
