import { Link } from "react-router-dom";
import "./Result.css";

type Props = {
  type: 404 | 500;
};

type ComponentResultProps = {
  image: string;
  extra?: any;
};

const Result = (props: Props) => {
  const { type } = props;

  if (type === 404)
    return (
      <ComponentResult
        image="assets/images/404.jpg"
        extra={
          <div className="mt-3">
            <Link to="/" className="btn btn-theme">
              Go Back To Home
            </Link>
          </div>
        }
      />
    );

  return <div>An error occurred.</div>;
};

const ComponentResult = (props: ComponentResultProps) => {
  const { image, extra } = props;
  return (
    <section className="pt-5">
      <div className="container d-flex justify-content-center flex-column align-items-center">
        <img src={image} alt="" className="result-image" />
        {extra && extra}
      </div>
    </section>
  );
};

export default Result;
