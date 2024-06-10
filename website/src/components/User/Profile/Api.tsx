import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { Clipboard } from "react-bootstrap-icons";
import axios from "axios";
import { useAuth } from "../CheckAuth/AuthContext";

type Props = {
  apiKey: string;
  onApiKeyChange?: (newApiKey: string) => void; // Callback to notify parent component about the API key change
};

const Api: React.FC<Props> = ({ apiKey, onApiKeyChange }) => {
  const { handleNotification } = useAuth();
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiMessage, setApiMessage] = useState<string>("");

  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey);
  };

  const copyToClipboard = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      handleNotification("Copied", "API key copied to clipboard!");
    }
  };

  const createApiKey = async () => {
    try {
      const response = await axios.post("/api/create-key");
      //   onApiKeyChange(response.data.newApiKey);
      setApiMessage("New API key created successfully.");
      setTimeout(() => setApiMessage(""), 3000);
    } catch (error) {
      setApiMessage("Failed to create a new API key.");
      setTimeout(() => setApiMessage(""), 3000);
    }
  };

  const deleteApiKey = async () => {
    try {
      await axios.delete("/api/delete-key");
      //   onApiKeyChange('');
      setApiMessage("API key deleted successfully.");
      setTimeout(() => setApiMessage(""), 3000);
    } catch (error) {
      setApiMessage("Failed to delete the API key.");
      setTimeout(() => setApiMessage(""), 3000);
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header as="h5">API Information</Card.Header>
        <Card.Body>
          {apiMessage && (
            <Alert variant="success" className="mt-2">
              {apiMessage}
            </Alert>
          )}
          <Row className="mb-3">
            <Col>
              <h6>API Key:</h6>
              <InputGroup>
                <FormControl
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  readOnly
                />
                <Button
                  variant="outline-secondary"
                  onClick={toggleApiKeyVisibility}
                >
                  {showApiKey ? "Hide" : "Show"}
                </Button>
                <Button variant="outline-secondary" onClick={copyToClipboard}>
                  <Clipboard /> Copy
                </Button>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>API Usage:</h6>
              <p>
                Use this API key to authenticate your requests. Make sure to
                keep it secure and do not share it with unauthorized
                individuals.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h6>Documentation:</h6>
              <p>
                Refer to the{" "}
                <a href="/api/docs" target="_blank" rel="noopener noreferrer">
                  API Documentation
                </a>{" "}
                for detailed information on how to use the API.
              </p>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Button variant="primary" onClick={createApiKey} className="me-2">
                Create New API Key
              </Button>
              <Button variant="danger" onClick={deleteApiKey}>
                Delete API Key
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Api;
