import React from "react";
import { Link } from "react-router-dom";

type ProjectType = {
  _id: string;
  project_name: string;
  project_description: string;
  project_active: boolean;
  project_image: number;
};

const ProjectListShow: React.FC<{ project: ProjectType }> = ({ project }) => {
  return (
    <div className="col-md-4 p-2">
      <article className="card">
        <div className="card-header">
          <div>
            <img
              src={`./assets/images/icons/${project.project_image}.png`}
              alt=""
              height={50}
            />
            <h3>{project.project_name}</h3>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={project.project_active} readOnly />
            <span></span>
          </label>
        </div>
        <div className="card-body">
          <p>{project.project_description}</p>
        </div>
        <div className="card-footer">
          <Link to={`/project/${project._id}`}>View integration</Link>
        </div>
      </article>
    </div>
  );
};

export default ProjectListShow;
