import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "./Upload.css";

function Upload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      // Validate if the file is a CSV
      if (selectedFile && selectedFile.type === "text/csv") {
        setFile(selectedFile);
      } else {
        alert("Please upload only CSV files.");
      }
    },
    accept: ".csv", // Restrict file types in the file input dialog
  });

  const handleUpload = async () => {
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post("/api/upload", formData)
        .then((response) => {
          setUploading(false);
          console.log(response.data);
        })
        .catch((error) => {
          setUploading(false);
          console.error(error);
        });
    }
  };

  return (
    <div className="upload-container">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p>Drag and drop a CSV file here, or click to select</p>
        )}
        {file && <button onClick={handleUpload}>Upload</button>}
        {uploading && <p>Uploading...</p>}
      </div>
    </div>
  );
}

export default Upload;
