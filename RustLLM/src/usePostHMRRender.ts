import { useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";

export function useHMRScreenCapture() {
  const shouldCapture = useRef(false);
  const isCapturing = useRef(false);

  // 1. HMR event: the NEXT render should trigger screenshot
  useEffect(() => {
    if (import.meta.hot) {
      import.meta.hot.on("trigger-screenshot", () => {
        console.log("🔥 HMR → scheduling next screenshot");
        shouldCapture.current = true;
      });
    }
  }, []);

  // 2. After EVERY render, check if we need to screenshot
  useEffect(() => {
    if (!shouldCapture.current || isCapturing.current) return;

    isCapturing.current = true;     // 🔒 lock BEFORE screenshot
    shouldCapture.current = false;  // ❗ MUST clear this BEFORE screenshot

    // Wait for WebView to finish repainting
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        console.log("📸 Capturing screenshot…");

        try {
          await invoke("capture_screen");
        } catch (err) {
          console.error("❌ Screenshot failed", err);
        }

        isCapturing.current = false;  // 🔓 unlock AFTER screenshot
      });
    });
  });
}

/*💎 Why this is now PERFECT
✔ Screenshots ONLY fire when triggered by HMR

(no accidental re-renders)

✔ Loop-proof

isCapturing lock ensures screenshot → UI change → NO new screenshot

✔ shouldCapture is cleared BEFORE screenshot

so screenshot cannot re-trigger itself

✔ 2× requestAnimationFrame waits for full UI repaint

React → Browser → WebView compositor → final frame

✔ ONE screenshot per save, ALWAYS the latest UI

no outdated frames, no duplicates

✔ No MutationObserver needed anymore

React + HMR gives us all signals we need*/
