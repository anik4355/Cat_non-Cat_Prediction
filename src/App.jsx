import React, { useState } from "react";

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
      setPrediction("");
      setError("");
    } else {
      setSelectedImage(null);
      setImagePreviewUrl(null);
    }
  };

  const handlePredict = async () => {
    if (!selectedImage) {
      setError("Please select an image first.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // ✅ Send as FormData, not base64
      const formData = new FormData();
      formData.append("file", selectedImage);

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (err) {
      console.error("Prediction error:", err);
      setError(
        `Failed to get prediction: ${err.message}. Please ensure your backend is running and accessible.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <script src="https://cdn.tailwindcss.com"></script>

      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          🐈 Cat or Not? 🐕
        </h1>
        <p className="text-gray-600 mb-6">
          Upload an image(.png or .jpg) and I'll tell you if it's a cat!
        </p>

        <div className="mb-6">
          <label
            htmlFor="image-upload"
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out shadow-md"
          >
            Upload Image
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {imagePreviewUrl && (
          <div className="mb-6 border border-gray-300 rounded-lg p-2 max-w-xs mx-auto">
            <img
              src={imagePreviewUrl}
              alt="Image Preview"
              className="max-w-full h-auto rounded-md object-contain mx-auto"
            />
            <p className="text-sm text-gray-500 mt-2">Image Preview</p>
          </div>
        )}

        <button
          onClick={handlePredict}
          disabled={!selectedImage || isLoading}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition duration-300 ease-in-out ${
            !selectedImage || isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 shadow-lg"
          } flex items-center justify-center`}
        >
          {isLoading ? "Predicting..." : "Get Prediction"}
        </button>

        {prediction && (
          <div className="mt-6 p-4 bg-blue-100 rounded-lg border border-blue-200 text-blue-800 font-semibold text-lg">
            Prediction: <span className="text-blue-900">{prediction}</span>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-100 rounded-lg border border-red-200 text-red-800 font-medium text-sm">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
