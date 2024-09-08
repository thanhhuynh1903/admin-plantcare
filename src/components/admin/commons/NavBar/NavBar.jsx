import { Input, TextField } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./NavBar.scss";

export default function NavBar() {
  const tools = [
    {
      name: "Notifications",
      icon: <NotificationsNoneIcon />,
      color: "#2D9CDB",
      backgroundColor: "#D5E5F3",
      notify: 0,
    },
    {
      name: "Messages",
      icon: <ChatBubbleOutlineIcon />,
      color: "#2D9CDB",
      backgroundColor: "#D5E5F3",
      notify: 1,
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
    },
  ];

  return (
    <div className="common-navbar">
      <div className="navbar">
        <div className="prop-search">
          <div className="input-field-container">
            <input
              className="input-field"
              type="text"
              placeholder="Search here"
            />
            <div className="btn-search">
              <SearchOutlined />
            </div>
          </div>
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
            >
              {tool.icon}
              {tool.notify ? (
                <div className="prop-notify" style={{ backgroundColor: tool.color }}>{tool.notify}</div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="prop-user">
          <div className="user-avatar">
            <img className="avatar" src="/src/assets/avatar.jpg" alt="avatar" />
          </div>
          <div className="user-meta">
            <p className="user-name">thienbao860</p>
            <p className="user-role">Admin</p>
          </div>
          <div className="user-btn-settings">
            <div className="btn-settings">
              <ArrowDropDownIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
