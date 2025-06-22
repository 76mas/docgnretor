import React from "react";
import { pdfToImage } from "../services/pdfService";

export default function PdfUploader({ onImageReady }) {
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const arrayBuffer = await file.arrayBuffer();
    const img = await pdfToImage(arrayBuffer);
    onImageReady(img);
  };

  return (
    <div className="upload-container">
      <input
        type="file"
        accept="application/pdf"
        className="file-input"
        onChange={handleFile}
      />
      <button className="upload-button pulse">
        <span className="upload-icon">📄</span>
        <span>اختر ملف PDF</span>
      </button>
    </div>
  );
}
