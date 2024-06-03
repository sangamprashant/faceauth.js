import React from "react";

type Props = {};

const Access = (props: Props) => {
  return (
    <section className="pt-5" id="validation">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h5 className="text-secondary">Effortless Validation for</h5>
            <h2 className="mb-2 fs-7 fw-bold">Design Professionals</h2>
            <p className="mb-4 fw-medium text-secondary">
              The Myspace page defines the individual,his or her
              characteristics, traits, personal choices and the overall
              <br />
              personality of the person.
            </p>
            <h4 className="fs-1 fw-bold">Accessory makers</h4>
            <p className="mb-4 fw-medium text-secondary">
              While most people enjoy casino gambling, sports betting,
              <br />
              lottery and bingo playing for the fun
            </p>
            <h4 className="fs-1 fw-bold">Alterationists</h4>
            <p className="mb-4 fw-medium text-secondary">
              If you are looking for a new way to promote your business
              <br />
              that won't cost you money,
            </p>
            <h4 className="fs-1 fw-bold">Custom Design designers</h4>
            <p className="mb-4 fw-medium text-secondary">
              If you are looking for a new way to promote your business
              <br />
              that won't cost you more money,
            </p>
          </div>
          <div className="col-lg-6">
            <img
              className="img-fluid"
              src="assets/img/validation/validation.png"
              alt=""
            />
          </div>
        </div>
      </div>
      {/* <!-- end of .container--> */}
    </section>
  );
};

export default Access;
