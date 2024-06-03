

const Contact = () => {
  return (
    <section className="py-md-11 py-8" id="superhero">
      <div
        className="bg-holder z-index--1 bottom-0 d-none d-lg-block background-position-top"
        style={{
          backgroundImage: "url(assets/img/superhero/oval.png)",
          opacity: ".5",
          backgroundPosition: "top !important ",
        }}
      ></div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <h1 className="fw-bold mb-4 fs-7">Need a super hero?</h1>
            <p className="mb-5 text-info fw-medium">
              Do you require some help for your project: Conception workshop,
              <br />
              prototyping, marketing strategy, landing page, Ux/UI?
            </p>
            <button className="btn btn-warning btn-md">
              Contact our expert
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
