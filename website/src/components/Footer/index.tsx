import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <React.Fragment>
      <section className="pb-2 pb-lg-5">
        <div className="container">
          <div className="row border-top border-top-secondary pt-7">
            <div className="col-lg-3 col-md-6 mb-4 mb-md-6 mb-lg-0 mb-sm-2 order-1 order-md-1 order-lg-1">
              <img
                className="mb-4"
                src="assets/img/logo.svg"
                width="184"
                alt=""
              />
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0 order-3 order-md-3 order-lg-2">
              <p className="fs-2 mb-lg-4">Quick Links</p>
              <ul className="list-unstyled mb-0">
                <li className="mb-1">
                  <a
                    className="link-900 text-secondary text-decoration-none"
                    href="#!"
                  >
                    About us
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    className="link-900 text-secondary text-decoration-none"
                    href="#!"
                  >
                    Blog
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    className="link-900 text-secondary text-decoration-none"
                    href="#!"
                  >
                    Contact
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    className="link-900 text-secondary text-decoration-none"
                    href="#!"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0 order-4 order-md-4 order-lg-3">
              <p className="fs-2 mb-lg-4">Legal stuff</p>
              <ul className="list-unstyled mb-0">
                <li className="mb-1">
                  <a
                    className="link-900 text-secondary text-decoration-none"
                    href="#!"
                  >
                    Disclaimer
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    className="link-900 text-secondary text-decoration-none"
                    href="#!"
                  >
                    Financing
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    className="link-900 text-secondary text-decoration-none"
                    href="#!"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    className="link-900 text-secondary text-decoration-none"
                    href="#!"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 col-6 mb-4 mb-lg-0 order-2 order-md-2 order-lg-4">
              <p className="fs-2 mb-lg-4">
                knowing you're always on the best energy deal.
              </p>
              <form className="mb-3">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter your phone Number"
                  aria-label="phone"
                />
              </form>
              <button className="btn btn-warning fw-medium py-1">
                Sign up Now
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="text-center py-0">
        <div className="container">
          <div className="container border-top py-3">
            <div className="row justify-content-between">
              <div className="col-12 col-md-auto mb-1 mb-md-0">
                <p className="mb-0">&copy; 2022 Your Company Inc </p>
              </div>
              <div className="col-12 col-md-auto">
                <p className="mb-0">
                  Made with
                  <span className="fas fa-heart mx-1 text-danger">
                    {" "}
                  </span>by{" "}
                  <a
                    className="text-decoration-none ms-1"
                    href="https://github.com/sangamprashant/"
                    target="_blank"
                  >
                    Prashant Srivastav
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end of .container--> */}
      </section>
    </React.Fragment>
  );
};

export default Footer;
