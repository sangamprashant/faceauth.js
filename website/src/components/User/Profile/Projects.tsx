const projectsData = [
  {
    imgSrc: "https://assets.codepen.io/285131/github.svg",
    title: "GitHub",
    description: "Link pull requests and automate workflows.",
    checked: false,
  },
  {
    imgSrc: "https://assets.codepen.io/285131/github.svg",
    title: "GitHub",
    description: "Link pull requests and automate workflows.",
    checked: true,
  },
  {
    imgSrc: "https://assets.codepen.io/285131/github.svg",
    title: "GitHub",
    description: "Link pull requests and automate workflows.",
    checked: true,
  },
  {
    imgSrc: "https://assets.codepen.io/285131/github.svg",
    title: "GitHub",
    description: "Link pull requests and automate workflows.",
    checked: true,
  },
  {
    imgSrc: "https://assets.codepen.io/285131/github.svg",
    title: "GitHub",
    description: "Link pull requests and automate workflows.",
    checked: false,
  },
  {
    imgSrc: "https://assets.codepen.io/285131/github.svg",
    title: "GitHub",
    description: "Link pull requests and automate workflows.",
    checked: true,
  },
];

const Projects = () => {
  return (
    <div className="row mt-6">
      {projectsData.map((project, index) => (
        <div className=" col-md-4 p-2">
          <article key={index} className="card">
            <div className="card-header">
              <div>
                {/* <span>
                  <img src={project.imgSrc} alt={project.title} />
                </span> */}
                <h3>{project.title}</h3>
              </div>
              <label className="toggle">
                <input type="checkbox" checked={project.checked} />
                <span></span>
              </label>
            </div>
            <div className="card-body">
              <p>{project.description}</p>
            </div>
            <div className="card-footer">
              <a href="#">View integration</a>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
};

export default Projects;
