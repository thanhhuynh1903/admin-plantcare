import React from "react";
import { Button } from "@mui/material";
import "./TicketActions.scss";

const UnreadActions = () => (
  <>
    <Button variant="outlined" className="btn-toolset btn-unread">
      Unread
    </Button>
    <Button variant="contained" className="btn-toolset btn-close">
      Close
    </Button>
    <Button variant="outlined" className="btn-toolset btn-reply">
      Reply
    </Button>
  </>
);

const ProgressingActions = () => (
  <>
    <Button variant="contained" className="btn-toolset btn-close">
      Close
    </Button>
    <Button variant="outlined" className="btn-toolset btn-reply">
      Reply
    </Button>
  </>
);

const ResolvedActions = () => (
  <Button variant="contained" className="btn-toolset btn-reopen">
    Reopen
  </Button>
);

export default function TicketActions({ status }) {
  if (status === 1) {
    return <UnreadActions />;
  } else if (status === 2) {
    return <ProgressingActions />;
  } else if (status === 3 || status === 4) {
    return <ResolvedActions />;
  } else {
    return null;
  }
}
