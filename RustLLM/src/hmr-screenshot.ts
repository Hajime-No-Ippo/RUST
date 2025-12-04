import { invoke } from "@tauri-apps/api/core";

if (import.meta.hot) {
  import.meta.hot.on("trigger-screenshot", async () => {
    console.log("🔥 HMR: screenshot triggered (client-level)");
    try {
      await invoke("capture_screen");
    } catch (e) {
      console.error("Screenshot failed:", e);
    }
  });
}
