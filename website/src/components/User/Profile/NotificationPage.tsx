import Notification from "./Reuse/Notification";

const NotificationsPage = () => {
  const handleMarkAsSeen = () => {
    // Handle marking notification as seen
    console.log("Notification marked as seen");
  };

  // Define an array of notification objects
  const notifications = [
    { text: "New notification 1", seen: false, onMarkAsSeen: handleMarkAsSeen },
    { text: "New notification 1", seen: false, onMarkAsSeen: handleMarkAsSeen },
    { text: "Seen notification", seen: true, onMarkAsSeen: handleMarkAsSeen },
    { text: "New notification 1", seen: false, onMarkAsSeen: handleMarkAsSeen },
    { text: "Seen notification", seen: true, onMarkAsSeen: handleMarkAsSeen },
    { text: "New notification 1", seen: false, onMarkAsSeen: handleMarkAsSeen },
    { text: "Seen notification", seen: true, onMarkAsSeen: handleMarkAsSeen },
    { text: "Seen notification", seen: true, onMarkAsSeen: handleMarkAsSeen },
    { text: "New notification 1", seen: false, onMarkAsSeen: handleMarkAsSeen },
    { text: "New notification 1", seen: false, onMarkAsSeen: handleMarkAsSeen },
    { text: "Seen notification", seen: true, onMarkAsSeen: handleMarkAsSeen },
    { text: "New notification 1", seen: false, onMarkAsSeen: handleMarkAsSeen },
    { text: "New notification 1", seen: false, onMarkAsSeen: handleMarkAsSeen },
    { text: "New notification 1", seen: false, onMarkAsSeen: handleMarkAsSeen },
    { text: "Seen notification", seen: true, onMarkAsSeen: handleMarkAsSeen },
    { text: "Seen notification", seen: true, onMarkAsSeen: handleMarkAsSeen },
    // Add more notification objects as needed
  ];

  return (
    <div className="mt-2">
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {notifications.map((notification, index) => (
          <Notification
            key={index}
            text={notification.text}
            seen={notification.seen}
            onMarkAsSeen={notification.onMarkAsSeen}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
