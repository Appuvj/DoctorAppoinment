import React, { useState } from 'react'
import axios from "axios"

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState("");
  
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
      setPreview(URL.createObjectURL(event.target.files[0]));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      
      if (!selectedFile) {
        alert("Please select a file first!");
        return;
      }
  
      const formData = new FormData();
      formData.append("image", selectedFile);
  
      try {
        const response = await axios.post("https://localhost:7146/api/Image/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
  
        alert("Image uploaded successfully!");
      } catch (error) {
        console.error("There was an error uploading the image!", error);
      }
    };
  
    return (
      <div>
        <h2>Upload Image</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} accept="image/*" />
          {preview && <img src={preview} alt="Preview" width="200" />}
          <button type="submit">Upload</button>
        </form>
      </div>
    );
}

export default ImageUpload