import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";

function UploadBase64({ defaultPicture, handleDoneUpload }) {
  const [files, setFiles] = useState(defaultPicture);

  useEffect(() => {
    // console.log(files.base64);
    console.log(files);
    handleDoneUpload(files.base64);
  }, [files]);

  const handleUploadBase64 = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Make a fileInfo Object
      let fileInfo = {
        name: file.name,
        type: file.type,
        size: Math.round(file.size / 1000) + " kB",
        base64: reader.result,
        file: file,
      };

      setFiles(fileInfo);
    };
  };

  return (
    <>
      <input
        accept="image/*"
        // className={classes.input}
        hidden
        id="upload-button"
        multiple
        type="file"
        onChange={handleUploadBase64}
      />
      <label htmlFor="upload-button">
        <Button
          variant="raised"
          component="span"
          color="primary"
          //   className={classes.button}
        >
          Change Profile Photo
        </Button>
      </label>
    </>
  );
}

export default UploadBase64;
