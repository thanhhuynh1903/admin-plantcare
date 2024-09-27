export function getNotificationListAPI() {
  //TODO: Add API later.
  return {
    items: [
      {
        user: {
          id: 1,
          username: "john doe",
          avatar: "https://i.pravatar.cc/300?u=a042581f4e29026704d",
        },
        title: "Your order has been placed",
        createdAt: new Date("2024-09-17T03:24:00"),
        unread: true,
      },
      {
        user: {
          id: 2,
          username: "amy smith",
          avatar: "https://i.pravatar.cc/300?u=a042581f4e29026704d",
        },
        title: "You have a missed call",
        createdAt: new Date("2024-09-17T03:24:00"),
        unread: true,
      },
    ],
  };
}

export function getMessageListAPI() {
  //TODO: Add API later.
  return {
    items: [
      {
        user: {
          id: 1,
          username: "john_doe",
          avatar: "https://i.pravatar.cc/300?u=a042581f4e29026704d",
        },
        title: "Hello!",
        createdAt: new Date("2024-09-17T03:24:00"),
        unread: true,
      },
      {
        user: {
          id: 2,
          username: "abc1234",
          avatar: "https://i.pravatar.cc/300?u=a042581f4e29026704d",
        },
        title: "Hello again!",
        createdAt: new Date("2024-09-17T03:24:00"),
        unread: true,
      },
      {
        user: {
          id: 2,
          username: "abc1234",
          avatar: "https://i.pravatar.cc/300?u=a042581f4e29026704d",
        },
        title: "Emergency!",
        createdAt: new Date(),
        unread: true,
      },
    ],
  };
}

export function sendNotificationReadAll() {
  //TODO: Add API later.
}

export function sendMessageReadAll() {
  //TODO: Add API later.
}
