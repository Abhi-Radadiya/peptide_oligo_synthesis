// // Prevents additional console window on Windows in release, DO NOT REMOVE!!
// #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// mod scheduler;
// mod serial;
// use scheduler::*;
// use std::collections::HashMap;
// use tauri::command;

// #[command]
// fn run_serial_scripts(
//     commands: HashMap<String, Vec<Option<String>>>,
//     loop_: bool,
// ) -> Result<u32, String> {
//     Scheduler::global().start(commands, loop_)
// }

// #[command]
// fn pause_serial(handle: u32) -> Result<(), String> {
//     Scheduler::global().pause(handle)
// }

// #[command]
// fn resume_serial(handle: u32) -> Result<(), String> {
//     Scheduler::global().resume(handle)
// }

// #[command]
// fn stop_serial(handle: u32) -> Result<(), String> {
//     Scheduler::global().stop(handle)
// }

// #[command]
// fn list_serial_ports() -> Vec<String> {
//     serialport::available_ports()
//         .map(|ports| ports.into_iter().map(|p| p.port_name).collect())
//         .unwrap_or_else(|_| vec!["No Ports Found".to_string()])
// }

// #[command]
// fn set_serial_port(port_name: String) {
//     serial::set_port_name(port_name);
// }

// #[command]
// fn close_serial_port() {
//     serial::close_port();
// }

// #[command]
// fn send_serial_command(command: String) -> Result<String, String> {
//     serial::send_command(&command)
// }

// #[command]
// fn read_serial_response_within(ms: u64) -> Result<Option<String>, String> {
//     serial::read_within(ms)
// }

// fn main() {
//     tauri::Builder::default()
//         .invoke_handler(tauri::generate_handler![
//             list_serial_ports,
//             set_serial_port,
//             send_serial_command,
//             close_serial_port,
//             read_serial_response_within,
//             run_serial_scripts,
//             pause_serial,
//             resume_serial,
//             stop_serial
//         ])
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }

// src-tauri/src/main.rs
// #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
// use serde::{Deserialize, Serialize};
// use serialport::{SerialPort, SerialPortBuilder};
// use std::collections::HashMap;
// use std::sync::{Arc, Mutex}; // For shared serial port access
// use std::time::{Duration, Instant}; // For timing commands
// use tokio::time::sleep; // Explicitly import tokio::time::sleep

// // Define the structure for your commands
// #[derive(Debug, Deserialize, Serialize)]
// pub struct CommandsInput {
//     // Using HashMap to allow for dynamic thread names (thread1, thread2, etc.)
//     // Each thread contains a vector of optional strings (for commands or null)
//     #[serde(flatten)]
//     pub threads: HashMap<String, Vec<Option<String>>>,
//     pub port_name: String, // Add port_name to the input
//     pub baud_rate: u32,    // Add baud_rate to the input
// }

// // Tauri command to handle incoming commands from React
// #[tauri::command]
// async fn execute_serial_commands(input: CommandsInput) -> Result<String, String> {
//     println!("Received commands: {:?}", input);

//     // --- Open the serial port ONCE and share it securely ---
//     let port_builder: SerialPortBuilder =
//         serialport::new(&input.port_name, input.baud_rate).timeout(Duration::from_millis(10)); // Small timeout for non-blocking reads/writes

//     let port: Box<dyn SerialPort> = match port_builder.open() {
//         Ok(p) => {
//             println!("Successfully opened serial port: {}", input.port_name);
//             p
//         }
//         Err(e) => {
//             let error_msg = format!("Failed to open serial port {}: {:?}", input.port_name, e);
//             eprintln!("{}", error_msg);
//             return Err(error_msg);
//         }
//     };

//     // Wrap the serial port in an Arc and Mutex to safely share it across multiple async tasks
//     let shared_port = Arc::new(Mutex::new(port));

//     let mut join_handles = Vec::new();

//     // Iterate over each thread (e.g., "thread1", "thread2")
//     for (thread_name, command_list) in input.threads {
//         let command_list = command_list.clone(); // Clone to move into the async block
//         let thread_shared_port = Arc::clone(&shared_port); // Clone the Arc for each new task

//         // Spawn a new asynchronous task for each thread
//         let handle = tokio::spawn(async move {
//             println!("Starting thread: {}", thread_name);

//             for (index, command_option) in command_list.into_iter().enumerate() {
//                 if let Some(command) = command_option {
//                     let start_time = Instant::now(); // Start timer for this command
//                     println!(
//                         "[{}] Thread '{}' executing command: {}",
//                         index, thread_name, command
//                     );

//                     if command.starts_with("HOLD ") {
//                         let parts: Vec<&str> = command.split_whitespace().collect();
//                         // Check if the command is exactly "HOLD <number>;"
//                         if parts.len() == 2 && parts[1].ends_with(";") {
//                             let hold_time_str = parts[1].trim_end_matches(';');
//                             if let Ok(hold_time_ms) = hold_time_str.parse::<u64>() {
//                                 println!(
//                                     "[{}] Thread '{}' holding for {} ms...",
//                                     index, thread_name, hold_time_ms
//                                 );
//                                 // This sleep is non-blocking for other tokio tasks
//                                 sleep(Duration::from_millis(hold_time_ms)).await;
//                                 println!("[{}] Thread '{}' resumed.", index, thread_name);
//                             } else {
//                                 eprintln!(
//                                     "[{}] Thread '{}': Invalid HOLD time format in command: {}",
//                                     index, thread_name, command
//                                 );
//                                 // Acquire the lock only when needed and immediately release it
//                                 {
//                                     let mut serial_port = thread_shared_port.lock().unwrap();
//                                     // If HOLD fails to parse, we still want to send the command string
//                                     let command_bytes = format!("{}\r\n", command).into_bytes();
//                                     if let Err(e) = serial_port.write_all(&command_bytes) {
//                                         eprintln!("[{}] Thread '{}': Failed to write to serial port after HOLD parse error: {}", index, thread_name, e);
//                                         return Err(format!(
//                                             "Failed to write command '{}' for thread {}: {}",
//                                             command, thread_name, e
//                                         ));
//                                     }
//                                 } // MutexGuard is dropped here when the block ends
//                             }
//                         } else {
//                             eprintln!("[{}] Thread '{}': Invalid HOLD command format (missing semicolon or extra parts): {}", index, thread_name, command);
//                             // Acquire the lock only when needed and immediately release it
//                             {
//                                 let mut serial_port = thread_shared_port.lock().unwrap();
//                                 // Send the command as is if format is wrong
//                                 let command_bytes = format!("{}\r\n", command).into_bytes();
//                                 if let Err(e) = serial_port.write_all(&command_bytes) {
//                                     eprintln!("[{}] Thread '{}': Failed to write to serial port after HOLD format error: {}", index, thread_name, e);
//                                     return Err(format!(
//                                         "Failed to write command '{}' for thread {}: {}",
//                                         command, thread_name, e
//                                     ));
//                                 }
//                             } // MutexGuard is dropped here when the block ends
//                         }
//                     } else {
//                         // Regular command: Write to the serial port
//                         // Acquire the lock only when needed and immediately release it
//                         {
//                             let mut serial_port = thread_shared_port.lock().unwrap();
//                             let command_bytes = format!("{}\r\n", command).into_bytes(); // Example: appending CR+LF
//                             if let Err(e) = serial_port.write_all(&command_bytes) {
//                                 eprintln!(
//                                     "[{}] Thread '{}': Failed to write to serial port: {}",
//                                     index, thread_name, e
//                                 );
//                                 return Err(format!(
//                                     "Failed to write command '{}' for thread {}: {}",
//                                     command, thread_name, e
//                                 ));
//                             }
//                             // You might want to read response here if applicable
//                             // let mut buffer: Vec<u8> = vec![0; 128];
//                             // match serial_port.read(&mut buffer) {
//                             //     Ok(bytes_read) => println!("Read {} bytes: {:?}", bytes_read, &buffer[..bytes_read]),
//                             //     Err(e) => eprintln!("Error reading from serial port: {}", e),
//                             // }
//                         } // MutexGuard is dropped here when the block ends
//                     }

//                     // Record completion time for the command
//                     let duration = start_time.elapsed();
//                     println!(
//                         "[{}] Thread '{}' command '{}' completed in {:?}",
//                         index, thread_name, command, duration
//                     );

//                     // A small delay between commands might be necessary for some devices, adjust as needed
//                     // sleep(Duration::from_millis(50)).await;
//                 } else {
//                     println!(
//                         "[{}] Thread '{}' skipping null command.",
//                         index, thread_name
//                     );
//                 }
//             }
//             Ok(format!("Thread '{}' finished execution.", thread_name))
//         });
//         join_handles.push(handle);
//     }

//     // Wait for all threads to complete (for logging/debugging on backend)
//     let mut thread_results = Vec::new();
//     for handle in join_handles {
//         match handle.await {
//             Ok(thread_res) => thread_results.push(thread_res),
//             Err(e) => eprintln!("Task for a thread panicked or failed to join: {:?}", e),
//         }
//     }

//     println!(
//         "All command threads initiated. Results: {:?}",
//         thread_results
//     );
//     Ok("All command threads started and processing. Check console for details.".into())
// }

// fn main() {
//     tauri::Builder::default()
//         .invoke_handler(tauri::generate_handler![execute_serial_commands])
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }

// src-tauri/src/main.rs

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use serialport::{SerialPort, SerialPortBuilder};
use std::collections::HashMap;
use std::sync::{Arc, Mutex}; // For shared serial port access
use std::time::{Duration, Instant}; // For timing commands
use tauri::{Emitter, Manager, Window};
use tokio::time::sleep; // Explicitly import tokio::time::sleep // bring in Manager so we can emit

// Define the structure for your commands
#[derive(Debug, Deserialize, Serialize)]
pub struct CommandsInput {
    // Using HashMap to allow for dynamic thread names (thread1, thread2, etc.)
    // Each thread contains a vector of optional strings (for commands or null)
    #[serde(flatten)]
    pub threads: HashMap<String, Vec<Option<String>>>,
    pub port_name: String, // Add port_name to the input
    pub baud_rate: u32,    // Add baud_rate to the input
}

// Tauri command to handle incoming commands from React
#[tauri::command]
async fn execute_serial_commands(window: Window, input: CommandsInput) -> Result<String, String> {
    println!("Received commands: {:?}", input);

    window
        .emit("commands-received", &input)
        .map_err(|e| format!("failed to emit event: {}", e))?;

    // --- Open the serial port ONCE and share it securely ---
    let port_builder: SerialPortBuilder =
        serialport::new(&input.port_name, input.baud_rate).timeout(Duration::from_millis(10)); // Small timeout for non-blocking reads/writes

    let port: Box<dyn SerialPort> = match port_builder.open() {
        Ok(p) => {
            println!("Successfully opened serial port: {}", input.port_name);
            p
        }
        Err(e) => {
            let error_msg = format!("Failed to open serial port {}: {:?}", input.port_name, e);
            eprintln!("{}", error_msg);
            return Err(error_msg);
        }
    };

    // Wrap the serial port in an Arc and Mutex to safely share it across multiple async tasks
    let shared_port = Arc::new(Mutex::new(port));

    let mut join_handles = Vec::new();

    // Iterate over each thread (e.g., "thread1", "thread2")
    for (thread_name, command_list) in input.threads {
        let command_list = command_list.clone(); // Clone to move into the async block
        let thread_shared_port = Arc::clone(&shared_port); // Clone the Arc for each new task

        // Spawn a new asynchronous task for each thread
        let handle = tokio::spawn(async move {
            println!("Starting thread: {}", thread_name);

            for (index, command_option) in command_list.into_iter().enumerate() {
                if let Some(command) = command_option {
                    let start_time = Instant::now(); // Start timer for this command
                    println!(
                        "[{}] Thread '{}' executing command: {}",
                        index, thread_name, command
                    );

                    let mut should_hold = false;
                    let mut hold_time_ms: u64 = 0;

                    if command.starts_with("HOLD ") {
                        let parts: Vec<&str> = command.split_whitespace().collect();
                        if parts.len() == 2 && parts[1].ends_with(";") {
                            let hold_time_str = parts[1].trim_end_matches(';');
                            if let Ok(time) = hold_time_str.parse::<u64>() {
                                should_hold = true;
                                hold_time_ms = time;
                            } else {
                                eprintln!(
                                    "[{}] Thread '{}': Invalid HOLD time format in command: {}",
                                    index, thread_name, command
                                );
                            }
                        } else {
                            eprintln!("[{}] Thread '{}': Invalid HOLD command format (missing semicolon or extra parts): {}", index, thread_name, command);
                        }
                    } else if command.contains(",SL,") || command.contains(",SN,") {
                        // For Z,1,SL,4,200,10000; or Z,2,SN,6,200,5000;
                        let parts: Vec<&str> = command.trim_end_matches(';').split(',').collect();
                        if let Some(last_part) = parts.last() {
                            if let Ok(time) = last_part.parse::<u64>() {
                                should_hold = true;
                                hold_time_ms = time;
                            } else {
                                eprintln!("[{}] Thread '{}': Could not parse last part as time for SL/SN command: {}", index, thread_name, command);
                            }
                        } else {
                            eprintln!("[{}] Thread '{}': Malformed SL/SN command (no parts after splitting by comma): {}", index, thread_name, command);
                        }
                    }

                    {
                        let mut serial_port = thread_shared_port.lock().unwrap(); // Acquire lock

                        let command_bytes = format!("{}\r\n", command).into_bytes(); // Example: appending CR+LF
                        match serial_port.write_all(&command_bytes) {
                            Ok(_) => {}
                            Err(e) => {
                                eprintln!(
                                    "[{}] Thread '{}': Failed to write to serial port: {}",
                                    index, thread_name, e
                                );
                                return Err(format!(
                                    "Failed to write command '{}' for thread {}: {}",
                                    command, thread_name, e
                                ));
                            }
                        }
                    } // Lock is released here

                    if should_hold {
                        println!(
                            "[{}] Thread '{}' holding for {} ms...",
                            index, thread_name, hold_time_ms
                        );
                        // This sleep is non-blocking for other tokio tasks
                        sleep(Duration::from_millis(hold_time_ms)).await;
                        println!("[{}] Thread '{}' resumed.", index, thread_name);
                    }

                    // Record completion time for the command
                    let duration = start_time.elapsed();
                    println!(
                        "[{}] Thread '{}' command '{}' completed in {:?}",
                        index, thread_name, command, duration
                    );
                } else {
                    println!(
                        "[{}] Thread '{}' skipping null command.",
                        index, thread_name
                    );
                }
            }
            Ok(format!("Thread '{}' finished execution.", thread_name))
        });
        join_handles.push(handle);
    }

    // Wait for all threads to complete (for logging/debugging on backend)
    let mut thread_results = Vec::new();
    for handle in join_handles {
        match handle.await {
            Ok(thread_res) => thread_results.push(thread_res),
            Err(e) => eprintln!("Task for a thread panicked or failed to join: {:?}", e),
        }
    }

    println!(
        "All command threads initiated. Results: {:?}",
        thread_results
    );
    Ok("All command threads started and processing. Check console for details.".into())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![execute_serial_commands])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
