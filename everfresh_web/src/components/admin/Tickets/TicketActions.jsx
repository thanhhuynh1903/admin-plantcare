import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./TicketActions.scss";

const UnreadActions = ({ ticket }) => (
  <>
    <Button variant="outlined" className="btn-toolset btn-unread">
      Unread
    </Button>
    <Button variant="contained" className="btn-toolset btn-close">
      Close
    </Button>
    <Button
      className="btn-toolset btn-reply"
      component={Link}
      to={`/tickets/t/${ticket.id}`}
    >
      Reply
    </Button>
  </>
);

const ProgressingActions = ({ ticket }) => (
  <>
    <Button variant="contained" className="btn-toolset btn-close">
      Close
    </Button>
    <Button
      className="btn-toolset btn-reply"
      component={Link}
      to={`/tickets/t/${ticket.id}`}
    >
      Reply
    </Button>
  </>
);

const ResolvedActions = ({ ticket }) => (
  <Button className="btn-toolset btn-reopen">Reopen</Button>
);

export default function TicketActions({ ticket }) {
  if (ticket.status === 1) {
    return (
      <div className="ticket-actions">
        <UnreadActions ticket={ticket} />
      </div>
    );
  } else if (ticket.status === 2) {
    return (
      <div className="ticket-actions">
        <ProgressingActions ticket={ticket} />
      </div>
    );
  } else if (ticket.status === 3 || ticket.status === 4) {
    return (
      <div className="ticket-actions">
        <ResolvedActions ticket={ticket} />
      </div>
    );
  } else {
    return null;
  }
}
