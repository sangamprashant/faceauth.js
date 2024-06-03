

const Marketing = () => {
  return (
    <section className="pt-5" id="marketing">
      <div className="container">
        <h1 className="fw-bold fs-6 mb-3">Marketing Strategies</h1>
        <p className="mb-6 text-secondary">
          Join 40,000+ other marketers and get proven strategies on email
          marketing
        </p>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                className="card-img-top"
                src="assets/img/marketing/marketing01.png"
                alt=""
              />
              <div className="card-body ps-0">
                <p className="text-secondary">
                  By{" "}
                  <a className="fw-bold text-decoration-none me-1" href="#">
                    Abdullah
                  </a>
                  |<span className="ms-1">03 March 2019</span>
                </p>
                <h3 className="fw-bold">
                  Increasing Prosperity With Positive Thinking
                </h3>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                className="card-img-top"
                src="assets/img/marketing/marketing02.png"
                alt=""
              />
              <div className="card-body ps-0">
                <p className="text-secondary">
                  By{" "}
                  <a className="fw-bold text-decoration-none me-1" href="#">
                    Abdullah
                  </a>
                  |<span className="ms-1">03 March 2019</span>
                </p>
                <h3 className="fw-bold">
                  Motivation Is The First Step To Success
                </h3>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img
                className="card-img-top"
                src="assets/img/marketing/marketing03.png"
                alt=""
              />
              <div className="card-body ps-0">
                <p className="text-secondary">
                  By{" "}
                  <a className="fw-bold text-decoration-none me-1" href="#">
                    Abdullah
                  </a>
                  |<span className="ms-1">03 March 2019</span>
                </p>
                <h3 className="fw-bold">
                  Success Steps For Your Personal Or Business Life
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end of .container--> */}
    </section>
  );
};

export default Marketing;
