import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';

const FaceScanner = () => {
  const webcamRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null); // store captured image
  const [isBlurred, setIsBlurred] = useState(false); // control blur effect

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log("Captured Image:", imageSrc);
    setCapturedImage(imageSrc); // freeze camera with captured image
  }, [webcamRef]);

  const videoConstraints = {
    width: 250,
    height: 250,
    facingMode: "user"
  };

  const startScan = () => {
    if (!capturedImage) {
      // capture immediately and start scanning
      capture();
    }
    setIsBlurred(true); // apply blur
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsBlurred(false); // remove blur after scanning
      // scanning finished, keep image frozen
    }, 2000); // 2s scan duration
  };

  return (
    <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md w-72">
      <h2 className="text-lg font-semibold mb-2">Face Scanner</h2>

      <div className="relative rounded-lg overflow-hidden border border-gray-300">
        {capturedImage ? (
          <img
            src={capturedImage}
            alt="Captured"
            className={`rounded-lg w-[250px] h-[250px] object-cover ${isBlurred ? 'blur-sm' : ''}`}
          />
        ) : (
          <Webcam
            audio={false}
            height={250}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={250}
            videoConstraints={videoConstraints}
            className="rounded-lg"
          />
        )}

        {isScanning && (
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-green-500"
            animate={{
              y: [0, 250, 0] // up to down and back up repeatedly
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity
            }}
          />
        )}
      </div>

      <button
        onClick={startScan}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Capture Face
      </button>
    </div>
  );
};

export default FaceScanner;
