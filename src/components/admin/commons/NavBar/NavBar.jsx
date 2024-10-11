import React, { useEffect, useState, useRef } from "react";
import { Button, Menu, MenuItem, Popover } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
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
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import ListItemIcon from "@mui/material/ListItemIcon";

export default function NavBar() {
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [anchorElMessages, setAnchorElMessages] = useState(null);
  const [anchorElUserMenu, setAnchorElUserMenu] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // To store the search input
  const [anchorElSearch, setAnchorElSearch] = useState(null); // To control the search menu
  const inputRef = useRef(null);
  const navigate = useNavigate(); // React Router hook for navigation

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

  useEffect(() => {
    setNotifications(getNotificationListAPI().items);
    setMessages(getMessageListAPI().items);
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value) {
      setAnchorElSearch(event.currentTarget);
    } else {
      setAnchorElSearch(null);
    }
  };

  const handleSearchSelect = () => {
    navigate(`/searches/products/${searchQuery}`);
    setAnchorElSearch(null);
  };

  const handleSearchMenuClose = () => {
    setAnchorElSearch(null);
  };

  return (
    <div className="common-navbar">
      <div className="navbar">
        <div className="prop-search">
          <div className="input-field-container" ref={inputRef}>
            <input
              className="input-field"
              type="text"
              placeholder="Search here"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <div className="btn-search">
              <SearchOutlined />
            </div>
          </div>

          {/* Search Menu */}
          <Popover
            className="search-menu-popover"
            anchorEl={anchorElSearch}
            open={Boolean(anchorElSearch) && searchQuery.length > 0}
            onClose={handleSearchMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            PaperProps={{
              style: {
                width: inputRef.current ? inputRef.current.offsetWidth : "auto", // Set the menu width equal to the input field
              },
            }}
            disableAutoFocus // Prevents Menu from taking focus away from input
            disableEnforceFocus // Prevents Menu from forcing focus
            keepMounted // Keep the Menu mounted to allow seamless interaction
          >
            <Button className="btn-search-menu" onClick={handleSearchSelect}>
              Search "{searchQuery}" in Products
            </Button>
          </Popover>
        </div>

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
