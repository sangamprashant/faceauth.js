import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { services } from "../Strings";

const isMobile = window.innerWidth <= 768;

interface ServiceItemProps {
  service: {
    title: string;
    description: string;
    image: string;
  };
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const itemTransition = {
  duration: 0.5,
  ease: "easeOut",
};

const Service = () => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 },
    },
  };

  const { ref: ButtonRef, inView: ButtonInView } = useInView({
    triggerOnce: false,
  });

  const buttonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="pt-5 pt-md-9 mb-6" id="feature">
      <div
        className="bg-holder z-index--1 bottom-0 d-none d-lg-block"
        style={{
          backgroundImage: "url(assets/images/service/shape.png)",
          opacity: ".5",
        }}
      ></div>
      <div className="container">
        <h1 className="fs-9 fw-bold mb-4 text-center">
          Unlock Your Superpowers with Faceauth.js
        </h1>
        <motion.div
          className="row"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service, index) => (
            <ServiceItem key={index} service={service} />
          ))}
        </motion.div>
        <motion.div
          className="text-center"
          variants={buttonVariants}
          initial="hidden"
          animate={ButtonInView ? "visible" : "hidden"}
          ref={ButtonRef}
          transition={{ delay: 0, duration: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.button
            className="btn btn-theme me-3 btn-lg"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/get-started")}
          >
            SIGNUP NOW
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceItem = ({ service }: ServiceItemProps) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
  });

  return (
    <motion.div
      className={`col-lg-4 col-md-6 mb-4 ${isMobile ? "text-center" : ""}`}
      variants={itemVariants}
      transition={itemTransition}
      ref={ref}
      animate={inView ? "visible" : "hidden"}
    >
      <motion.img
        className="mb-3 ms-n3"
        src={service.image}
        width="75"
        alt={service.title}
      />
      <motion.h4 className={`mb-3 `}>{service.title}</motion.h4>
      <motion.p className={`mb-0 fw-medium text-secondary`}>
        {service.description}
      </motion.p>
    </motion.div>
  );
};

export default Service;
