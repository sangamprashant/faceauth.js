// Notification.tsx
import React from "react";
import { Badge, Button } from "react-bootstrap";

type NotificationProps = {
  text: string;
  seen: boolean;
  onMarkAsSeen?: () => void; // Change _id to id
};

const Notification: React.FC<NotificationProps> = ({
  text,
  seen,
  onMarkAsSeen,
}) => {
  return (
    <div
      className="d-flex justify-content-between"
      style={{
        backgroundColor: seen ? "#f8f9fa" : "#e2f3ff",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <div>
        <Badge pill={true}>{seen ? "Seen" : "New"}</Badge>
        <span style={{ marginLeft: "10px" }}>{text}</span>
      </div>
      {!seen && (
        <Button variant="success" size="sm" onClick={() => onMarkAsSeen?.()}>
          Mark as Seen
        </Button>
      )}
    </div>
  );
};

export default Notification;