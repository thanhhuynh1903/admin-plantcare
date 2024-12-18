import "./MessageMenu.scss";
import { Menu, MenuItem } from "@mui/material";
import { sendMessageReadAll } from "./NavBar.prop";
import moment from "moment";
import { Link } from "react-router-dom";
import MarkunreadIcon from "@mui/icons-material/Markunread";

export default function MessageMenu({
  messageItems = [],
  anchorEl,
  handleClose = () => {},
}) {
  return (
    <Menu
      className="navbar-message-menu"
      anchorEl={anchorEl}
      open={anchorEl != null}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <div className="titlebar">
        <p>Messages ({messageItems.length})</p>
      </div>
      <div className="content">
        {(() => {
          if (messageItems.length === 0) {
            return <p className="no-messages">No messages</p>;
          }

          return messageItems.sort((a, b) => b.createdAt - a.createdAt).map((msg, index) => (
            <div
              className={`message-item ${
                msg.unread ? "message-item-unread" : ""
              }`}
              key={index}
            >
              <div>
                <img className="avatar" src={msg.user.avatar} alt="avatar" />
              </div>
              <div>
                <div className="title">
                  {msg.unread && <MarkunreadIcon className="icon" />}
                  <p>{msg.title}</p>
                </div>
                <div className="meta">
                  <p className="meta-username">
                    By: <span className="username">{msg.user.username}</span>,
                  </p>
                  <p>{moment(msg.createdAt).fromNow()}</p>
                </div>
              </div>
            </div>
          ));
        })()}
      </div>
      <div className="footer">
        <Link to={"/messages"} className="btn-tool" onClick={handleClose}>
          View all
        </Link>
        <div
          className="btn-tool"
          onClick={() => {
            sendMessageReadAll();
          }}
        >
          Mark all as read
        </div>
      </div>
    </Menu>
  );
}
