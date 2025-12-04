export default function ScreenshotPlugin() {
  return {
    name: "screenshot-on-save",
    apply: "serve",

    handleHotUpdate({ file, server }) {
      console.log("🔥 File changed:", file);

      // call Tauri command through dev websocket
      server.ws.send({
        type: "custom",
        event: "trigger-screenshot",
      });
    },
  };
}
