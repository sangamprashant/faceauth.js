import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SERVER } from "../../../../config";
import { useAuth } from "../../CheckAuth/AuthContext";
import { Error } from "../../../Result/Tag";

type ProjectType = {
  _id: string;
  project_name: string;
  project_description: string;
  project_active: boolean;
  project_image: number;
};

const ProjectListShow: React.FC<{ project: ProjectType }> = ({ project }) => {
  const { token, model, handleNotification } = useAuth();
  const [projectData, setProjectData] = useState<ProjectType>(project);

  const toggleProjectActive = async () => {
    try {
      const response = await axios.get(
        `${SERVER}/project/toggle_active/${projectData._id}`,
        {
          headers: {
            Authorization: "Bearer " + token.authToken,
          },
        }
      );
      setProjectData({
        ...projectData,
        project_active: response.data.new_status,
      });
      handleNotification(
        "Project Status Updated",
        `Your project is now ${
          response.data.new_status ? "active" : "inactive"
        }.`
      );
    } catch (error: any) {
      model.setModelData(
        <Error
          text={
            error?.response?.data?.message ||
            error?.response?.data?.msg ||
            "Something went wrong."
          }
        />
      );
      model.setModelState(true);
      console.log({ error });
    }
  };

  return (
    <div className="col-md-4 p-2">
      <article className="card">
        <div className="card-header">
          <div>
            <img
              src={`./assets/images/icons/${projectData.project_image}.png`}
              alt=""
              height={50}
            />
            <h3>{projectData.project_name}</h3>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={projectData.project_active}
              onChange={toggleProjectActive}
            />
            <span></span>
          </label>
        </div>
        <div className="card-body">
          <p>{projectData.project_description}</p>
        </div>
        <div className="card-footer">
          <Link to={`/project?search=${projectData._id}`}>
            View integration
          </Link>
        </div>
      </article>
    </div>
  );
};

export default ProjectListShow;
