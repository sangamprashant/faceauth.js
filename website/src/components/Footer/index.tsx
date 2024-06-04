import { motion } from "framer-motion";
import React from "react";
import { FooterData } from "../Strings";

const Footer = () => {
  return (
    <React.Fragment>
      <section className="pb-2 pb-lg-5">
        <div className="container">
          <div className="row border-top border-top-secondary pt-7">
            <div className="col-lg-3 col-md-6 mb-4 mb-md-6 mb-lg-0 mb-sm-2 order-1 order-md-1 order-lg-1">
              <motion.img
                className="mb-4"
                src="assets/images/tag.png"
                width="184"
                alt=""
                whileHover={{ scale: 1.1 }}
              />
            </div>
            {FooterData.map((data, index) => (
              <div
                className="col-lg-3 col-md-6 mb-4 mb-lg-0 order-3 order-md-3 order-lg-2"
                key={index}
              >
                <motion.p className="fs-2 mb-lg-4" whileHover={{ scale: 1.1 }}>
                  {data.title}
                </motion.p>
                <ul className="list-unstyled mb-0">
                  {data.links.map((link, i) => (
                    <li className="mb-1" key={i}>
                      <a
                        className="link-900 text-secondary text-decoration-none"
                        href={link.link}
                      >
                        <motion.span whileHover={{ scale: 1.1 }}>
                          {link.label}
                        </motion.span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0 order-2 order-md-2 order-lg-4">
              <motion.p className="fs-2 mb-lg-4" whileHover={{ scale: 1.1 }}>
                knowing you're always on the best energy deal.
              </motion.p>
              <form className="mb-3">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter your phone Number"
                  aria-label="phone"
                />
              </form>
              <motion.button
                className="btn btn-theme fw-medium py-1"
                whileHover={{ scale: 1.1 }}
              >
                Sign up Now
              </motion.button>
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
      </section>
    </React.Fragment>
  );
};

export default Footer;
