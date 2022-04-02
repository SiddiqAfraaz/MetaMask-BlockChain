import { useEffect, useState } from "react";
import React from "react";
import { FileUploader } from "react-drag-drop-files";

import "./FileUpload.css";
import {
  storefile,
  retrieveFile,
  checkustatus,
  listUploads,
} from "../scripts/ipfsStorage";

const FileUpload = ({ onSuccess }) => {
  const [files, setFiles] = useState([]);
  const [cid, setCid] = useState("");
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    listUploads().then((uploads) => {
      setUploads(uploads);
    });
  }, [cid]);

  const onInputChange = (files) => {
    setFiles(files);
    storefile(files).then((cid) => {
      setCid(cid);
      console.log(cid);
    });
  };

  const onDownload = async (c) => {
    retrieveFile(c).then((file) => {
      window.open("https://dweb.link/ipfs/" + file[0].cid, "_blank");
    });
  };

  return (
    <>
      <h1>BlockChain based File Storage IPFS System</h1>
      <div className="container">
        <FileUploader
          className="fileup"
          multiple={true}
          handleChange={onInputChange}
          name="file"
        />
        <p>
          {files.length > 0
            ? `File name: ${files[0].name}`
            : "No files uploaded..."}
        </p>
      </div>
      <br />
      <h1>Uploaded Documents</h1>
      <div className="limiter">
        <div className="container-table100">
          <div className="wrap-table100">
            <div className="table100">
              <table>
                <thead>
                  <tr className="table100-head">
                    <th className="column1">File Name</th>
                    <th className="column2">File Size</th>
                    <th className="column3">CID</th>
                    <th className="column4">Pinned</th>
                    <th className="column5">Storage Provider</th>
                    <th className="column6">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {uploads.map((upload) => (
                    <tr key={upload.cid}>
                      <td className="column1">{upload.name}</td>
                      <td className="column2">
                        {upload ? upload.dagSize / 1000000 + "Mb" : ""}
                      </td>
                      <td className="column3">{upload ? upload.cid : ""}</td>
                      <td className="column4">
                        {upload ? upload.pins.length : ""}
                      </td>
                      <td className="column5">
                        {upload ? upload.deals.length : ""}
                      </td>
                      <td className="column6">
                        <button onClick={() => onDownload(upload.cid)}>
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
