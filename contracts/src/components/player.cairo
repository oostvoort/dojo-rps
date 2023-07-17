#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Player {
    wins: u32
}

trait PlayerTrait {

}

impl PlayerImpl of PlayerTrait {

}
