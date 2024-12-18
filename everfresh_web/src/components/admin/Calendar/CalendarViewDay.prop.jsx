export const DATE_TYPE = {
    CUSTOM: {
      backgroundColor: "#4caf5079",
      borderColor: "#4CAF50",
    },
    IMPORTANT: {
      backgroundColor: "#ff5b5b79",
      borderColor: "#FF0000",
    },
    NEWS: {
      backgroundColor: "#2196f379",
      borderColor: "#2196F3",
    },
    OPTIONAL: {
      backgroundColor: "#ffeb3b79",
      borderColor: "#FFEB3B",
    },
    EVENT: {
      backgroundColor: "#9c27b079",
      borderColor: "#9C27B0",
    },
  };
  

export const getApiCalendarDay = () => {
  return [
    {
      id: 1,
      day: 1,
      month: 9,
      year: 2024,
      events: [
        {
          id: 1,
          name: "Event 1",
          type: "IMPORTANT",
        },
      ],
    },
    {
      id: 2,
      day: 15,
      month: 9,
      year: 2024,
      events: [
        {
          id: 1,
          name: "Event 5",
          type: "EVENT",
        },
        {
            id: 2,
            name: "Event 161",
            type: "IMPORTANT",
          },
      ],
    },
    {
      id: 3,
      day: 30,
      month: 9,
      year: 2024,
      events: [
        {
          id: 1,
          name: "Event 19",
          type: "IMPORTANT",
        },
        {
          id: 1,
          name: "More events coming up!",
          type: "EVENT",
        },
      ],
    },
  ];
};
