import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const contentData = [
  {
    title: "Privacy Concerns",
    text: "User privacy is paramount. Developers employing Faceauth.js must ensure transparent user consent for facial data collection and implement robust security measures to protect this sensitive information.",
    imgSrc: "assets/images/tick.jpg",
  },
  {
    title: "Lighting and Angle Variations",
    text: "Facial recognition algorithms can be impacted by variations in lighting, pose, and facial expressions. Choosing a well-designed library that mitigates these factors is crucial for optimal performance.",
    imgSrc: "assets/images/tick.jpg",
  },
  {
    title: "Device Compatibility (Potential)",
    text: "Broader device compatibility ensures a wider user base and a consistent experience. Ideally, Faceauth.js should strive to function effectively across various platforms and devices.",
    imgSrc: "assets/images/tick.jpg",
  },
];

const fromLeftVariants = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const fromRightVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const contentItemVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const hoverEffect = {
  scale: 1.05,
  transition: { duration: 0.3 },
};

const Features = () => {
  const { ref: imgRef, inView: imgInView } = useInView({
    triggerOnce: false,
  });
  const { ref: contentRef, inView: contentInView } = useInView({
    triggerOnce: false,
  });

  return (
    <section className="pt-5" id="manager">
      <div className="container">
        <div className="row">
          <motion.div
            className="col-lg-6"
            initial="initial"
            animate={imgInView ? "animate" : "initial"}
            variants={fromLeftVariants}
            ref={imgRef}
          >
            <img className="img-fluid" src="assets/images/features.jpg" alt="" />
          </motion.div>
          <motion.div
            className="col-lg-6"
            initial="initial"
            animate={contentInView ? "animate" : "initial"}
            variants={fromRightVariants}
            ref={contentRef}
          >
            <p className="fs-7 fw-bold mb-2">Potential Considerations</p>
            <p className="mb-4 fw-medium text-secondary">
              {/* something related to potential considerations */}
            </p>
            {contentData.map((item, index) => (
              <motion.div
                className="d-flex align-items-center mb-3"
                key={index}
                whileHover={hoverEffect}
                initial="initial"
                animate={contentInView ? "animate" : "initial"}
                variants={contentItemVariants}
                custom={index}
              >
                <img
                  className="me-sm-4 me-2 object-fit-cover"
                  src={item.imgSrc}
                  width="35"
                  alt="tick"
                />
                <p className="fw-medium mb-0 text-secondary">
                  <b>{item.title}</b> {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      {/* <!-- end of .container--> */}
    </section>
  );
};

export default Features;
