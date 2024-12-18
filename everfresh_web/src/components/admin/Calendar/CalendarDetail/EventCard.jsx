import { Card, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./EventCard.scss";
import { DATE_TYPE } from "../CalendarViewDay.prop";

export default function EventCard({ event, onEdit, onDelete }) {
  const eventStyle = DATE_TYPE[event.type] || {};

  return (
    <Card
      className="calendar-event-card"
      style={{
        backgroundColor: eventStyle.backgroundColor,
        borderColor: eventStyle.borderColor,
      }}
    >
      <div className="event-details">
        <p className="event-name">{event.name}</p>
        <p>Time: {event.startTime || "To Be Decided"} - {event.endTime || "To Be Decided"}</p>
        <p>Location: {event.location || "To Be Decided"}</p>
      </div>
      <div className="event-actions">
        <IconButton className="edit-button" onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton className="delete-button" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    </Card>
  );
}
