import { Loading } from "component-craftsman";
import "component-craftsman/css";

const LoadingComponent = () => {
  return (
    <div className="d-flex justify-content-center mt-7">
      <Loading loading={9} />
    </div>
  );
};

export default LoadingComponent;
