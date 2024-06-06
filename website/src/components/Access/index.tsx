import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { featuresData } from "../Strings";

const Access = () => {
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: false,
  });
  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: false,
  });
  const { ref: imageRef, inView: imageInView } = useInView({
    triggerOnce: false,
  });

  const hoverEffect = {
    scale: 1.05,
    transition: { duration: 0.3 },
  };

  return (
    <section className="pt-5" id="features">
      <div className="container">
        <div className="row align-items-center">
          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, x: -100 }}
            animate={{
              opacity: titleInView ? 1 : 0,
              x: titleInView ? 0 : -100,
            }}
            transition={{ duration: 1 }}
            ref={titleRef}
          >
            <h5 className="text-secondary">Features</h5>
            <h2 className="mb-2 fs-7 fw-bold">Secure User Authentication</h2>
            <motion.p
              className="mb-4 fw-medium text-secondary"
              initial={{ opacity: 0, x: -100 }}
              animate={{
                opacity: textInView ? 1 : 0,
                x: textInView ? 0 : -100,
              }}
              transition={{ delay: 0.5, duration: 1 }}
              ref={textRef}
              whileHover={hoverEffect}
            >
              Faceauth.js offers robust facial recognition for web apps. It
              ensures a seamless, secure login experience using modern web
              technologies.
            </motion.p>
            {featuresData.map((feature, index) => (
              <React.Fragment key={index}>
                <motion.h4
                  className="fs-1 fw-bold"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{
                    opacity: textInView ? 1 : 0,
                    x: textInView ? 0 : -100,
                  }}
                  transition={{ delay: 1 + index * 0.5, duration: 1 }}
                  whileHover={hoverEffect}
                >
                  {feature.title}
                </motion.h4>
                <motion.p
                  className="mb-4 fw-medium text-secondary"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{
                    opacity: textInView ? 1 : 0,
                    x: textInView ? 0 : -100,
                  }}
                  transition={{ delay: 1.5 + index * 0.5, duration: 1 }}
                  whileHover={hoverEffect}
                >
                  {feature.description}
                </motion.p>
              </React.Fragment>
            ))}
          </motion.div>
          <motion.div
            className="col-lg-6 d-flex justify-content-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: imageInView ? 1 : 0 }}
            transition={{ delay: 1, duration: 1 }}
            ref={imageRef}
            whileHover={hoverEffect}
          >
            <img
              width="100%"
              src="assets/images/secure.png"
              alt="Secure"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Access;
