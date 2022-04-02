import { useState } from "react";
import React from "react";
import { FileUploader } from "react-drag-drop-files";

import "./FileUpload.css";
import { storefile, retrieveFile, checkStatus } from "../scripts/ipfsStorage";

const FileUpload = ({ onSuccess }) => {
  const [files, setFiles] = useState([]);
  const [cid, setCid] = useState("");

  const onInputChange = (files) => {
    setFiles(files);
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
      <FileUploader multiple={true} handleChange={onInputChange} name="file" />
      <p>
        {files.length > 0
          ? `File name: ${files[0].name}`
          : "no files uploaded yet"}
      </p>
      <br />
      <button onClick={onRetrieve}>Retrieve</button>
    </>
  );
};

export default FileUpload;
