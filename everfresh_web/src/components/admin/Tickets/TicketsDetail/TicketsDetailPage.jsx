import React, { useState, useEffect } from "react";
import { Avatar, Button, Divider } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import FlagIcon from "@mui/icons-material/Flag";
import TextFieldBasic from "../../commons/TextFieldBasic/TextFieldBasic";
import SelectField from "../../commons/SelectField/SelectField";
import TextEditor from "../../commons/TextEditor/TextEditor";
import { Link, useParams } from "react-router-dom";
import { types, status } from "../TicketsPage.prop";
import { obtainTicketDetailAPI } from "./TicketsDetailPage.prop";

import "./TicketsDetailPage.scss";

export default function TicketsDetailPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    setTicket(obtainTicketDetailAPI(id));
  }, [id]);

  const handleReplySubmit = () => {
    console.log("Reply message:", replyMessage);
    console.log("Ticket type:", ticketType);
    console.log("Status:", selectedStatus);
  };

  const ticketTypeOptions = types.map((t) => ({
    prop: t.name,
    value: t.name,
  }));

  const statusOptions = status.map((s) => ({
    prop: s.id,
    value: (
      <div className="status-item-container">
        <div
          className="status-item-circle"
          style={{ backgroundColor: s.backgroundColor }}
        ></div>
        <p>{s.label}</p>
      </div>
    ),
  }));

  return (
    <div className="tickets-detail-page">
      <div className="main-label">
        <Button component={Link} to="/tickets">
          <ArrowCircleLeftOutlinedIcon className="btn-back" />
        </Button>
        {ticket && <p>Tickets - #{ticket.id}</p>}
      </div>

      <div className="content">
        {ticket && (
          <>
            <div className="title">
              <div className="title-detail">
                <div
                  className="circle-icon"
                  style={{
                    backgroundColor: status.find((s) => s.id === ticket.status)
                      .backgroundColor,
                  }}
                ></div>
                <div className="label">#{ticket.id}</div>
                <div className="submitted-at">
                  Posted at {ticket.submittedAt}
                </div>
                <div>
                  {ticket.flagged ? (
                    <FlagIcon sx={{ color: "red" }} />
                  ) : (
                    <OutlinedFlagIcon />
                  )}
                </div>
              </div>
              <div className="title-author">
                <Avatar className="title-author-avatar" />
                <p className="title-author-username">
                  {ticket.author.username}
                </p>
              </div>
            </div>
            <div className="ticket-content">
              <div className="content-title">
                <p>{ticket.title}</p>
              </div>
              <div className="content-description">{ticket.description}</div>
            </div>
            <div className="ticket-replies">
              <Divider sx={{ margin: "30px 18px" }} />
              <p className="title">Replies ({ticket.replies.length})</p>
              {ticket.replies.map((reply) => (
                <div className="reply-node">
                  <div className="reply-author">
                    <Avatar className="reply-author-avatar" />
                    <p className="reply-author-username">
                      {reply.author.username}
                    </p>
                    <p className="reply-author-submitted-at">
                      {reply.submittedAt}
                    </p>
                  </div>
                  <div className="reply-content">
                    <p>{reply.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="ticket-reply-section">
              <p className="title"> Reply to ticket</p>

              <div className="ticket-reply-form">
                <TextFieldBasic
                  placeholder="Email user"
                  value={ticket.author.email}
                  disabled
                  className="ticket-reply-form-email"
                  sx={{ marginBottom: "16px" }}
                />

                <SelectField
                  defaultLabel="Ticket Type"
                  prop={ticketType}
                  onChange={(e) => setTicketType(e.target.value)}
                  items={ticketTypeOptions}
                  sx={{ marginBottom: "16px" }}
                />

                <SelectField
                  className="ticket-reply-form-status"
                  menuItemClassName="ticket-reply-form-status-item"
                  defaultLabel="Select status"
                  prop={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  items={statusOptions}
                  sx={{ marginBottom: "16px" }}
                />
              </div>

              <div className="ticket-reply-form-ticket-body">
                <div className="input-label-container">
                  <div className="input-label">Ticket Body</div>
                  <Button className="btn-template">Use template</Button>
                </div>
              </div>
              <TextEditor
                label="Message"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                sx={{ marginBottom: "16px" }}
              />

              <div className="btn-container">
                <Button
                  className="btn-submit"
                  endIcon={<SendIcon />}
                  onClick={handleReplySubmit}
                >
                  Reply to ticket
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
