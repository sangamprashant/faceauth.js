import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { Clipboard, Eye, EyeSlash } from "react-bootstrap-icons";
import { SERVER } from "../../../config";
import CheckAuth from "../CheckAuth";
import { useAuth } from "../CheckAuth/AuthContext";
import { Table } from "antd";
import LoadingComponent from "../../Reuse/Loading";

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

interface UserType {
  id: string;
  registration_timestamp: string;
}

interface ProjectType {
  _id: string;
  project_name: string;
  project_description: string;
  project_active: boolean;
  project_image: number;
  project_id: string;
  users: UserType[];
}

const ProjectOpen: React.FC = () => {
  const { token, handleNotification } = useAuth();
  const key_id = window.location.search;
  const id = key_id.replace("?search=", "");
  const [projectData, setProjectData] = useState<ProjectType | null>(null);
  const [showProjectId, setShowProjectId] = useState<boolean>(false);

  useEffect(() => {
    if (id) functionGetProject();
  }, [id]);

  const copyProjectId = () => {
    if (projectData?.project_id) {
      navigator.clipboard.writeText(projectData.project_id);
      handleNotification("Copied", "Project ID has been copied to clipboard.");
    }
  };

  async function functionGetProject() {
    try {
      const response = await axios.get(`${SERVER}/project/get/${id}`, {
        headers: {
          Authorization: "Bearer " + token.authToken,
        },
      });
      setProjectData(response.data);
    } catch (error) {
      console.log({ error });
    }
  }

  const tableColumns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Registered At",
      dataIndex: "registration_timestamp",
      key: "registration_timestamp",
      render: (text: string) => formatTimestamp(text),
    },
  ];

  return (
    <CheckAuth>
      <Container className="mt-5">
        <Card>
          {projectData ? (
            <React.Fragment>
              <Card.Header as="h5">Project Information</Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Col>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <img
                          src={`./assets/images/icons/${projectData.project_image}.png`}
                          alt=""
                          height={50}
                        />
                        <h3 className="ms-3">{projectData.project_name}</h3>
                      </div>
                      <Badge className="p-3" pill={true}>
                        {projectData.project_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="mt-3">{projectData.project_description}</p>
                  </Col>
                </Row>
                <hr />
                <Row className="mb-3 align-items-center">
                  <Col xs={12} md={6} className="mb-2 mb-md-0">
                    <input
                      type={showProjectId ? "text" : "password"}
                      value={projectData.project_id}
                      className="form-control"
                      readOnly
                    />
                  </Col>
                  <Col xs={12} md={6} className="d-flex gap-2">
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowProjectId(!showProjectId)}
                      className="mb-2 w-100"
                    >
                      {showProjectId ? <EyeSlash /> : <Eye />}{" "}
                      {showProjectId ? "Hide Project ID" : "Show Project ID"}
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className="mb-2 w-100"
                      onClick={copyProjectId}
                    >
                      <Clipboard /> Copy Project ID
                    </Button>
                  </Col>
                </Row>

                <h3 className="mt-4">Registered Users</h3>
                <hr />
                <Table
                  dataSource={projectData.users}
                  columns={tableColumns}
                ></Table>
              </Card.Body>
            </React.Fragment>
          ) : (
            <LoadingComponent />
          )}
        </Card>
      </Container>
    </CheckAuth>
  );
};

export default ProjectOpen;
