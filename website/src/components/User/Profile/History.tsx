import axios from "axios";
import React from "react";
import { ListGroup } from "react-bootstrap";
import { SERVER } from "../../../config";
import { useAuth } from "../CheckAuth/AuthContext";
import { Error } from "../../Result/Tag";

type HistoryItem = {
  action: string;
  timestamp: Date;
};

type HistoryProps = HistoryItem[];

const History = () => {
  const { token, model } = useAuth();
  const [history, setHistory] = React.useState<HistoryProps>([]);

  React.useLayoutEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div>
      <ListGroup className="mt-2">
        {history?.map((item) => (
          <ListGroup.Item
            key={item.timestamp.toString()}
            className="history-item"
          >
            <strong>Action:</strong> {item.action} <br />
            <strong>Timestamp:</strong> {item.timestamp.toString()}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );

  async function fetchHistory() {
    try {
      const response = await axios.get(`${SERVER}/history/retrieve`, {
        headers: {
          Authorization: "Bearer " + token.authToken,
        },
      });
      setHistory(response.data.history.actions.reverse());
    } catch (error: any) {
      model.setModelState(true);
      model.setModelData(
        <Error
          text={
            error?.response?.data?.message ||
            error?.response?.data?.msg ||
            "Something went wrong"
          }
        />
      );
    }
  }
};

export default History;
