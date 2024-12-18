import React, { useEffect, useState } from "react";
import { Button, Menu, MenuItem, Popover } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import "./NavBar.scss";
import NotificationMenu from "./NotificationMenu";
import { getMessageListAPI, getNotificationListAPI } from "./NavBar.prop";
import MessageMenu from "./MessageMenu";
import avatar from "@assets/avatar.jpg";
import { deleteCookie } from "@utils/util_cookie";
import { useNavigate } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import NavBarSearch from "./NavBarSearch";

export default function NavBar() {
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [anchorElMessages, setAnchorElMessages] = useState(null);
  const [anchorElUserMenu, setAnchorElUserMenu] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setNotifications(getNotificationListAPI().items);
    setMessages(getMessageListAPI().items);
  }, []);

  const handleClick = (event, toolName) => {
    if (toolName === "Notifications") {
      setAnchorElNotifications(event.currentTarget);
    } else if (toolName === "Messages") {
      setAnchorElMessages(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorElNotifications(null);
    setAnchorElMessages(null);
  };

  const handleUserMenuClick = (event) => {
    setAnchorElUserMenu(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorElUserMenu(null);
  };

  const logout = () => {
    deleteCookie("e_token");
    window.location.reload();
  };

  const tools = [
    {
      name: "Notifications",
      icon: <NotificationsNoneIcon />,
      color: "#2D9CDB",
      backgroundColor: "#D5E5F3",
      notify: notifications.length,
    },
    {
      name: "Messages",
      icon: <ChatBubbleOutlineIcon />,
      color: "#2D9CDB",
      backgroundColor: "#D5E5F3",
      notify: messages.length,
    },
    {
      name: "Gifts",
      icon: <CardGiftcardIcon />,
      color: "#5E6C93",
      backgroundColor: "#DDDEE8",
      notify: 0,
    },
    {
      name: "Settings",
      icon: <SettingsOutlinedIcon />,
      color: "#FF5B5B",
      backgroundColor: "#F5DBE0",
      notify: 0,
      redirect: "/settings",
    },
  ];

  return (
    <div className="common-navbar">
      <div className="navbar">
        <NavBarSearch />

        <div className="prop-tools">
          {tools.map((tool, i) => (
            <div
              key={i}
              className="btn-tool"
              style={{
                backgroundColor: tool.backgroundColor,
                color: tool.color,
              }}
              onClick={(e) => {
                handleClick(e, tool.name);
                if (tool.redirect) {
                  window.location.href = tool.redirect;
                }
              }}
            >
              {tool.icon}
              {tool.notify ? (
                <div
                  className="prop-notify"
                  style={{ backgroundColor: tool.color }}
                >
                  {tool.notify}
                </div>
              ) : null}
            </div>
          ))}
          <NotificationMenu
            notificationItems={notifications}
            anchorEl={anchorElNotifications}
            handleClose={handleClose}
          />
          <MessageMenu
            messageItems={messages}
            anchorEl={anchorElMessages}
            handleClose={handleClose}
          />
        </div>

        <div className="prop-user">
          <div className="user-avatar">
            <img className="avatar" src={avatar} alt="avatar" />
          </div>
          <div className="user-meta">
            <p className="user-name">thienbao860</p>
            <p className="user-role">Admin</p>
          </div>
          <div className="user-btn-settings">
            <div className="btn-settings" onClick={handleUserMenuClick}>
              <ArrowDropDownIcon />
            </div>
          </div>
        </div>

        <Menu
          anchorEl={anchorElUserMenu}
          open={Boolean(anchorElUserMenu)}
          onClose={handleUserMenuClose}
        >
          <MenuItem onClick={handleUserMenuClose}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
