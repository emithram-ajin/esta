import React, { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import Breadcrumbs from "./Breadcrumbs";
import { jsPDF } from "jspdf";

const API_URL = import.meta.env.VITE_API;

export default function Certificates() {
  const [showPdf, setShowPdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    // 1️⃣ Load certificates instantly
    fetch(`${API_URL}/api/uploads?page=certificates&position=certificate`)
      .then(res => res.json())
      .then(data => setImages(data))
      .catch(err => console.error("Error fetching certificates:", err));

    // 2️⃣ Load PDFs in the background
    fetch(`${API_URL}/api/uploads?page=certificates&position=pdf`)
      .then(res => res.json())
      .then(async data => {
        const convertedPdfs = await Promise.all(
          data.map(async pdfItem => {
            if (pdfItem.image?.startsWith("data:image/")) {
              const pdf = new jsPDF();
              pdf.addImage(pdfItem.image, "WEBP", 10, 10, 180, 160);
              pdfItem.pdfFile = pdf.output("datauristring");
            }
            return pdfItem;
          })
        );
        setImages(prev => [...prev, ...convertedPdfs]);
      })
      .catch(err => console.error("Error fetching PDFs:", err));
  }, []);

  const handleImageClick = (pdfBase64) => {
    setPdfUrl(pdfBase64);
    setShowPdf(true);
  };

  const handleBackdropClick = () => setShowPdf(false);

  return (
    <>
      <div className="py-3 md:pl-14 pl-5">
        <Breadcrumbs />
      </div>

      <div className="flex flex-wrap gap-4 justify-center px-4 py-20">
        {images
          .filter(img => img.position === "certificate")
          .map(certificate => {
            const matchingPdf = images.find(
              pdfItem =>
                pdfItem.position === "pdf" &&
                pdfItem.title === certificate.title
            );

            return (
              <div
                key={certificate._id}
                className="bg-white rounded-lg overflow-hidden cursor-pointer w-full sm:w-[48%] lg:w-[30%] shadow-[0_0_24px_rgba(0,0,0,0.10)] transform-gpu transition duration-300 hover:scale-102 hover:z-10"
                onClick={() => {
                  if (matchingPdf?.pdfFile) {
                    handleImageClick(matchingPdf.pdfFile);
                  } else {
                    console.warn("No PDF found for:", certificate.title);
                  }
                }}
              >
                <img
                  src={certificate.image && certificate.image.startsWith("data:image/")
                    ? certificate.image
                    : "/placeholder.webp"}
                  alt={`Certificate ${certificate.title}`}
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    e.target.src = "/placeholder.webp";
                  }}
                />
              </div>
            );
          })}
      </div>

      {showPdf && (
        <div
          onClick={handleBackdropClick}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
        >
          <div
            className="relative bg-white rounded-xl overflow-hidden shadow-lg w-full max-w-6xl max-h-[90vh] p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setShowPdf(false)}
              className="absolute top-3 right-3 sm:right-3 md:right-10 z-50 rounded-full p-2 text-black hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <span className="text-2xl leading-none">&times;</span>
            </button>

            <div className="h-[80vh] overflow-y-auto">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer fileUrl={pdfUrl} />
              </Worker>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
