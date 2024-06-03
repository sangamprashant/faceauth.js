import React from "react";

type Props = {};

const Tutorial: React.FC<Props> = (props) => {
  return (
    <div className="text-danger">
      <div
        className="modal fade"
        id="popupVideo"
        tabIndex={-1}
        aria-labelledby="popupVideoLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <iframe
              className="rounded"
              style={{ width: "100%", height: "500px" }}
              src="https://www.youtube.com/embed/_lhdhL4UDIo"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
