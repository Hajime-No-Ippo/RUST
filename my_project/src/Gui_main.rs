use iced::{executor, Application, Command, Element, Settings, Text, Button};

pb fn main() -> iced::Result{
    Counter::run(Settings::default())
}

struct Counter{
    value:i32;
}

enum Message{
    Increment,
    Decrement,
}

impl Application for Counter{
    type Executor
}