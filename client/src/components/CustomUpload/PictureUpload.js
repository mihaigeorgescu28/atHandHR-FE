import React, { useState } from "react";
import defaultImage from "assets/img/default-avatar.png";
import SweetAlert from 'react-bootstrap-sweetalert';

const apiUrl = process.env.REACT_APP_APIURL;

function PictureUpload(props) {
  const [fileState, setFileState] = useState(null);
  const [showErrorAlert, setShowErrorAlert] = React.useState(false);

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    // Check if the selected file is an image
    if (file && file.type.startsWith("image/")) {
      reader.onloadend = () => {
        setFileState(file);
      };
      reader.readAsDataURL(file);

      // Call the parent component's onImageChange
      if (props.onImageChange) {
        props.onImageChange(file);
      }

      // Close the error alert if it was previously shown
      setShowErrorAlert(false);
    } else {
      // Show the error alert
      setShowErrorAlert(true);
    }
  };

  // Construct the complete URL using the base URL of your server
  const imageUrl = fileState
    ? URL.createObjectURL(fileState)
    : props.profilePic
    ? `${apiUrl}/user_uploads/profile_pic/${props.profilePic}`
    : defaultImage;

  return (
    <div className="picture-container">
      <div className="picture">
        <img src={imageUrl} className="picture-src" alt="..." />
        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e)} />
      </div>
      <h6 className="description">Choose Picture</h6>

      {/* Error alert */}
      {showErrorAlert && (
        <SweetAlert
          danger
          title="Error!"
          onConfirm={() => setShowErrorAlert(false)}
        >
          Please select a valid image file.
        </SweetAlert>
      )}
    </div>
  );
}

export default PictureUpload;
