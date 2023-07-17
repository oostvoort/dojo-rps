#[system]
mod commit {
    use debug::PrintTrait;


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
        game_id: u32,
        hashed_commit: felt252
    ) -> () {

        // Retrieve Game and Player
        let mut game = get !(ctx.world, game_id.into(), Game);
        let player_id: felt252 = ctx.origin.into();

        // Handle game state
        if game.state == STATE_IDLE {
            game.player1 = player_id;
            game.player1_hash = hashed_commit;
            game.state = STATE_COMMIT_1;

        }else if game.state == STATE_COMMIT_1 {
            // Check if the same player is not committing again
            if game.player1 == player_id {
                // TODO error
                return;
            }

            // Commitment for player 2
            game.player2 = player_id;
            game.player2_hash = hashed_commit;
            game.state = STATE_COMMIT_2;

        }else{
            // check if the round expired
            let ts = starknet::get_block_timestamp();
        }

    }
}
