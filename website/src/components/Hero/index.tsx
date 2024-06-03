

const Hero = () => {
  return (
    <section className="pt-7">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-md-start text-center py-6">
            <h1 className="mb-4 fs-9 fw-bold">
              The Design Thinking Superpowers
            </h1>
            <p className="mb-6 lead text-secondary">
              Tools tutorials, design and innovation experts, all
              <br className="d-none d-xl-block" />
              in one place! The most intuitive way to imagine
              <br className="d-none d-xl-block" />
              your next user experience.
            </p>
            <div className="text-center text-md-start">
              <a
                className="btn btn-warning me-3 btn-lg"
                href="#!"
                role="button"
              >
                Get started
              </a>
              <a
                className="btn btn-link text-warning fw-medium"
                href="#!"
                role="button"
                data-bs-toggle="modal"
                data-bs-target="#popupVideo"
              >
                <span className="fas fa-play me-2"></span>Watch the video{" "}
              </a>
            </div>
          </div>
          <div className="col-md-6 text-end">
            <img
              className="pt-7 pt-md-0 img-fluid"
              src="assets/img/hero/hero-img.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
