#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Game {
    game_id: u32,
    state: u8,
    creator: felt252,
}
