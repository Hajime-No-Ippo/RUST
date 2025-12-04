import { invoke } from "@tauri-apps/api/core";
import "./hmr-screenshot";


function App() {
  async function testScreenshot() {
    try {
      const path = await invoke<string>("capture_screen");
      console.log("Screenshot saved:", path);
      alert("Saved screenshot to: " + path);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <h1>Hi ,this is a test hi,hello? hi,hello save again, still working~~~</h1>
      <button onClick={testScreenshot}>Screenshot</button>
    </>
  );
}

export default App;
