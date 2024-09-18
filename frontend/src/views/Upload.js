import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "./Upload.css";

function Upload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      // Validate if the file is a CSV
      if (selectedFile && selectedFile.type === "text/csv") {
        setFile(selectedFile);
        setUploadComplete(false); // Reset the upload completion state
      } else {
        alert("Please upload only CSV files.");
      }
    },
    accept: ".csv", // Restrict file types to csv only
  });

  const handleUpload = async () => {
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post("http://127.0.0.1:3001/users/upload", formData)
        .then((response) => {
          setUploading(false);
          setUploadComplete(true); // Set upload complete
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
      </div>

      {/* Conditionally render file details */}
      {file && !uploadComplete && (
        <div className="file-details">
          <p>Selected file: {file.name}</p>
        </div>
      )}

      {/* Conditionally render upload button */}
      {file && !uploadComplete && (
        <div className="upload-button-container">
          <button onClick={handleUpload} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}

      {/* Show success message when upload is complete */}
      {uploadComplete && (
        <div className="success-message">
          <p>File uploaded successfully!</p>
        </div>
      )}
    </div>
  );
}

export default Upload;
