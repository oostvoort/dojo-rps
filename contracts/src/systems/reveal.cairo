#[system]
mod reveal {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::{Into, TryInto};

    use dojo::world::Context;
    use dojo_rps::events::{emit, GameCreated};
    use dojo_rps::components::game::Game;
    use dojo_rps::components::player::Player;

    use poseidon::poseidon_hash_span;

    use dojo_rps::constants::{
        STATE_IDLE,STATE_COMMIT_1,STATE_COMMIT_2,STATE_REVEAL_1
    };

    use dojo_rps::utils::random;

    fn validate_commit(
        committed_hash: felt252,
        commit: u8,
        salt: felt252
    ) -> bool{

        let mut hash_span = ArrayTrait::<felt252>::new();
        hash_span.append(commit.into());
        hash_span.append(salt.into());

        let computed_hash: felt252 = poseidon_hash_span(hash_span.span());

        committed_hash == computed_hash
    }

    fn execute(
        ctx: Context,
        game_id: u32,
        hashed_commit: felt252,
        commit: u8,
        salt: felt252
    ) -> () {

        // Retrieve Game and Player
        let game = get !(ctx.world, game_id.into(), Game);
        let player_id: felt252 = ctx.origin.into();

        // Retrieve player's committed hash


        // The first player reveals
        if game.state == STATE_COMMIT_2 {
            if validate_commit(hashed_commit, commit, salt) {
                // - game.reveal[player] = commit
                // - game.state = reveal1
            }else{
                // OH NO, THE HASH IS WRONG!!!
                // This is not supposed to happen of course
            }

        // The second player reveals
        }else if game.state == STATE_REVEAL_1 {
            // - verify commit+salt = game.commit[player]
            // - determineWinner(reveal1, reveal2)
            // - gamedecided event
        }else{
            // error
        }
    }
}
