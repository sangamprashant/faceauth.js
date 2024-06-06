import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Contact = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    rootMargin: "-100px",
  });

  const itemVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, type: "spring", stiffness: 100 },
    },
  };

  return (
    <section className="py-md-11 py-8" id="superhero" ref={ref}>
      <div
        className="bg-holder z-index--1 bottom-0 d-none d-lg-block background-position-top"
        style={{
          backgroundImage: "url(assets/img/superhero/oval.png)",
          opacity: ".5",
          backgroundPosition: "top !important",
        }}
      ></div>

      <div className="container">
        <div className="row justify-content-center">
          <motion.div
            className="col-lg-6 text-center"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={itemVariants}
          >
            <motion.h1
              className="fw-bold mb-4 fs-7"
              whileHover={{ scale: 1.05 }}
              variants={itemVariants}
            >
              Need a super hero?
            </motion.h1>
            <motion.p
              className="mb-5 text-info fw-medium"
              whileHover={{ scale: 1.05 }}
              variants={itemVariants}
            >
              Do you require some help for your project: Conception workshop,
              <br />
              prototyping, marketing strategy, landing page, Ux/UI?
            </motion.p>
            <motion.button
              className="btn btn-theme btn-md"
              whileHover={{ scale: 1.05 }}
              variants={itemVariants}
            >
              Contact Our Expert
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
