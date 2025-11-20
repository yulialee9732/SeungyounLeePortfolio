'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeImage?: string;
  resumePdf?: string;
}

export default function ResumeModal({ isOpen, onClose, resumeImage, resumePdf }: ResumeModalProps) {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 1));
  };

  const handlePrint = () => {
    if (resumePdf) {
      const printWindow = window.open(resumePdf, '_blank');
      if (printWindow) {
        printWindow.print();
      }
    }
  };

  const handleDownload = () => {
    if (resumePdf) {
      const link = document.createElement('a');
      link.href = resumePdf;
      link.download = 'seungyounLeeResume.pdf';
      link.click();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blurred Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Top Right Controls */}
            <div
              className="absolute top-20 right-20 flex items-center gap-6 z-50 text-lg font-medium text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handlePrint}
                className="hover:text-gray-300 transition"
              >
                Print
              </button>
              <span>|</span>
              <button
                onClick={handleDownload}
                className="hover:text-gray-300 transition"
              >
                Download
              </button>
              <button
                onClick={onClose}
                className="text-2xl hover:text-gray-300 transition ml-2"
              >
                ✕
              </button>
            </div>

            {/* Right Side Zoom Controls */}
            <div
              className="absolute right-12 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-6 z-50 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Zoom In */}
              <button
                onClick={handleZoomIn}
                className="text-3xl hover:text-gray-300 transition"
                title="Zoom in"
              >
                ⊕
              </button>

              {/* Zoom Percentage */}
              <div className="text-lg font-semibold bg-white text-black px-4 py-2 rounded border border-gray-300">
                {Math.round(zoom * 100)}%
              </div>

              {/* Zoom Out */}
              <button
                onClick={handleZoomOut}
                className="text-3xl hover:text-gray-300 transition"
                title="Zoom out"
              >
                ⊖
              </button>
            </div>

            {/* Resume Container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-lg shadow-2xl overflow-auto"
              style={{
                width: `${700 * zoom}px`,
                height: `${900 * zoom}px`,
                maxWidth: '90vw',
                maxHeight: '90vh',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {resumeImage ? (
                <div className="w-full h-full flex items-start justify-center overflow-auto p-4">
                  <img
                    src={resumeImage}
                    alt="Resume"
                    className="w-full h-auto"
                    style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 text-gray-400 h-full">
                  <svg
                    className="w-16 h-16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm">Resume</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
