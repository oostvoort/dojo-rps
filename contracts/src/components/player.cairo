#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Player {
    #[key]
    id: felt252,
    wins: u32
}

