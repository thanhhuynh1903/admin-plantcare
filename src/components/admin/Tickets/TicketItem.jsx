import React from "react";
import "./TicketItem.scss";
import { Button, Divider } from "@mui/material";
import { getStatusFromID, getTypeFromID } from "./TicketsPage.prop";
import TicketActions from "./TicketActions";

export default function TicketItem({ ticket }) {
  const ticketStatus = getStatusFromID(ticket.status);
  const ticketType = getTypeFromID(ticket.type);

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
          <span className="ticket-id">#{ticket.id}</span>
          <span
            className="ticket-type"
            style={{ backgroundColor: ticketType.backgroundColor }}
          >
            {getTypeFromID(ticket.type).name}
          </span>
        </div>
      </div>
      <div className="ticket-body">
        <p className="ticket-title">{ticket.title}</p>
        <p className="ticket-description">{ticket.description}</p>
      </div>
      <Divider sx={{ marginTop: "10px" }} />
      <div className="ticket-footer">
        <span className="ticket-submitted-at">Submitted at {ticket.submittedAt}</span>
        <div className="ticket-actions">
          <TicketActions status={ticket.status} />
        </div>
      </div>
    </div>
  );
}
