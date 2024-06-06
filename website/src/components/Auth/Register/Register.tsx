import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Social from "../Social";
import { useAuth } from "../../User/CheckAuth/AuthContext";
import { Error, Success, Warning } from "../../Result/Tag";
import axios from "axios";
import { SERVER } from "../../../config";

const Register = () => {
  const [fname, setFName] = React.useState("");
  const [sname, setSName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const { model } = useAuth();

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
                  <motion.form
                    variants={itemVariants}
                    onSubmit={handleRegister}
                  >
                    <div className="formsix-pos my-2">
                      <div className="form-group i-name">
                        <motion.input
                          type="text"
                          className="form-control p-3"
                          id="f-name"
                          onChange={(e) => setFName(e.target.value)}
                          value={fname}
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
                          value={sname}
                          onChange={(e) => setSName(e.target.value)}
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
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                      Already having an Account?
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

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    
  
    // Check if any of the required fields are empty
    if (!email.trim() || !fname.trim() || !sname.trim()) {
      model.setModelState(true);
      model.setModelData(<Warning text="All fields are required." />);
      return;
    }
  
    // Construct the request body
    const reqBody = {
      sname: sname.trim(),
      email: email.trim(),
      fname: fname.trim(),
    };
  
    try {
      // Send POST request to register user
      const response = await axios.post(`${SERVER}/auth/register`, reqBody);
  
      // Check if registration was successful
      if (response.data.success) {
        // Display success message in modal
        model.setModelState(true);
        model.setModelData(
          <Success text="Registration successful. Check your email to verify." />
        );
  
        // Reset form fields
        setSName("");
        setFName("");
        setEmail("");
      }
    } catch (error) {
      // Display error message in modal
      model.setModelState(true);
      model.setModelData(
        <Error text={error?.response?.data?.message || "An error occurred. Please try again later."} />
      );
    }
  }
  
};

export default Register;
