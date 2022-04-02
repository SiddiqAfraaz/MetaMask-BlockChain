import { useState } from "react";
import React from "react";

import "./FileUpload.css";
import { storefile, retrieveFile, checkStatus } from "../helpers/ipfsStorage";

const FileUploader = ({ onSuccess }) => {
  const [files, setFiles] = useState([]);
  const [cid, setCid] = useState("");

  const onInputChange = (e) => {
    setFiles(e.target.files);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i]);
    }

    console.log(files);

    storefile(files).then((cid) => {
      setCid(cid);
      console.log(cid);
      checkStatus(cid).then((status) => console.log(status));
    });
  };

  const onRetrieve = async (e) => {
    e.preventDefault();
    retrieveFile(cid);
  };

  return (
    <>
      <form method="post" action="#" id="#" onSubmit={onSubmit}>
        <div className="form-group files">
          <label>Upload Your File </label>
          <input
            type="file"
            onChange={onInputChange}
            className="form-control"
            multiple
          />
        </div>

        <button>Submit</button>
      </form>
      <br />
      <button onClick={onRetrieve}>Retrieve</button>
    </>
  );
};

export default FileUploader;
