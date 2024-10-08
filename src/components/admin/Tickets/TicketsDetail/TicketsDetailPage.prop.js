export let obtainTicketDetailAPI = (id) => {
  const randomDate = new Date(
    Date.now() - Math.floor(Math.random() * 10000000000)
  );

  return {
    id: 1050,
    title: "How to deposit money to my portal?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    type: 1,
    priority: 0,
    priorityLabel: "Not Resolved",
    flagged: false,
    status: 1,
    submittedAt: randomDate
      .toLocaleString("en-US", { hour12: false })
      .replace(/:\d{2} /, " "),
    author: {
      id: 1,
      username: "John Snow",
      email: "john.snow@example.com",
      avatar: "/avatar.jpg",
    },
    replies: [
      {
        id: 1,
        author: {
          id: 1,
          username: "John Snow",
          email: "john.snow@example.com",
          avatar: "/avatar.jpg",
        },
        submittedAt: new Date(Date.now() - 10000000000)
          .toLocaleString("en-US", { hour12: false })
          .replace(/:\d{2} /, " "),
        message:
          "I have not been able to deposit money to my portal. Can someone help me?",
      },
      {
        id: 2,
        author: {
          id: 2,
          username: "Jane Doe",
          email: "jane.doe@example.com",
          avatar: "/avatar.jpg",
        },
        submittedAt: new Date(Date.now() - 5000000000)
          .toLocaleString("en-US", { hour12: false })
          .replace(/:\d{2} /, " "),
        message: "I have tried to help you, but I don't know how. Sorry.",
      },
      {
        id: 3,
        author: {
          id: 1,
          username: "John Snow",
          email: "john.snow@example.com",
          avatar: "/avatar.jpg",
        },
        submittedAt: new Date(Date.now() - 100000000)
          .toLocaleString("en-US", { hour12: false })
          .replace(/:\d{2} /, " "),
        message: "I have figured it out. Thank you for your help.",
      },
    ],
  };
};

export let sendReplyToTicketAPI = (id) => {};

