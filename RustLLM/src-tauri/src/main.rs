#![cfg_attr(
    all(not(debug_assertions), target_os = "macos"),
    windows_subsystem = "macos"
)]

use std::process::Command;
use tauri::Manager;
use cocoa::base::id;
use objc::{msg_send, sel, sel_impl};
use home::home_dir;

#[tauri::command]
fn capture_screen(app_handle: tauri::AppHandle) -> Result<String, String> {
    println!(">>> capture_screen CALLED <<<");

    // 1. Get Tauri WebView window
    let window = app_handle
        .get_webview_window("main")
        .ok_or("No window".to_string())?;

    // 2. Get the native NSWindow pointer
    let ns_window = window
        .ns_window()
        .map_err(|e| format!("ns_window() error: {}", e))?;  // Convert tauri::Error to String

    if ns_window.is_null() {
        return Err("ns_window() returned null pointer".to_string());
    }

    let ns_window: id = ns_window as id;

    // 3. Extract CGWindowID
    let window_number: i32 = unsafe { msg_send![ns_window, windowNumber] };
    println!("DEBUG: macOS windowNumber = {}", window_number);

    // 4. Build screenshot path absolute path
    let project_dir = std::env::current_dir()
        .map_err(|e| format!("Cannot find current project directory: {}", e))?;

    let screenshot_dir = project_dir.join("screenshots");

    // Create screenshots folder if missing
    std::fs::create_dir_all(&screenshot_dir)
        .map_err(|e| format!("Failed to create screenshots directory: {}", e))?;

    let output_path = screenshot_dir.join(format!(
        "ui-screenshot-{}.png",
        chrono::Utc::now().timestamp()
    ));

let output_str = output_path.to_string_lossy().to_string();
    // 5. Build screenshot command
    let cmd = format!("screencapture -x -l {} \"{}\"", window_number, output_str);
    println!("DEBUG: {}", cmd);

    // 6. Execute command
    let status = Command::new("sh")
        .arg("-c")
        .arg(cmd)
        .status()
        .map_err(|e| format!("Command error: {}", e))?;

    if status.success() {
        println!("Screenshot saved: {}", output_str);
        Ok(output_str)
    } else {
        Err("Screenshot failed".to_string())
    }
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            capture_screen
        ])
        .run(tauri::generate_context!())
        .expect("error running tauri");
}
