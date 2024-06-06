import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Result.css";

// 100 loading
// 401 unauthorized
// 404 page not Found
// 500 server error
type Props = {
  type: 100 | 401 | 404 | 500;
};

type ComponentResultProps = {
  image: string;
  extra?: any;
};

const Result = (props: Props) => {
  const { type } = props;
  if (type === 100)
    return <ComponentResult image="assets/images/Result/loading.gif" />;
  else if (type === 401)
    return (
      <ComponentResult
        image="assets/images/Result/401.jpg"
        extra={
          <Link to="/log-in" className="btn btn-theme">
            Go Back To LogIn
          </Link>
        }
      />
    );
  else if (type === 404)
    return (
      <ComponentResult
        image="assets/images/Result/404.jpg"
        extra={
          <Link to="/" className="btn btn-theme mt-2">
            Go Back To Home
          </Link>
        }
      />
    );
  else if (type === 500)
    return <ComponentResult image="assets/images/Result/500.jpg" />;

  return <div>An error occurred.</div>;
};

const ComponentResult = (props: ComponentResultProps) => {
  const { image, extra } = props;

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      className="pt-5"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container d-flex justify-content-center flex-column align-items-center">
        <motion.img
          src={image}
          alt=""
          className="result-image"
          variants={itemVariants}
        />
        {extra && <motion.div variants={itemVariants}>{extra}</motion.div>}
      </div>
    </motion.section>
  );
};

export default Result;
