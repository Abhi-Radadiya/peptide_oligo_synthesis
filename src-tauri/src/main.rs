// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod serial;

use tauri::command;

#[command]
fn list_serial_ports() -> Vec<String> {
    serialport::available_ports()
        .map(|ports| ports.into_iter().map(|p| p.port_name).collect())
        .unwrap_or_else(|_| vec!["No Ports Found".to_string()])
}

#[command]
fn set_serial_port(port_name: String) {
    serial::set_port_name(port_name);
}

#[command]
fn close_serial_port() {
    serial::close_port();
}

#[command]
fn send_serial_command(command: String) -> Result<String, String> {
    serial::send_command(&command)
}

#[command]
fn read_serial_response_within(ms: u64) -> Result<Option<String>, String> {
    serial::read_within(ms)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
    list_serial_ports,
    set_serial_port,
    send_serial_command,
    close_serial_port,
    read_serial_response_within
])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
