import React, { useState } from "react";
import {
  Badge,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import "./SideBar.scss";
import MenuIcon from "@mui/icons-material/Menu";
import {
  HomeOutlined as DashboardIcon,
  PeopleOutlined as PeopleIcon,
  PersonOutlined as PersonIcon,
  ShoppingCartOutlined as ShoppingCartIcon,
  StorefrontOutlined as StorefrontIcon,
  RateReviewOutlined as RateReviewIcon,
  ArticleOutlined as ArticleIcon,
  EmailOutlined as EmailIcon,
  CalendarTodayOutlined as CalendarTodayIcon,
  SettingsOutlined as SettingsIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

export default function SideBar() {
  const location = useLocation(); // Hook to get the current location
  const [isCollapsed, setIsCollapsed] = useState(false); // State to control sidebar collapse

  const menuItems = [
    {
      icon: <DashboardIcon />,
      label: "Dashboard",
      link: "/dashboard",
      notify: 0,
    },
    { icon: <PeopleIcon />, label: "Employees", link: "/employees", notify: 0 },
    { icon: <PersonIcon />, label: "Customers", link: "/customers", notify: 0 },
    { icon: <ShoppingCartIcon />, label: "Orders", link: "/orders", notify: 0 },
    {
      icon: <StorefrontIcon />,
      label: "Products",
      link: "/products",
      notify: 0,
    },
    { icon: <RateReviewIcon />, label: "Reviews", link: "/reviews", notify: 0 },
    {
      icon: <ArticleIcon />,
      label: "News / Articles",
      link: "/news",
      notify: 0,
    },
    { icon: <EmailIcon />, label: "Emails", link: "/emails", notify: 1 },
    {
      icon: <CalendarTodayIcon />,
      label: "Calendar",
      link: "/calendar",
      notify: 0,
    },
    {
      icon: <SettingsIcon />,
      label: "System config",
      link: "/settings",
      notify: 0,
    },
  ];

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className="common-side-bar"
      style={{ flexBasis: isCollapsed ? "70px" : "250px" }}
    >
      <div className="side-bar">
        <div className={`btn-menu ${isCollapsed ? "btn-menu-shrink" : ""}`}  onClick={handleToggleSidebar}>
          <MenuIcon />
        </div>
        <div className="logo-container">
          <img
            className={`logo ${isCollapsed ? "logo-collapsed" : ""}`}
            src="/src/assets/logo.png"
            alt="everfresh logo"
          />
          {!isCollapsed && <p>Admin Dashboard</p>}
        </div>
        <List className="list-container">
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              className={`list-item ${
                location.pathname.startsWith(item.link)
                  ? "list-item-active"
                  : ""
              }`}
              component={Link}
              to={item.link}
            >
              <ListItemIcon className="list-item-icon">
                {item.icon}
                {
                  isCollapsed && item.notify > 0 &&<p className="list-item-badge">{item.notify}</p>
                }
              </ListItemIcon>

              {!isCollapsed && <p className="list-item-text">{item.label}</p>}
              {!isCollapsed && item.notify > 0 && (
                <p className="list-item-notify">{item.notify}</p>
              )}
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
