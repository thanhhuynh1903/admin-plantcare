import React, { useState, useEffect, useRef } from "react";
import { Box, Button } from "@mui/material";
import "./CalendarViewYear.scss";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export default function CalendarViewYear({ currentDate, onSelectYear }) {
  const currentYear = currentDate.getFullYear();
  const [startYear, setStartYear] = useState(currentYear - 7);
  const years = Array.from({ length: 15 }, (_, i) => startYear + i);
  const currentYearRef = useRef(null);

  // Scroll to current year on initial load
  useEffect(() => {
    if (currentYearRef.current) {
      currentYearRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  // Navigate to the previous set of years
  const handlePrevious = () => {
    setStartYear((prevStartYear) => prevStartYear - 15);
  };

  // Navigate to the next set of years
  const handleNext = () => {
    setStartYear((prevStartYear) => prevStartYear + 15);
  };

  return (
    <div className="calendar-view-year">
      <div className="year-navigation">
        <Button className="btn-nav" onClick={handlePrevious}>
          <ArrowLeftIcon />
        </Button>
        <div className="year-grid">
          {years.map((year) => (
            <Box
              key={year}
              ref={year === currentYear ? currentYearRef : null}
              className={`calendar-year-tile ${year === currentYear ? "highlighted" : ""}`}
              onClick={() => onSelectYear(year)}
            >
              <p>{year}</p>
            </Box>
          ))}
        </div>
        <Button className="btn-nav" onClick={handleNext}>
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
}
