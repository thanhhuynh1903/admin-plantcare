import { Link, useParams } from "react-router-dom";
import "./CalendarDetailPage.scss";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { Box, Button, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { getApiCalendarDay } from "../CalendarViewDay.prop";
import EventCard from "./EventCard";
import EditDateDescriptionDialog from "./EditDateDescriptionDialog";
import AddEventDialog from "./AddEventDialog";
import EditEventDialog from "./EditEventDialog";
import DeleteEventDialog from "./DeleteEventDialog";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CalendarDetailPage() {
  const { date } = useParams();
  const year = parseInt(date.slice(0, 4), 10);
  const month = parseInt(date.slice(4, 6), 10);
  const day = parseInt(date.slice(6, 8), 10);

  const calendarDayData = getApiCalendarDay().find(
    (d) => d.day === day && d.month === month && d.year === year
  );

  const [events, setEvents] = useState(
    calendarDayData ? calendarDayData.events : []
  );
  const [description, setDescription] = useState(
    "General meeting for events on this day."
  );

  // Dialog state management
  const [isEditDescriptionOpen, setEditDescriptionOpen] = useState(false);
  const [isAddEventOpen, setAddEventOpen] = useState(false);
  const [isEditEventOpen, setEditEventOpen] = useState(false);
  const [isDeleteEventOpen, setDeleteEventOpen] = useState(false);

  const [currentEvent, setCurrentEvent] = useState(null);

  const handleOpenEditDescription = () => setEditDescriptionOpen(true);
  const handleCloseEditDescription = () => setEditDescriptionOpen(false);

  const handleOpenAddEvent = () => setAddEventOpen(true);
  const handleCloseAddEvent = () => setAddEventOpen(false);

  const handleOpenEditEvent = (event) => {
    setCurrentEvent(event);
    setEditEventOpen(true);
  };
  const handleCloseEditEvent = () => setEditEventOpen(false);

  const handleOpenDeleteEvent = (event) => {
    setCurrentEvent(event);
    setDeleteEventOpen(true);
  };
  const handleCloseDeleteEvent = () => setDeleteEventOpen(false);

  const handleSaveDescription = (newDescription) => {
    setDescription(newDescription);
  };

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const handleEditEvent = (updatedEvent) => {
    setEvents(
      events.map((event) => (event === currentEvent ? updatedEvent : event))
    );
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter((event) => event !== currentEvent));
    setDeleteEventOpen(false);
  };

  const getDaySuffix = (day) => {
    if (day % 10 === 1 && day !== 11) return "st";
    if (day % 10 === 2 && day !== 12) return "nd";
    if (day % 10 === 3 && day !== 13) return "rd";
    return "th";
  };

  return (
    <div className="page-calendar-detail">
      <div className="main-label">
        <Button component={Link} to="/calendar">
          <ArrowCircleLeftOutlinedIcon className="btn-back" />
        </Button>
        <p>Calendar</p>
      </div>

      <div className="content">
        <div className="date-section">
          <CalendarMonthIcon className="calendar-icon" />
          <Typography variant="h4" className="date-text">
            <p className="date-number">
              {day}
              <sup>{getDaySuffix(day)}</sup>
            </p>
            <p className="date-month">
              {months[month - 1]}, {year}
            </p>
          </Typography>
        </div>

        <div className="description-section">
          <Typography variant="h5" className="description-header">
            Description
            <IconButton onClick={handleOpenEditDescription}>
              <EditIcon />
            </IconButton>
          </Typography>
          <Typography className="description-content">{description}</Typography>
        </div>

        <div className="events-section">
          <Typography variant="h5" className="events-header">
            Events
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            className="add-event-button"
            onClick={handleOpenAddEvent}
          >
            Add new events
          </Button>

          {events.length <= 0 && (
            <Typography>No events for this day.</Typography>
          )}

          {events.length > 0 && (
            <Box className="event-list">
              {events.map((event, i) => (
                <EventCard
                  key={i}
                  event={event}
                  onEdit={() => handleOpenEditEvent(event)}
                  onDelete={() => handleOpenDeleteEvent(event)}
                />
              ))}
            </Box>
          )}
        </div>
      </div>

      {/* Edit Date Description Dialog */}
      <EditDateDescriptionDialog
        open={isEditDescriptionOpen}
        onClose={handleCloseEditDescription}
        initialDescription={description}
        onSave={handleSaveDescription}
      />

      {/* Add Event Dialog */}
      <AddEventDialog
        open={isAddEventOpen}
        onClose={handleCloseAddEvent}
        onAdd={handleAddEvent}
      />

      {/* Edit Event Dialog */}
      {currentEvent && (
        <EditEventDialog
          open={isEditEventOpen}
          onClose={handleCloseEditEvent}
          initialEvent={currentEvent}
          onSave={handleEditEvent}
        />
      )}

      {/* Delete Event Dialog */}
      {currentEvent && (
        <DeleteEventDialog
          open={isDeleteEventOpen}
          onClose={handleCloseDeleteEvent}
          onDelete={handleDeleteEvent}
          eventTitle={currentEvent?.title}
        />
      )}
    </div>
  );
}
