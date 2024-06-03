

const Features = () => {
  return (
    <section className="pt-5" id="manager">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <img
              className="img-fluid"
              src="assets/img/manager/manager.png"
              alt=""
            />
          </div>
          <div className="col-lg-6">
            <h5 className="text-secondary">Easier decision making for</h5>
            <p className="fs-7 fw-bold mb-2">Product Managers</p>
            <p className="mb-4 fw-medium text-secondary">
              The Myspace page defines the individual,his or her
              characteristics, traits, personal choices and the overall
              <br />
              personality of the person.
            </p>
            <div className="d-flex align-items-center mb-3">
              {" "}
              <img
                className="me-sm-4 me-2"
                src="assets/img/manager/tick.png"
                width="35"
                alt="tick"
              />
              <p className="fw-medium mb-0 text-secondary">
                Never worry about overpaying for your
                <br />
                energy again.
              </p>
            </div>
            <div className="d-flex align-items-center mb-3">
              {" "}
              <img
                className="me-sm-4 me-2"
                src="assets/img/manager/tick.png"
                width="35"
                alt="tick"
              />
              <p className="fw-medium mb-0 text-secondary">
                We will only switch you to energy companies
                <br />
                that we trust and will treat you right
              </p>
            </div>
            <div className="d-flex align-items-center mb-3">
              <img
                className="me-sm-4 me-2"
                src="assets/img/manager/tick.png"
                width="35"
                alt="tick"
              />
              <p className="fw-medium mb-0 text-secondary">
                {" "}
                We track the markets daily and know where the
                <br />
                savings are.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end of .container--> */}
    </section>
  );
};

export default Features;
