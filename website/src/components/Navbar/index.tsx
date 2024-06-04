import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { NavPublicItems } from "../Strings";

const Navbar = () => {
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light sticky-top backdrop"
      data-navbar-on-scroll="data-navbar-on-scroll"
      style={{
        backgroundImage: "none",
        backgroundColor: "#f9fafdb3",
      }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <motion.img
            src="assets/images/tag.png"
            height="45"
            alt="logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 1 }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"> </span>
        </button>
        <div
          className="collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto">
            {NavPublicItems.map((data, index) => {
              return (
                <motion.li
                  className="nav-item"
                  key={index}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1, duration: 0.7 }}
                >
                  <a className="nav-link" aria-current="page" href={data.link}>
                    {data.label}
                  </a>
                </motion.li>
              );
            })}
          </ul>
          <div className="d-flex ms-lg-4">
            <Link className="btn btn-secondary-outline ms-3" to="/log-in">
              <motion.span
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay:.1, duration: .7 }}
              >
                Login
              </motion.span>
            </Link>

            <Link className="btn btn-theme ms-3" to="/get-started">
              <motion.span
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
              >
                Get Started
              </motion.span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
