import { invoke } from "@tauri-apps/api/core";
import {useHMRScreenCapture} from "/Users/tobymiles/FP_OOP/RustLLM/src/usePostHMRRender.ts"
import './index.css'


function App() {
  useHMRScreenCapture();
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
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-center text-3xl font-bold mb-4">Welcome to RustLLM</h1>
      <p className="text-center mb-6">Next step we will make a data structure and correct directory for fine-tuning model</p>
      <button className="px-4 py-2 w-1/4 border border-blue-500 bg-opacity-10 rounded-full text-blue-500 font-bold hover:bg-blue-100"
      onClick={testScreenshot}>Screenshot</button>
    </div>
    </>
  );
}

export default App;
