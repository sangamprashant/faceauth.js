import GoogleIcon from "@mui/icons-material/Google";
// import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";

const Social = () => {
  return (
    <div className="row">
      <div className="col-lg-6 col-md-6 col-xs-12 col-sm-6 mb-2">
        <a
          href="#"
          className="btn btn-theme btn-block d-flex align-items-center justify-content-center text-decoration-none"
        >
          <GitHubIcon />
          <span className="m-2">Continue with GitHub</span>
        </a>
      </div>
      <div className="col-lg-6 col-md-6 col-xs-12 col-sm-6 mb-2">
        <a
          href="#"
          className="btn btn-warning btn-block d-flex align-items-center justify-content-center text-decoration-none"
        >
          <GoogleIcon />
          <span className="m-2">Continue with Google</span>
        </a>
      </div>
    </div>
  );
};

export default Social;
