import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const [qrCodeUrl, setQRCodeUrl] = useState("");
  const [inputUrl, setInputUrl] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(e.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const response = await axios.post(`${apiUrl}/generate-qrcode`, {
        url: inputUrl,
      });
      setQRCodeUrl(response.data.qrCodeUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  return (
    <div className="container">
      <h1>QR Code Generator</h1>
      <div className="form-group">
        <input
          type="text"
          value={inputUrl}
          onChange={handleInputChange}
          placeholder="Enter URL"
          className="input-field"
        />
        <button onClick={handleButtonClick} className="generate-button">
          Generate QR Code
        </button>
      </div>
      {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" className="qr-code" />}
    </div>
  );
}

export default App;
