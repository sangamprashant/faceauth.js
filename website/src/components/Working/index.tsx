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

  return (
    <section className="pt-5" id="validation">
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
                >
                  {content.description}
                </motion.p>
              </React.Fragment>
            ))}
          </motion.div>
          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: imgInView ? 1 : 0, x: imgInView ? 0 : 100 }}
            transition={{ delay: 1, duration: 1 }}
            ref={imgRef}
          >
            <img className="img-fluid" src="assets/images/working.jpg" alt="" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Working;
