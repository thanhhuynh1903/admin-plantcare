import { useEffect } from "react";
import "./NotificationMenu.scss";
import { Menu, MenuItem } from "@mui/material";
import { sendNotificationReadAll } from "./NavBar.prop";
import moment from "moment";
import { Link } from "react-router-dom";
import MarkunreadIcon from "@mui/icons-material/Markunread";

export default function NotificationMenu({
  notificationItems = [],
  anchorEl,
  handleClose = () => {},
}) {
  return (
    <div>
      <Menu
        className="navbar-notification-menu"
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
          <p>Notifications ({notificationItems.length})</p>
        </div>
        <div className="content">
          {(() => {
            if (notificationItems.length === 0) {
              return <p className="no-notification">No notification</p>;
            }

            return notificationItems.sort((a, b) => b.createdAt - a.createdAt).map((noti, index) => (
              <div
                className={`notification-item ${
                  noti.unread ? "notification-item-unread" : ""
                }`}
                key={index}
              >
                <div>
                  <img
                    className="avatar"
                    src={noti.user.avatar}
                    alt="notification"
                  />
                </div>
                <div>
                  <div className="title">
                    {noti.unread && <MarkunreadIcon className="icon" />}
                    <p>{noti.title}</p>
                  </div>
                  <div className="meta">
                    <p className="meta-username">
                      By: <span className="username">{noti.user.username}</span>
                      ,
                    </p>
                    <p>{moment(noti.createdAt).fromNow()}</p>
                  </div>
                </div>
              </div>
            ));
          })()}
        </div>
        <div className="footer">
          <Link
            to={"/notifications"}
            className="btn-tool"
            onClick={handleClose}
          >
            View all
          </Link>
          <div
            className="btn-tool"
            onClick={() => {
              sendNotificationReadAll();
            }}
          >
            Mark all as read
          </div>
        </div>
      </Menu>
    </div>
  );
}
