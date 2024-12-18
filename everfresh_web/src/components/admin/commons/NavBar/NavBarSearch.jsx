import "./NavBarSearch.scss";
import React, { useRef, useState } from "react";
import { Button, Popover } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function NavBarSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorElSearch, setAnchorElSearch] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value) {
      setAnchorElSearch(event.currentTarget);
    } else {
      setAnchorElSearch(null);
    }
  };

  const handleSearchSelect = (searchType) => {
    if (searchType === "Plants") {
      navigate(`/searches/plants/${searchQuery}`);
    } else if (searchType === "Planters") {
      navigate(`/searches/planters/${searchQuery}`);
    } else if (searchType === "Seeds") {
      navigate(`/searches/seeds/${searchQuery}`);
    }
    setAnchorElSearch(null);
  };

  const handleSearchMenuClose = () => {
    setAnchorElSearch(null);
  };

  return (
    <div className="navbar-search">
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
      <Popover
        className="navbar-search-menu-popover"
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
            width: inputRef.current ? inputRef.current.offsetWidth : "auto",
          },
        }}
        disableAutoFocus
        disableEnforceFocus
        keepMounted
      >
        <Button
          className="btn-search-menu"
          onClick={() => handleSearchSelect("Plants")}
        >
          Search "{searchQuery}" in Plants
        </Button>
        <Button
          className="btn-search-menu"
          onClick={() => handleSearchSelect("Planters")}
        >
          Search "{searchQuery}" in Planters
        </Button>
        <Button
          className="btn-search-menu"
          onClick={() => handleSearchSelect("Seeds")}
        >
          Search "{searchQuery}" in Seeds
        </Button>
      </Popover>
    </div>
  );
}
