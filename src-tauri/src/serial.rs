use std::sync::{Mutex, Arc};
use std::time::Duration;
use std::io::{Write, Read};
use once_cell::sync::Lazy;
use serialport::{SerialPort, ClearBuffer};

static SERIAL_STATE: Lazy<Arc<Mutex<SerialState>>> = Lazy::new(|| {
    Arc::new(Mutex::new(SerialState::default()))
});

struct SerialState {
    port_name: Option<String>,
    port: Option<Box<dyn SerialPort>>,
}

impl Default for SerialState {
    fn default() -> Self {
        SerialState {
            port_name: None,
            port: None,
        }
    }
}

pub fn set_port_name(name: String) {
    let mut state = SERIAL_STATE.lock().unwrap();
    state.port_name = Some(name);
    state.port = None;
}

fn get_or_open_port<'a>() -> Result<std::sync::MutexGuard<'a, SerialState>, String> {
    let mut state = SERIAL_STATE.lock().unwrap();

    if state.port.is_none() {
        let port_name = state.port_name.clone().ok_or("Port name not set")?;
        // let baud = 9600;
        let baud = 115200;

        match serialport::new(&port_name, baud)
            .timeout(Duration::from_millis(200))
            .open()
        {
            Ok(mut port) => {
                let _ = port.clear(ClearBuffer::All);
                println!("Serial port {} opened and flushed.", port_name);

                // Optional: don't sleep at all
                state.port = Some(port);
            }
            Err(e) => return Err(format!("Failed to open serial port {}: {}", port_name, e)),
        }
    }

    Ok(state)
}


pub fn send_command(message: &str) -> Result<String, String> {
    let mut state = get_or_open_port()?; // Now returns locked state

    if let Some(port) = state.port.as_mut() {
        let msg = format!("{}\r\n", message);
        port.write_all(msg.as_bytes()).map_err(|e| e.to_string())?;
        println!("Sent: {}", msg);

        // Try reading with a small non-blocking loop
        let mut buf = [0u8; 128];
        let mut response = Vec::new();
        let start = std::time::Instant::now();

        while start.elapsed() < Duration::from_millis(200) {
            match port.read(&mut buf) {
                Ok(n) if n > 0 => {
                    response.extend_from_slice(&buf[..n]);
                    break;
                }
                Err(ref e) if e.kind() == std::io::ErrorKind::TimedOut => continue,
                Err(_) => break,
                _ => {}
            }
        }

        if !response.is_empty() {
            Ok(String::from_utf8_lossy(&response).to_string())
        } else {
            Ok("Message sent. No response.".into())
        }
    } else {
        Err("Serial port is not open.".into())
    }
}

pub fn close_port() {
    let mut state = SERIAL_STATE.lock().unwrap();
    if state.port.is_some() {
        println!("Closing serial port...");
    }
    state.port = None;
}

pub fn read_within(ms: u64) -> Result<Option<String>, String> {
    let mut state = get_or_open_port()?;

    if let Some(port) = state.port.as_mut() {
        let start = std::time::Instant::now();
        let mut response = Vec::new();
        let mut buf = [0u8; 128];

        while start.elapsed() < Duration::from_millis(ms) {
            match port.read(&mut buf) {
                Ok(n) if n > 0 => {
                    response.extend_from_slice(&buf[..n]);
                    let msg = String::from_utf8_lossy(&response).to_lowercase();

                    return Ok(Some(msg));

                    println!("Response: {}", msg);

                    response.clear();
                }

                Err(ref e) if e.kind() == std::io::ErrorKind::TimedOut => {
                    continue;
                }
                Err(_) => break,
                _ => {}
            }
        }

        Ok(None) // Timeout with no useful response
    } else {
        Err("Serial port is not open.".into())
    }
}
