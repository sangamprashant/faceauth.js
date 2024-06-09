import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../CheckAuth/AuthContext";
import { Error, Warning } from "../../../Result/Tag";
import axios from "axios";
import { SERVER } from "../../../../config";

const ProjectAdd = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(1);
  const { handleNotification, model, token } = useAuth();
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="projectName" className="mt-2">
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            // required
          />
        </Form.Group>
        <Form.Group controlId="projectDescription" className="mt-2">
          <Form.Label>Project Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter project description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            // required
          />
        </Form.Group>
        <Form.Group controlId="isActive" className="mt-2">
          <Form.Check
            type="switch"
            label="Active"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </Form.Group>
        <Alert variant="primary">
          Project should be active to use in the funcanalities.
        </Alert>
        <Form.Group controlId="image" className="mt-2 ">
          <Form.Label>Project Image</Form.Label>
          <div className="d-flex flex-wrap">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((num) => (
              <img
                key={num}
                src={`./assets/images/icons/${num}.png`}
                alt={`icon-${num}`}
                height={50}
                className={`m-2 ${
                  selectedImage === num ? "border border-primary" : ""
                }`}
                onClick={() => handleImageClick(num)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        </Form.Group>

        <Button variant="primary" type="submit">
          {loading ? "Uploading" : " Add Project"}
        </Button>
      </Form>
    </div>
  );
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!projectName.trim() || !projectDescription.trim()) {
      model.setModelData(<Warning text="All fields are required." />);
      model.setModelState(true);
      return;
    }

    const reqBody = {
      p_name: projectName.trim(),
      p_description: projectDescription.trim(),
      p_active: isActive,
      p_image: selectedImage,
    };

    try {
      setLoading(true);
      const response = await axios.post(`${SERVER}/project/create`, reqBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.authToken}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        handleNotification(
          "Project Created",
          "Your project has been successfully created."
        );
        setProjectName("");
        setProjectDescription("");
        setIsActive(false);
      } else {
        model.setModelData(
          <Error text="Something went wrong, please try later" />
        );
        model.setModelState(true);
      }
    } catch (error: any) {
      model.setModelData(
        <Error
          text={
            error?.response?.data?.message ||
            error?.response?.data?.msg ||
            "Something went wrong, please try later"
          }
        />
      );
      model.setModelState(true);
    } finally {
      setLoading(false);
    }
  }
  function handleImageClick(index: number) {
    setSelectedImage(index);
  }
};

export default ProjectAdd;
