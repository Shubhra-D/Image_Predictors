import axios from "axios";
import { useState } from "react";
import Whiteboard from "./WhiteBoard";

const Predictor = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [predictionResult, setPredictionResult] = useState("");

  const HUGGING_API=import.meta.env.VITE_HUGGING_FACE_TOKEN;
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const CORS_PROXY = "https://thingproxy.freeboard.io/fetch/";

  // Upload to Cloudinary
  const uploadToCloudinary = async (base64Image: string) => {
    const formData = new FormData();
    formData.append("file", base64Image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const response = await axios.post(
      `${CORS_PROXY}https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );
    return response.data.secure_url;
  };

  // Predict using Hugging Face API
  const predictImage = async (base64Image: string) => {
    setPredictionResult("Predicting the Results...");

    try {
      const imageUrl = await uploadToCloudinary(base64Image);

      const res = await axios.post(
        "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base",
        { inputs: imageUrl },
        {
          headers: {
            Authorization: `Bearer ${HUGGING_API}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = res.data;
      setPredictionResult(
        result?.[0]?.generated_text || "No Prediction Result Found"
      );
    } catch (err: any) {
      console.log("Prediction Failed ::", err.message || err.response);
      setPredictionResult("Error occurred during Prediction");
    }
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // From Upload
  const handleUploadPredict = () => {
    if (uploadedImage) {
      predictImage(uploadedImage);
    }
  };

  // From Drawing
  const handleDrawingPredict = (base64Image: string) => {
    predictImage(base64Image);
  };

  return (
    <div className="container my-5">
      <h2
        className="text-center mb-4"
        style={{
          textDecoration: "underline",
          fontStyle: "italic",
          fontWeight: "bold",
          color: "darkgray",
        }}
      >
        🤖Image Predictions..
      </h2>

      {/* Upload Section */}
      <div className="mb-5">
        <h5 style={{ fontWeight: "bold", color: "teal" }}>📷Upload an Image</h5>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {uploadedImage && (
          <div className="mt-3">
            <img
              src={uploadedImage}
              alt="Uploaded"
              style={{ maxWidth: "100%" }}
            />
            <br />
            <button
              className="btn btn-primary mt-2"
              onClick={handleUploadPredict}
            >
              Predict Uploaded Image
            </button>
          </div>
        )}
        <div className="mb-5 text-center">
          <h6 style={{ color: "grey" }}>OR</h6>
          <h4 style={{ color: "teal",fontWeight:"bold" }}>🖼️Draw Your Own Image</h4>
          <Whiteboard onPredictImage={handleDrawingPredict} />
        </div>
      </div>

      {/* Prediction Result */}
      {predictionResult && (
        <div
          className="alert alert-info text-center mt-4"
          style={{ color: "brown" }}
        >
          <strong>🔍Prediction:</strong> {predictionResult}
        </div>
      )}
    </div>
  );
};

export default Predictor;
