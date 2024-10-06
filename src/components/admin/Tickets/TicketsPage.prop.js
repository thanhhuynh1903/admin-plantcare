export let types = [
  {
    id: 1,
    name: "Bug",
    backgroundColor: "#f44336",
  },
  {
    id: 2,
    name: "Feature",
    backgroundColor: "#4caf50",
  },
  {
    id: 3,
    name: "Service",
    backgroundColor: "#2196f3",
  },
  {
    id: 4,
    name: "Account",
    backgroundColor: "#ffeb3b",
  },
  {
    id: 5,
    name: "Payment",
    backgroundColor: "#9c27b0",
  },
];

export let status = [
  {
    id: 1,
    label: "Unread",
    backgroundColor: "gray",
  },
  {
    id: 2,
    label: "Progress",
    backgroundColor: "#ffeb3b",
  },
  {
    id: 3,
    label: "Resolved",
    backgroundColor: "#4caf50",
  },
  {
    id: 4,
    label: "Not Resolved",
    backgroundColor: "#f44336",
  },
];

export let ticketData = [
  {
    id: 1050,
    title: "How to deposit money to my portal?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    type: 1,
    priority: 0,
    priorityLabel: "Not Resolved",
    flagged: false,
    status: 1,
    submittedAt: "12:45 AM",
    assignee: "John Snow",
  },
  {
    id: 1051,
    title: "How to deposit money to my portal?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    type: 2,
    priority: 2,
    priorityLabel: "On-Going",
    status: 2,
    submittedAt: "12:45 AM",
    assignee: "John Snow",
    flagged: true,
  },
  {
    id: 1052,
    title: "How to deposit money to my portal?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    type: 3,
    priority: 3,
    priorityLabel: "Resolved",
    status: 3,
    submittedAt: "12:45 AM",
    assignee: "John Snow",
    flagged: false
  },
];

export function getTicketDataFromID(id) {
  return ticketData.find((ticket) => ticket.id === id);
}

export function getStatusFromID(id) {
  return status.find((status) => status.id === id);
}

export function getTypeFromID(id) {
  return types.find((type) => type.id === id);
}
