import React, { useEffect, useRef, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";

const BarcodeScanner = () => {
  const [result, setResult] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();
    codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
      if (result) {
        setResult(result.text);
      }
    });

    return () => {
      codeReader.reset();
    };
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Scan Barcode</h2>
      <video ref={videoRef} className="w-full h-64 border"></video>
      {result && <p className="mt-4 text-green-600">Scanned Result: {result}</p>}
    </div>
  );
};

export default BarcodeScanner;
