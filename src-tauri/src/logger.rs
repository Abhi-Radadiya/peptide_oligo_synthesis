use chrono::Local;
use std::fs::{create_dir_all, OpenOptions};
use std::io::Write;
use std::path::PathBuf;
use std::sync::{Arc, Mutex};

#[derive(Clone, Copy)]
pub enum LogLevel {
    INFO,
    WARN,
    ERROR,
}

impl LogLevel {
    fn as_str(&self) -> &'static str {
        match self {
            LogLevel::INFO => "INFO",
            LogLevel::WARN => "WARN",
            LogLevel::ERROR => "ERROR",
        }
    }
}

#[derive(Clone)] // Add derive(Clone) for Logger
pub struct Logger {
    log_dir: PathBuf,
    shared_writer: Arc<Mutex<()>>, // Dummy mutex to serialize writes
}

impl Logger {
    pub fn new(log_dir: &str) -> Self {
        let path = PathBuf::from(log_dir);
        if let Err(e) = create_dir_all(&path) {
            eprintln!("Failed to create log directory: {}", e);
        }

        Logger {
            log_dir: path,
            shared_writer: Arc::new(Mutex::new(())),
        }
    }

    pub fn log(&self, level: LogLevel, thread: &str, message: &str) {
        let timestamp = Local::now().format("%Y-%m-%d %H:%M:%S").to_string();
        let formatted = format!(
            "[{}] [{}] [{}] {}\n",
            timestamp,
            level.as_str(),
            thread,
            message
        );

        // Console output
        print!("{}", formatted);

        // File output
        let log_filename = Local::now().format("%Y-%m-%d.log").to_string();
        let mut log_path = self.log_dir.clone();
        log_path.push(log_filename);

        // Thread-safe writing
        let _lock = self.shared_writer.lock().unwrap();
        if let Ok(mut file) = OpenOptions::new().create(true).append(true).open(log_path) {
            let _ = file.write_all(formatted.as_bytes());
        } else {
            eprintln!("Failed to write to log file.");
        }
    }
}
