#[system]
mod reset {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::{Into, TryInto};

    use dojo::world::Context;
    use dojo_rps::events::{emit, GameCreated};
    use dojo_rps::components::game::Game;
    use dojo_rps::components::player::Player;

    use dojo_rps::constants::{
        STATE_IDLE,STATE_COMMIT_1,STATE_COMMIT_2,STATE_REVEAL_1
    };

    use dojo_rps::utils::random;

    fn execute(
        ctx: Context,
        game_id: u32
    ) -> () {

        // Retrieve Game and Player
        let mut game = get !(ctx.world, game_id.into(), Game);
        let player_id: felt252 = ctx.origin.into();

        // Handle game state
        if game.state == STATE_COMMIT_1 || game.state == STATE_REVEAL_1 {
            // - if time - start_timestamp > maxtime
            //     - game.state = idle
            //     - commit1,commit2, reveal1 = empty

        }else{
            // error
        }
    }
}
