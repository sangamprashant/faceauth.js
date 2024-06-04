import React from "react";
import { Link } from "react-router-dom";
import Social from "../Social";

const Login = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="pt-7">
      <div className="container">
        <div className="login_form_wrapper">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 card">
                <div className="login_wrapper p-4">
                  <Social />
                  <div className="d-flex align-items-center justify-content-center text-capitalize mt-3">
                    <h2>OR</h2>
                  </div>
                  <div className="formsix-pos my-2">
                    <div className="form-group i-email">
                      <input
                        type="email"
                        className="form-control p-3"
                        id="email2"
                        placeholder="Email Address *"
                      />
                    </div>
                  </div>
                  <button className="w-100 btn btn-lg btn-theme" type="submit">
                    Sign In
                  </button>
                  <div className="login_message">
                    <p>
                      Don't have an account?
                      <Link to="/get-started" className="text-decoration-none">
                        Sign up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
