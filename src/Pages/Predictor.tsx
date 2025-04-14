import axios from "axios";
import { useState } from "react";
import Whiteboard from "./WhiteBoard";

const Predictor = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [predictionResult, setPredictionResult] = useState("");

  const predictImage = async (base64Image: string) => {
    setPredictionResult("Predicting the Results....");

    try {
       // Convert base64 to Blob
    const response = await fetch(base64Image);
    const blob = await response.blob();

    // Create form data and append the blob as a file
    const formData = new FormData();
    formData.append("file", blob, "image.png"); 

      const res = await axios.post(
        "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base",
        { inputs: base64Image },
        {
          headers: {
            Authorization: "Bearer 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", //my hugging face api key
            "Content-Type": "application/json",
          },
        }
      );
      const result = res.data;
      setPredictionResult(
        result?.[0]?.generated_text || "No Prediction Result Found"
      );
    } catch (err:any) {
      console.log("Prediction Failed ::", err.message||err.res);
      setPredictionResult("Error occured during Prediction");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadPredict = () => {
    if (uploadedImage) {
      predictImage(uploadedImage);
    }
  };
  const handleDrawingPredict = (base64Image: string) => {
    predictImage(base64Image);
  };

  return (
    <>
      <div className="container my-5">
        <h2 className="text-center mb-4" style={{fontWeight:"bold",color:"darkgray"}}>Image Predictions</h2>
        {/* Upload section */}
        <div className="mb-5">
          <h5 style={{fontWeight:"bold",color:"teal"}}>Put Images Here..</h5>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            placeholder="Insert here"
          />
          {uploadedImage && (
            <div className="mt-3">
              <img
                src={uploadedImage}
                alt="Uploaded"
                style={{ maxWidth: "100%" }}
              />
              <br/>
              <button
                className="btn btn-primary mt-2"
                onClick={handleUploadPredict}
              >
                Predict Uploaded Image
              </button>
            </div>
          )}
          <div className="mb-5" style={{textAlign:"center"}}>
            <h3 className="color-gray">OR</h3>
            <h4 style={{color:"teal"}}> Draw Your Own Image</h4>
            <Whiteboard onPredictImage={handleDrawingPredict} />
          </div>
        </div>

        {/* Prediction Output */}
        {predictionResult && (
          <div className="alert alert-info text-center mt-4">
            <strong>Prediction:</strong> {predictionResult}
          </div>
        )}
      </div>
    </>
  );
};

export default Predictor;
