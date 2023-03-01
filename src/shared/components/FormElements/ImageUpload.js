import React, { useEffect, useRef, useState } from "react";
import Button from "./Button.js";

import "./ImageUpload.css";

function ImageUpload(props) {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setisValid] = useState(false);

  const filePickerRef = useRef();
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  useEffect(() => {
    if (!file) {
      setPreviewUrl(undefined);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickHandler = (event) => {
    let pickedFile;
    let fileIsvalid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      fileIsvalid = true;
    } else {
      fileIsvalid = false;
    }
    setFile(pickedFile);
    setisValid(fileIsvalid);
    // console.log(pickedFile);
    props.onInput(props.id, pickedFile, fileIsvalid); // will be old valid, so need new isValid variable
    // console.log(event.target);
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          Pick Image
        </Button>
        {!isValid && <p>{props.errorText}</p>}
      </div>
    </div>
  );
}

export default ImageUpload;
