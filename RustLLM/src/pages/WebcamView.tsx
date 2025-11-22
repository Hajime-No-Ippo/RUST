import React, { useRef, useState } from "react";

/** Detect if running inside Tauri */
const isTauri = () => {
  return !!(window as any).__TAURI_INTERNALS__;
};

const WebcamView: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [captured, setCaptured] = useState<string | null>(null);

  /** Start Camera */
  const startCamera = async () => {
    // Fallback for Tauri WebView – open browser instead
    if (isTauri()) {
      window.open("http://localhost:1420/#/webcam", "_blank");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (e) {
      console.error("sth happened in permission", e);
      alert("Webcam initiate failed");
    }
  };

  /** Capture a photo */
  const capturePhoto = () => {
    if (!videoRef.current || !photoRef.current) return;

    const canvas = photoRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/png");
    setCaptured(dataUrl);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📷 Webcam Test</h1>

      <button onClick={startCamera}>Start Camera</button>
      <button onClick={capturePhoto} style={{ marginLeft: 10 }}>
        Capture
      </button>

      {isTauri() && (
        <p style={{ color: "red", marginTop: 10 }}>
          ⚠️ Webcam not supported in Tauri dev-mode.  
          Click "Start Camera" to open in browser.
        </p>
      )}

      <div style={{ marginTop: 20 }}>
        <video
          ref={videoRef}
          style={{
            width: "400px",
            borderRadius: 10,
            background: "#000",
          }}
        />
      </div>

      <canvas ref={photoRef} style={{ display: "none" }} />

      {captured && (
        <div style={{ marginTop: 20 }}>
          <h3>Captured Image:</h3>
          <img
            src={captured}
            style={{
              width: 400,
              borderRadius: 10,
              border: "1px solid #555",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default WebcamView;
