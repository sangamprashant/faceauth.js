import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Social from "../Social";

const Register = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.section
      className="pt-7"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container">
        <div className="login_form_wrapper">
          <div className="container">
            <div className="row justify-content-center">
              <motion.div className="col-md-8 card" variants={itemVariants}>
                <motion.div
                  className="login_wrapper p-4"
                  variants={itemVariants}
                >
                  <Social />
                  <motion.div
                    className="d-flex align-items-center justify-content-center text-capitalize mt-2"
                    variants={itemVariants}
                  >
                    <h2>OR</h2>
                  </motion.div>
                  <motion.form variants={itemVariants}>
                    <div className="formsix-pos my-2">
                      <div className="form-group i-name">
                        <motion.input
                          type="text"
                          className="form-control p-3"
                          id="f-name"
                          placeholder="First Name *"
                          variants={itemVariants}
                        />
                      </div>
                    </div>
                    <div className="formsix-pos my-2">
                      <div className="form-group i-s-name">
                        <motion.input
                          type="text"
                          className="form-control p-3"
                          id="s-name"
                          placeholder="Second Name *"
                          variants={itemVariants}
                        />
                      </div>
                    </div>
                    <div className="formsix-pos my-2">
                      <div className="form-group i-email">
                        <motion.input
                          type="email"
                          className="form-control p-3"
                          id="email2"
                          placeholder="Email Address *"
                          variants={itemVariants}
                        />
                      </div>
                    </div>
                    <motion.button
                      className="w-100 btn btn-lg btn-theme"
                      type="submit"
                      variants={itemVariants}
                    >
                      Sign up
                    </motion.button>
                  </motion.form>
                  <motion.div className="login_message" variants={itemVariants}>
                    <p>
                      Alread haveing an Account?
                      <Link to="/log-in" className="text-decoration-none">
                        Sign In
                      </Link>
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Register;
