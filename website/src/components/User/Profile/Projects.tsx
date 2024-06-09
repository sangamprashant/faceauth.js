import axios from "axios";
import React from "react";
import { SERVER } from "../../../config";
import { Error } from "../../Result/Tag";
import LoadingComponent from "../../Reuse/Loading";
import NoItem from "../../Reuse/NoItem";
import { useAuth } from "../CheckAuth/AuthContext";
import ProjectAdd from "./Reuse/ProjectAdd";
import ProjectListShow from "./Reuse/ProjectList";

const Projects = () => {
  const { model, token } = useAuth();
  const [showOpen, setShowOpen] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [projectsData, setProjectsData] = React.useState([]);

  React.useLayoutEffect(() => {
    if (showOpen) fetchData();
  }, [showOpen]);

  return (
    <React.Fragment>
      <div className="mt-4 d-flex justify-content-between align-items-center">
        <h3>{showOpen ? "Projects list" : "Add New Project"}</h3>
        <button
          className={`btn btn-${showOpen ? "theme" : "danger"}`}
          onClick={toggleShow}
        >
          {showOpen ? "Add Project" : "Cancel"}
        </button>
      </div>
      <hr />

      {showOpen ? (
        <React.Fragment>
          {loading ? (
            <LoadingComponent />
          ) : (
            <React.Fragment>
              {projectsData.length > 0 ? (
                <div className="row ">
                  {projectsData.map((project, index) => (
                    <ProjectListShow project={project} key={index} />
                  ))}
                </div>
              ) : (
                <NoItem width={100} title="No item found" />
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <ProjectAdd />
      )}
    </React.Fragment>
  );

  async function fetchData() {
    setLoading(true);
    try {
      const response = await axios.get(`${SERVER}/project/list`, {
        headers: {
          Authorization: "Bearer " + token.authToken,
        },
      });
      if (response.status === 200 || response.status === 201) {
        setProjectsData(response.data.reverse());
      } else {
        model.setModelData(
          <Error text="Something went wrong, please try again." />
        );
        model.setModelState(true);
      }
    } catch (error: any) {
      model.setModelData(
        <Error
          text={
            error?.response?.data?.message ||
            error?.response?.data?.msg ||
            "Something went wrong, please try again."
          }
        />
      );
      model.setModelState(true);
    } finally {
      setLoading(false);
    }
  }

  function toggleShow() {
    setShowOpen((prev) => !prev);
  }
};

export default Projects;
