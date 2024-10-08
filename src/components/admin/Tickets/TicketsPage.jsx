import React, { useState, useEffect } from "react";
import "./TicketsPage.scss";
import { setPageHeadTitle } from "../../utils/util_web";
import { Link } from "react-router-dom";
import {
  Button,
  Pagination,
  TextField,
} from "@mui/material";
import Tabs from "../commons/Tabs/Tabs";
import TicketItem from "./TicketItem";
import { ticketData, types } from "./TicketsPage.prop";
import SelectField from "../commons/SelectField/SelectField";

export default function TicketsPage() {
  const [selectedType, setSelectedType] = useState("all");
  const [tabIndex, setTabIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setPageHeadTitle("Tickets");
  }, []);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
    setCurrentPage(1); // Reset page when switching tabs
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setCurrentPage(1); // Reset page when type changes
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset page when rows per page changes
  };

  // Tab Filter Logic
  const filterByTab = (ticket) => {
    switch (tabIndex) {
      case 1: // New tickets
        return ticket.status === 1; // Unread
      case 2: // Progressing
        return ticket.status === 2; // Progress
      case 3: // Resolved
        return ticket.status === 3; // Resolved
      default:
        return true; // All tickets
    }
  };

  // Type Filter Logic
  const filterByType = (ticket) => {
    if (selectedType === "all") return true;
    return ticket.type === parseInt(selectedType);
  };

  // Combine filters
  const filteredTickets = ticketData
    .filter(filterByTab)
    .filter(filterByType);

  // Pagination logic
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedTickets = filteredTickets.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const totalPages = Math.ceil(filteredTickets.length / rowsPerPage);

  const tabItems = [
    { name: "All tickets" },
    { name: "New" },
    { name: "Progressing" },
    { name: "Resolved" },
  ];

  const typeItems = [{ prop: "all", value: "All" }, ...types.map(type => ({
    prop: type.id.toString(),
    value: type.name
  }))];

  return (
    <div className="page-tickets">
      <div className="main-label">
        <p>Tickets</p>
      </div>
      <div className="tool">
        <Button
          className="btn-manual-create"
          variant="contained"
          color="success"
          component={Link}
          to="/tickets/create"
        >
          + Add manual ticket
        </Button>
      </div>

      <div className="content">
        <div className="tabs-filter">
          <Tabs
            items={tabItems}
            index={tabIndex}
            handleChange={handleTabChange}
          />

          <SelectField
            prop={selectedType}
            items={typeItems}
            sx={{ width: "150px" }}
            onChange={handleTypeChange}
          />
        </div>

        {paginatedTickets.length > 0 ? (
          paginatedTickets.map((ticket) => (
            <TicketItem key={ticket.id} ticket={ticket} />
          ))
        ) : (
          <p>No tickets available</p>
        )}

        <div className="pagination-container">
          <div className="pagination-info">
            <span>
              Showing {startIndex + 1}-
              {Math.min(startIndex + rowsPerPage, filteredTickets.length)} of{" "}
              {filteredTickets.length}
            </span>
          </div>
          <div className="pagination-controls">
            <TextField
              label="Rows per page"
              type="number"
              size="small"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              inputProps={{ min: 1, max: 100 }}
            />

            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
