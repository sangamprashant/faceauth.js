
const Service = () => {
  return (
    <section className="pt-5 pt-md-9 mb-6" id="feature">
      <div
        className="bg-holder z-index--1 bottom-0 d-none d-lg-block"
        style={{
          backgroundImage: "url(assets/img/category/shape.png)",
          opacity: ".5",
        }}
      ></div>
      {/* --/.bg-holder-- */}

      <div className="container">
        <h1 className="fs-9 fw-bold mb-4 text-center">
          {" "}
          We design tools to unveil <br className="d-none d-xl-block" />
          your superpowers
        </h1>
        <div className="row">
          <div className="col-lg-3 col-sm-6 mb-2">
            {" "}
            <img
              className="mb-3 ms-n3"
              src="assets/img/category/icon1.png"
              width="75"
              alt="Feature"
            />
            <h4 className="mb-3">First click tests</h4>
            <p className="mb-0 fw-medium text-secondary">
              While most people enjoy casino gambling,
            </p>
          </div>
          <div className="col-lg-3 col-sm-6 mb-2">
            {" "}
            <img
              className="mb-3 ms-n3"
              src="assets/img/category/icon2.png"
              width="75"
              alt="Feature"
            />
            <h4 className="mb-3">Design surveys</h4>
            <p className="mb-0 fw-medium text-secondary">
              Sports betting,lottery and bingo playing for the fun
            </p>
          </div>
          <div className="col-lg-3 col-sm-6 mb-2">
            {" "}
            <img
              className="mb-3 ms-n3"
              src="assets/img/category/icon3.png"
              width="75"
              alt="Feature"
            />
            <h4 className="mb-3">Preference tests</h4>
            <p className="mb-0 fw-medium text-secondary">
              The Myspace page defines the individual.
            </p>
          </div>
          <div className="col-lg-3 col-sm-6 mb-2">
            {" "}
            <img
              className="mb-3 ms-n3"
              src="assets/img/category/icon4.png"
              width="75"
              alt="Feature"
            />
            <h4 className="mb-3">Five second tests</h4>
            <p className="mb-0 fw-medium text-secondary">
              Personal choices and the overall personality of the person.
            </p>
          </div>
        </div>
        <div className="text-center">
          <a className="btn btn-warning" href="#!" role="button">
            SIGN UP NOW
          </a>
        </div>
      </div>
    </section>
  );
};

export default Service;
