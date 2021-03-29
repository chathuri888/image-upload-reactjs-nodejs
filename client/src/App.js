import React, { useState, useEffect } from "react";
import "./App.css";
import FileUploadScreen from "./screens/FileUploadScreen";
import { getFileList, getMultipleFiles } from "./data/api";

function App() {
  const [fileList, setFileList] = useState();
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [multipleFilesset, setMultipleFilesset] = useState([]);
  const [idSet, setSelectedFileId] = useState([]);

  const selectedFile = (file) => {
    if (!idSet?.includes?.(file?.id)) {
      let myArr = [...multipleFilesset];
      let setId = [...idSet];

      myArr.push(file);
      setId.push(file.id);
      setMultipleFilesset(myArr);
      setSelectedFileId(setId);
    }
  };

  const getFileslist = async () => {
    try {
      const fileslist = await getFileList();
      setFileList(fileslist);
    } catch (error) {
      console.log(error);
    }
  };
  const getSelectedFilesList = async () => {
    try {
      const fileslist = await getMultipleFiles();
      setMultipleFiles(fileslist);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFileslist();
    getSelectedFilesList();
  }, []);

  return (
    <>
      <div className="container">
        <h3 className="text-danger font-weight-bolder border-bottom text-center">
          File Upload
        </h3>
        <FileUploadScreen
          multipleFilesset={multipleFilesset}
          getsingle={() => getFileslist()}
          getMultiple={() => getSelectedFilesList()}
        />
      </div>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-6">
            <h4 className="text-success font-weight-bold">Select Image</h4>
            <div className="row">
              {fileList &&
                fileList?.entries?.map((file, index) => (
                  <div className="col-6">
                    <div className="card mb-2 border-0 p-0">
                      <img
                        src={file.picture}
                        height="200"
                        className="card-img-top img-responsive"
                        alt="img"
                      />

                      <button
                        type="button"
                        className={
                          idSet?.includes?.(file?.id)
                            ? "btn primary"
                            : "btn btn-danger"
                        }
                        onClick={() => selectedFile(file)}
                      >
                        {idSet?.includes?.(file?.id)
                          ? "selected "
                          : "Add Image"}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="col-6">
            <h4 className="text-success font-weight-bold">
              Selected Image List
            </h4>
            {multipleFiles.map((element, index) => (
              <div key={element.index}>
                <h6 className="text-danger font-weight-bold">
                  {element.title}
                </h6>
                <div className="row">
                  {element.files.map((file, index) => (
                    <div key={index} className="col-6">
                      <div className="card mb-2 border-0 p-0">
                        <img
                          src={file}
                          height="200"
                          className="card-img-top img-responsive"
                          alt="img"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
