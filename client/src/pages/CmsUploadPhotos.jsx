import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { Link } from "react-router-dom";
// import { Image, Transformation, CloudinaryContext } from "cloudinary-react";

export function CmsUploadPhotos() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let file of selectedFiles) {
      formData.append("imgUrl", file);
    }
    try {
      console.log("upload");
      const response = await axios.post(`/${id}/photos/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      console.log("selesai");
      console.log("Uploaded images:", response.data);
      navigate("/cms/rooms");
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div>
      <Link
        to={"/cms/rooms"}
        className="
                        border border-primary
                        py-2
                        px-6
                        mb-5
                        text-primary
                        inline-block
                        rounded
                        hover:bg-primary hover:bg-blue-300
                        "
      >
        Back
      </Link>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
