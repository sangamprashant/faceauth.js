import { motion } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate= useNavigate()

  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: false,
  });
  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: false,
  });
  const { ref: buttonRef, inView: buttonInView } = useInView({
    triggerOnce: false,
  });
  const { ref: imageRef, inView: imageInView } = useInView({
    triggerOnce: false,
  });

  return (
    <section className="pt-7">
      <div className="container">
        <div className="row align-items-center">
          <motion.div
            className="col-md-6 text-md-start text-center py-6"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: titleInView ? 1 : 0, y: titleInView ? 0 : 100 }}
            transition={{ duration: 1 }}
            ref={titleRef}
          >
            <motion.h1
              className="mb-4 fs-9 fw-bold text-theme"
              initial={{ opacity: 0, y: -50 }}
              animate={{
                opacity: titleInView ? 1 : 0,
                y: titleInView ? 0 : -50,
              }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              FACE <br />
              RECOGNITION
            </motion.h1>
            <motion.p
              className="mb-6 lead text-secondary"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: textInView ? 1 : 0, y: textInView ? 0 : 50 }}
              transition={{ delay: 1, duration: 1 }}
              ref={textRef}
            >
              Offers state-of-the-art face recognition technology that can be
              easily integrated into your applications. Our tools and tutorials
              are designed to help you quickly and efficiently add face
              recognition capabilities to your projects.
            </motion.p>

            <motion.div
              className="text-center text-md-start"
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: buttonInView ? 1 : 0,
                y: buttonInView ? 0 : 50,
              }}
              transition={{ delay: 1.5, duration: 1 }}
              ref={buttonRef}
            >
              <motion.button
                
                className="btn btn-theme me-3 btn-lg"
                whileHover={{ scale: 1.05 }}
                onClick={()=>navigate("/get-started")}
              >
                Get Started
              </motion.button>

              <motion.button
                className="btn text-theme fw-medium"
                role="button"
                data-bs-toggle="modal"
                data-bs-target="#popupVideo"
                whileHover={{ scale: 1.05 }}
              >
                <span className="fas fa-play me-2"></span>Watch the video{" "}
              </motion.button>
            </motion.div>
          </motion.div>
          <motion.div
            className="col-md-6 text-end"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: imageInView ? 1 : 0, y: imageInView ? 0 : 100 }}
            transition={{ duration: 1 }}
            ref={imageRef}
          >
            <img
              className="pt-7 pt-md-0 img-fluid"
              src="assets/images/hero.png"
              alt=""
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
