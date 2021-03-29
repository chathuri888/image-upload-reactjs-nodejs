import React, { useState } from "react";
import { multipleFilesUpload } from "../data/api";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const FileUploadScreen = (props) => {
  const [title, setTitle] = useState("");
  const [multipleProgress, setMultipleProgress] = useState(0);

  const mulitpleFileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setMultipleProgress(percentage);
    },
  };

  const UploadMultipleFiles = async () => {
    const formData = new FormData();
    formData.append("title", title);

    for (let i = 0; i < props.multipleFilesset.length; i++) {
      const file = props.multipleFilesset?.[i].picture;
      formData.append("files", file);
    }
    await multipleFilesUpload(formData, mulitpleFileOptions);
    props.getMultiple();
  };
  return (
    <div className="row mt-3">
      <div className="col-12">
        <div className="row">
          <div className="col-6">
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="enter title for your gallery"
              className="form-control"
            />
          </div>
          <div className="col-3">
            <button
              type="button"
              onClick={() => UploadMultipleFiles()}
              className="btn btn-danger"
            >
              Upload
            </button>
          </div>
          <div className="col-2">
            <CircularProgressbar
              value={multipleProgress}
              text={`${multipleProgress}%`}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: "butt",
                textSize: "16px",
                pathTransitionDuration: 0.5,
                pathColor: `rgba(255, 136, 136, ${multipleProgress / 100})`,
                textColor: "#f88",
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadScreen;
