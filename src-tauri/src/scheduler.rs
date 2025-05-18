use once_cell::sync::Lazy;
// use serial::send_command;
use crate::serial::send_command;
use std::collections::HashMap;
use std::sync::atomic::{AtomicU32, Ordering};
use std::sync::Mutex;
use tauri::async_runtime::spawn;
use tokio::sync::broadcast;
use tokio::time::{sleep, Duration};

/// Control messages for pause/resume/stop.
#[derive(Clone, Debug)]
enum Control {
    Pause,
    Resume,
    Stop,
}

/// Flattened command type.
// enum Cmd {
//     Send(String),
//     Hold(u64),
//     Delay(u64), // SL/SN semantics
// }

#[derive(Clone, Debug)]
enum Cmd {
    Send(String),
    Hold(u64),
    Delay(u64), // SL/SN semantics
}

struct RunContext {
    tx: broadcast::Sender<Control>,
}

/// Global registry of all running schedules.
static GLOBAL: Lazy<Mutex<HashMap<u32, RunContext>>> = Lazy::new(|| Mutex::new(HashMap::new()));
static NEXT_ID: AtomicU32 = AtomicU32::new(1);

pub struct Scheduler;

impl Scheduler {
    pub fn global() -> &'static Self {
        static S: Scheduler = Scheduler;
        &S
    }

    /// Start a new set of threads. Returns a handle ID.
    pub fn start(
        &self,
        raw: HashMap<String, Vec<Option<String>>>,
        loop_: bool,
    ) -> Result<u32, String> {
        let id = NEXT_ID.fetch_add(1, Ordering::Relaxed);
        let (tx, _) = broadcast::channel(16);
        GLOBAL
            .lock()
            .unwrap()
            .insert(id, RunContext { tx: tx.clone() });

        // Spawn the manager task
        spawn(async move {
            let mut handles = Vec::new();
            for (thread_name, cmds) in raw.into_iter() {
                let mut rx = tx.subscribe();
                let thread_id = thread_name;
                // turn Option<String> into Vec<Cmd>
                let sequence: Vec<Cmd> = cmds
                    .into_iter()
                    .filter_map(|opt| {
                        opt.map(|s| {
                            if s.starts_with("HOLD") {
                                let ms = s
                                    .match_indices(|c: char| c.is_digit(10))
                                    .map(|(_, _)| ())
                                    .count(); // quick parse
                                let val = s
                                    .chars()
                                    .filter(|c| c.is_digit(10))
                                    .collect::<String>()
                                    .parse()
                                    .unwrap();
                                Cmd::Hold(val)
                            } else if s.contains(",SL,") || s.contains(",SN,") {
                                let val = s
                                    .rsplit(',')
                                    .next()
                                    .unwrap()
                                    .trim_end_matches(';')
                                    .parse()
                                    .unwrap();
                                Cmd::Delay(val)
                            } else {
                                Cmd::Send(s)
                            }
                        })
                    })
                    .collect();

                // Spawn per‑thread task
                let h = spawn(Self::run_thread(
                    thread_id,
                    sequence.clone(),
                    tx.clone(),
                    tx.subscribe(), // Use subscribe instead of clone
                    loop_,
                ));

                handles.push(h);
            }
            // Wait for all threads to finish
            futures::future::join_all(handles).await;
            // cleanup
            GLOBAL.lock().unwrap().remove(&id);
        });

        Ok(id)
    }

    pub fn pause(&self, id: u32) -> Result<(), String> {
        let guard = GLOBAL.lock().unwrap();
        if let Some(ctx) = guard.get(&id) {
            let _ = ctx.tx.send(Control::Pause);
            Ok(())
        } else {
            Err("No such run handle".into())
        }
    }

    pub fn resume(&self, id: u32) -> Result<(), String> {
        let guard = GLOBAL.lock().unwrap();
        if let Some(ctx) = guard.get(&id) {
            let _ = ctx.tx.send(Control::Resume);
            Ok(())
        } else {
            Err("No such run handle".into())
        }
    }

    pub fn stop(&self, id: u32) -> Result<(), String> {
        let guard = GLOBAL.lock().unwrap();
        if let Some(ctx) = guard.get(&id) {
            let _ = ctx.tx.send(Control::Stop);
            Ok(())
        } else {
            Err("No such run handle".into())
        }
    }

    async fn run_thread(
        thread_name: String,
        seq: Vec<Cmd>,
        tx: broadcast::Sender<Control>,
        mut rx: broadcast::Receiver<Control>,
        loop_: bool,
    ) {
        let mut paused = false;

        'outer: loop {
            for cmd in &seq {
                // Drain control messages
                while let Ok(ctrl) = rx.try_recv() {
                    match ctrl {
                        Control::Pause => paused = true,
                        Control::Resume => paused = false,
                        Control::Stop => break 'outer,
                    }
                }
                if paused {
                    // wait until Resume or Stop
                    loop {
                        if let Ok(ctrl) = rx.recv().await {
                            match ctrl {
                                Control::Resume => break,
                                Control::Stop => break 'outer,
                                _ => {}
                            }
                        }
                    }
                }

                // Execute
                match cmd {
                    Cmd::Send(msg) => {
                        let _ = send_command(msg);
                    }
                    Cmd::Hold(ms) => {
                        sleep(Duration::from_millis(*ms)).await;
                    }
                    Cmd::Delay(ms) => {
                        sleep(Duration::from_millis(*ms)).await;
                    }
                }
            }
            if !loop_ {
                break;
            }
        }
    }
}
