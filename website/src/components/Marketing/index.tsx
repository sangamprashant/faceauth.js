import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Marketing = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    rootMargin: "-100px", // Adjust the rootMargin as needed
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, delay: 0.2, ease: "easeInOut" },
    },
  };

  return (
    <motion.section
      className="pt-5"
      id="marketing"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      ref={ref}
    >
      <div className="container">
        <h1 className="fw-bold fs-6 mb-3">Marketing Strategies for Faceauth.js</h1>
        <p className="mb-6 text-secondary">
          Join 40,000+ other developers and get proven strategies on implementing and marketing Faceauth.js.
        </p>
        <div className="row">
          <div className="col-md-4 mb-4">
            <motion.div whileHover={{ scale: 1.05 }} className="card">
              <img
                className="card-img-top"
                src="assets/images/marketing/1.jpg"
                alt="Marketing Image 1"
              />
              <div className="card-body ps-0">
                <p className="text-secondary">
                  By{" "}
                  <a className="fw-bold text-decoration-none me-1" href="#">
                    Faceauth Team
                  </a>
                  |<span className="ms-1">03 March 2024</span>
                </p>
                <h3 className="fw-bold">
                  <motion.span whileHover={{ color: "#ff6b6b" }}>
                    Seamless Authentication with Faceauth.js
                  </motion.span>
                </h3>
              </div>
            </motion.div>
          </div>
          <div className="col-md-4 mb-4">
            <motion.div whileHover={{ scale: 1.05 }} className="card">
              <img
                className="card-img-top"
                src="assets/images/marketing/2.jpg"
                alt="Marketing Image 2"
              />
              <div className="card-body ps-0">
                <p className="text-secondary">
                  By{" "}
                  <a className="fw-bold text-decoration-none me-1" href="#">
                    Faceauth Team
                  </a>
                  |<span className="ms-1">03 March 2024</span>
                </p>
                <h3 className="fw-bold">
                  <motion.span whileHover={{ color: "#ff6b6b" }}>
                    Secure Your Applications with Faceauth.js
                  </motion.span>
                </h3>
              </div>
            </motion.div>
          </div>
          <div className="col-md-4 mb-4">
            <motion.div whileHover={{ scale: 1.05 }} className="card">
              <img
                className="card-img-top"
                src="assets/images/marketing/3.jpg"
                alt="Marketing Image 3"
              />
              <div className="card-body ps-0">
                <p className="text-secondary">
                  By{" "}
                  <a className="fw-bold text-decoration-none me-1" href="#">
                    Faceauth Team
                  </a>
                  |<span className="ms-1">03 March 2024</span>
                </p>
                <h3 className="fw-bold">
                  <motion.span whileHover={{ color: "#ff6b6b" }}>
                    Enhance User Experience with Faceauth.js
                  </motion.span>
                </h3>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Marketing;
