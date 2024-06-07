import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Social from "../Social";
import axios from "axios";
import { SERVER } from "../../../config";
import { Error, Success, Warning } from "../../Result/Tag";
import { useAuth } from "../../User/CheckAuth/AuthContext";

const Login = () => {
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
                    className="formsix-pos "
                    variants={itemVariants}
                    onSubmit={handleLogin}
                  >
                    <div className="form-group i-email my-2">
                      <motion.input
                        type="email"
                        className="form-control p-3"
                        id="email2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address *"
                        variants={itemVariants}
                      />
                    </div>
                    <motion.button
                      className="w-100 btn btn-lg btn-theme"
                      type="submit"
                      variants={itemVariants}
                    >
                      Sign In
                    </motion.button>
                  </motion.form>
                  <motion.div className="login_message" variants={itemVariants}>
                    <p>
                      Don't have an account?
                      <Link to="/get-started" className="text-decoration-none">
                        Sign up
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

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim()) {
      model.setModelState(true);
      model.setModelData(<Warning text="All fields are required." />);
      return;
    }

    const reqBody = {
      email: email.trim(),
    };

    try {
      const response = await axios.post(`${SERVER}/auth/login`, reqBody);
      if (response.data.success) {
        model.setModelState(true);
        model.setModelData(
          <Success text="Login successful. Check your email to verify." />
        );
        setEmail("");
      }
    } catch (error: any) {
      model.setModelState(true);
      model.setModelData(
        <Error
          text={
            error?.response?.data?.message ||
            "An error occurred. Please try again later."
          }
        />
      );
    }
  }
};

export default Login;
