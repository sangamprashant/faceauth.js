// NotificationsPage.tsx
import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER } from "../../../config";
import { Error } from "../../Result/Tag";
import LoadingComponent from "../../Reuse/Loading";
import { useAuth } from "../CheckAuth/AuthContext";
import Notification from "./Reuse/Notification";

interface NotificationObject {
  _id: string;
  action: string;
  seen: boolean;
}

const NotificationsPage = () => {
  const { token, model } = useAuth();
  const [notifications, setNotifications] = useState<NotificationObject[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotification();
  }, []);

  async function fetchNotification() {
    setLoading(true);
    try {
      const response = await axios.get(`${SERVER}/notification/retrieve`, {
        headers: {
          Authorization: "Bearer " + token.authToken,
        },
      });

      if (response.status === 200) {
        setNotifications(response.data.notifications.actions.reverse());
      } else {
        handleFetchError("Something went wrong, please try later");
      }
    } catch (error: any) {
      console.error("Error fetching notifications:", error);
      handleFetchError(
        error?.response?.data?.msg ||
          error?.response?.data?.message ||
          "Something went wrong, please try later"
      );
    } finally {
      setLoading(false);
    }
  }

  async function markNotificationAsSeen(notificationId: string) {
    try {
      await axios.post(
        `${SERVER}/notification/mark_as_seen`,
        { notification_id: notificationId },
        {
          headers: {
            Authorization: "Bearer " + token.authToken,
          },
        }
      );
      // Update the state to mark the notification as seen
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, seen: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as seen:", error);
      model.setModelData(
        <Error text="Something went wrong, please try later" />
      );
      model.setModelState(true);
    }
  }

  function handleFetchError(errorMessage: string) {
    model.setModelData(<Error text={errorMessage} />);
    model.setModelState(true);
  }

  return (
    <div className="mt-2">
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {loading ? (
          <LoadingComponent />
        ) : (
          <>
            {notifications.map((notification) => (
              <Notification
                key={notification._id}
                text={notification.action}
                seen={notification.seen}
                onMarkAsSeen={() => markNotificationAsSeen(notification._id)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
