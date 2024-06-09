import axios from "axios";
import React from "react";
import { ListGroup } from "react-bootstrap";
import { SERVER } from "../../../config";
import { useAuth } from "../CheckAuth/AuthContext";
import { Error } from "../../Result/Tag";
import LoadingComponent from "../../Reuse/Loading";

type HistoryItem = {
  action: string;
  timestamp: Date;
};

type HistoryProps = HistoryItem[];

const History = () => {
  const { token, model } = useAuth();
  const [history, setHistory] = React.useState<HistoryProps>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useLayoutEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div>
      <ListGroup className="mt-2">
        {loading ? (
          <LoadingComponent />
        ) : (
          <React.Fragment>
            {history?.map((item) => (
              <ListGroup.Item
                key={item.timestamp.toString()}
                className="history-item"
              >
                <strong>Action:</strong> {item.action} <br />
                <strong>Timestamp:</strong>{" "}
                {new Date(item.timestamp).toLocaleString()}
              </ListGroup.Item>
            ))}
          </React.Fragment>
        )}
      </ListGroup>
    </div>
  );

  async function fetchHistory() {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }
};

export default History;
