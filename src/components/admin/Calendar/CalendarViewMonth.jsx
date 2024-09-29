import React from "react";
import { Box } from "@mui/material";
import "./CalendarViewMonth.scss";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function CalendarViewMonth({ currentDate, onSelectMonth }) {
  const currentMonth = currentDate.getMonth();

  return (
    <div className="calendar-view-month">
      <div className="month-grid">
        {months.map((month, index) => (
          <Box
            key={index}
            className={`calendar-month-tile ${index === currentMonth ? "highlighted" : ""}`} // Add class conditionally
            onClick={() => onSelectMonth(index)}
          >
            <p>{month}</p>
          </Box>
        ))}
      </div>
    </div>
  );
}
