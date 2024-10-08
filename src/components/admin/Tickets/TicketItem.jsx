import React from "react";
import "./TicketItem.scss";
import { Button, Divider } from "@mui/material";
import { getStatusFromID, getTypeFromID } from "./TicketsPage.prop";
import TicketActions from "./TicketActions";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import FlagIcon from "@mui/icons-material/Flag";

export default function TicketItem({ ticket }) {
  const ticketStatus = getStatusFromID(ticket.status);
  const ticketType = getTypeFromID(ticket.type);
  const isFlagged = ticket.flagged;

  return (
    <div
      className="ticket-item"
      style={{
        borderLeft: `10px solid ${
          ticketStatus ? ticketStatus.backgroundColor : "transparent"
        }`,
      }}
    >
      <div className="ticket-header">
        <div className="ticket-info">
          <div className="ticket-circle" style={{ backgroundColor: ticketStatus.backgroundColor }}></div>
          <span className="ticket-id">#{ticket.id}</span>
          <span
            className="ticket-type"
            style={{ backgroundColor: ticketType.backgroundColor }}
          >
            {getTypeFromID(ticket.type).name}
          </span>
          {isFlagged ? (
            <FlagIcon sx={{ color: "red" }} />
          ) : (
            <OutlinedFlagIcon />
          )}
        </div>
      </div>
      <div className="ticket-body">
        <p className="ticket-title">{ticket.title}</p>
        <p className="ticket-description">{ticket.description}</p>
      </div>
      <Divider sx={{ marginTop: "10px" }} />
      <div className="ticket-footer">
        <span className="ticket-submitted-at">
          Submitted at {ticket.submittedAt}
        </span>
        <div className="ticket-actions">
          <TicketActions ticket={ticket} />
        </div>
      </div>
    </div>
  );
}
