import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Result.css";
import React from "react";

// 100 loading
// 101 verifying
// 102 verified
// 103 failed to verify
// 401 unauthorized
// 404 page not Found
// 500 server error
type Props = {
  type: 100 | 101 | 102 | 103 | 401 | 404 | 500;
};

type ComponentResultProps = {
  image: string;
  extra?: any;
};

const Result = (props: Props) => {
  const { type } = props;
  if (type === 100)
    return <ComponentResult image="assets/images/Result/loading.gif" />;
  else if (type === 101)
    return (
      <ComponentResult
        image="assets/images/Result/verifying.jpg"
        extra={<Verification t={1} />}
      />
    );
  else if (type === 102)
    return (
      <ComponentResult
        image="assets/images/Result/verified.jpg"
        extra={<Verification t={2} />}
      />
    );
  else if (type === 103)
    return (
      <ComponentResult
        image="assets/images/Result/failed-verification.jpg"
        extra={<Verification t={3} />}
      />
    );
  else if (type === 401)
    return (
      <ComponentResult
        image="assets/images/Result/401.jpg"
        extra={
          <>
            <p>It seems there was an issue verifying your account.</p>
            <Path path="/log-in" label="Go Back To LogIn" />
          </>
        }
      />
    );
  else if (type === 404)
    return (
      <ComponentResult
        image="./assets/images/Result/404.jpg"
        extra={<Path path="/" label="Go Back To Home" />}
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
        {extra && (
          <motion.div className="text-center" variants={itemVariants}>
            {extra}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

type VerificationProps = {
  t: 1 | 2 | 3;
};

const Verification = (props: VerificationProps) => {
  const { t } = props;
  const [countdown, setCountdown] = React.useState(3);
  const navigate = useNavigate();

  React.useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;

    if (t === 2) {
      interval = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
      const timeout = setTimeout(() => {
        clearInterval(interval);
        navigate("/profile");
      }, 3000);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [t, navigate]);

  if (t === 1) return <h1>Verifying...</h1>;
  if (t === 2)
    return (
      <>
        <h1>Account Verified Successfully</h1>
        {countdown > 0 && (
          <p className="text-success">Redirecting in {countdown} seconds...</p>
        )}
      </>
    );
  if (t === 3)
    return (
      <>
        <h1>Verification Failed</h1>
        <p>It seems there was an issue verifying your account.</p>
        <Path path="/log-in" label="Go Back To LogIn" />
      </>
    );
};

type PathProps = {
  path: string;
  label: string;
};

const Path = (props: PathProps) => {
  return (
    <Link to={props.path} className="btn btn-theme mt-2">
      {props.label}
    </Link>
  );
};

export default Result;
