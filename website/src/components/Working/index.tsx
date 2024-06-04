import { motion } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer";
import { contentArray } from "../Strings";

const Working = () => {
  const { ref: imgRef, inView: imgInView } = useInView({
    triggerOnce: false,
  });
  const { ref: contentRef, inView: contentInView } = useInView({
    triggerOnce: false,
  });

  const hoverEffect = {
    scale: 1.05,
    transition: { duration: 0.3 },
  };

  return (
    <section className="pt-5">
      <div className="container">
        <div className="row align-items-center">
          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, x: -100 }}
            animate={{
              opacity: contentInView ? 1 : 0,
              x: contentInView ? 0 : -100,
            }}
            transition={{ duration: 1 }}
            ref={contentRef}
          >
            <h2 className="mb-2 fs-7 fw-bold">How Faceauth.js Works</h2>
            {contentArray.map((content, index) => (
              <React.Fragment key={index}>
                <motion.h4
                  className="fs-1 fw-bold"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{
                    opacity: contentInView ? 1 : 0,
                    x: contentInView ? 0 : -100,
                  }}
                  transition={{ delay: 0.5 + index * 0.5, duration: 1 }}
                  whileHover={hoverEffect}
                >
                  {content.title}
                </motion.h4>
                <motion.p
                  className="mb-4 fw-medium text-secondary"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{
                    opacity: contentInView ? 1 : 0,
                    x: contentInView ? 0 : -100,
                  }}
                  transition={{ delay: 1 + index * 0.5, duration: 1 }}
                  whileHover={hoverEffect}
                >
                  {content.description}
                </motion.p>
              </React.Fragment>
            ))}
          </motion.div>
          <motion.div
            className="col-lg-6 d-flex justify-content-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: imgInView ? 1 : 0 }}
            transition={{ delay: 1, duration: 1 }}
            ref={imgRef}
          >
            <motion.img
              width="100%"
              src="assets/images/working.jpg"
              alt=""
              initial={{ opacity: 0 }}
              animate={{ opacity: imgInView ? 1 : 0 }}
              transition={{ duration: 1 }}
              whileHover={hoverEffect}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Working;
