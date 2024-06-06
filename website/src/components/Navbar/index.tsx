import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Tooltip } from "antd";
import { motion } from "framer-motion";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavPublicItems } from "../Strings";
import { useAuth } from "../User/CheckAuth/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { authenticate, logout } = useAuth();
  const navbarCollapseRef = React.useRef<HTMLDivElement>(null);
  let match = window.location.pathname === "/";
  let isMobile = window.innerWidth <= 768;
  React.useEffect(() => {
    match = window.location.pathname === "/";
  }, [window.location, navigate]);

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleNavItemClick = () => {
    if (window.innerWidth < 992) {
      const collapseElement = navbarCollapseRef.current;
      if (collapseElement && collapseElement.classList.contains("show")) {
        collapseElement.classList.remove("show");
      }
    }
  };

  return (
    <motion.nav
      className="navbar navbar-expand-lg navbar-light sticky-top backdrop"
      data-navbar-on-scroll="data-navbar-on-scroll"
      style={{
        backgroundImage: "none",
        backgroundColor: "#f9fafdb3",
      }}
      variants={navItemVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.1, duration: 0.7 }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <motion.img
            src="assets/images/tag.png"
            height="45"
            alt="logo"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
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
          ref={navbarCollapseRef}
        >
          <ul className="navbar-nav ms-auto">
            {NavPublicItems.map((data, index) => {
              const link = data.link.startsWith("/#")
                ? data.link.replace("/#", "/")
                : data.link;
              return (
                <motion.li
                  className="nav-item"
                  key={index}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1, duration: 0.7 }}
                >
                  {match ? (
                    <a
                      className="nav-link"
                      aria-current="page"
                      href={data.link}
                      onClick={handleNavItemClick}
                    >
                      {data.label}
                    </a>
                  ) : (
                    <Link
                      to={link}
                      className="nav-link"
                      onClick={handleNavItemClick}
                    >
                      {data.label}
                    </Link>
                  )}
                </motion.li>
              );
            })}
            <motion.li
              className="nav-item"
              key="locimentation"
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1, duration: 0.7 }}
            >
              <Link
                className="nav-link"
                to="/documentation"
                onClick={handleNavItemClick}
              >
                Documentation
              </Link>
            </motion.li>
            {authenticate.isAuthenticated && (
              <motion.li
                className="nav-item"
                key="locimentation"
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1, duration: 0.7 }}
              >
                <Tooltip placement="bottom" title="Profile">
                  <Link
                    className="nav-link"
                    to="/profile"
                    onClick={handleNavItemClick}
                  >
                    <AccountCircleIcon /> {isMobile ? "Profile" : ""}
                  </Link>
                </Tooltip>
              </motion.li>
            )}
          </ul>
          <div className="d-flex ms-lg-4">
            {!authenticate.isAuthenticated ? (
              <>
                <Link
                  className="btn btn-secondary-outline ms-3"
                  to="/log-in"
                  onClick={handleNavItemClick}
                >
                  <motion.span
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1, duration: 0.7 }}
                  >
                    Login
                  </motion.span>
                </Link>

                <Link
                  className="btn btn-theme ms-3"
                  to="/get-started"
                  onClick={handleNavItemClick}
                >
                  <motion.span
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    Get Started
                  </motion.span>
                </Link>
              </>
            ) : (
              <motion.button
                className="btn btn-theme ms-3"
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                onClick={() => {
                  handleNavItemClick(), logout();
                }}
              >
                Logout
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
