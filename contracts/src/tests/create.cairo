use traits::{Into, TryInto};
use core::result::ResultTrait;
use array::{ArrayTrait, SpanTrait};
use option::OptionTrait;
use box::BoxTrait;
use clone::Clone;
use debug::PrintTrait;

use starknet::{ContractAddress, syscalls::deploy_syscall};
use starknet::class_hash::{ClassHash, Felt252TryIntoClassHash};
use dojo::database::query::{IntoPartitioned, IntoPartitionedQuery};
use dojo::interfaces::{
    IComponentLibraryDispatcher, IComponentDispatcherTrait, ISystemLibraryDispatcher,
    ISystemDispatcherTrait
};
use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

use dojo::test_utils::spawn_test_world;

use dojo_rps::components::game::{game, Game};
use dojo_rps::systems::create::create;
use dojo_rps::systems::commit::commit;
use dojo_rps::systems::reveal::reveal;
use dojo_rps::systems::reset::reset;

use dojo_rps::constants::{
    STATE_IDLE,STATE_COMMIT_1,STATE_COMMIT_2,STATE_REVEAL_1
};

fn create_game() -> (ContractAddress, u32, felt252) {
    let mut components = array::ArrayTrait::new();
    components.append(game::TEST_CLASS_HASH);
    // components.append(player::TEST_CLASS_HASH);


    let mut systems = array::ArrayTrait::new();
    systems.append(create::TEST_CLASS_HASH);
    systems.append(commit::TEST_CLASS_HASH);
    systems.append(reveal::TEST_CLASS_HASH);
    systems.append(reset::TEST_CLASS_HASH);


    let world = spawn_test_world(components, systems);

    let mut spawn_game_calldata = array::ArrayTrait::<felt252>::new();

    let mut res = world.execute('create'.into(), spawn_game_calldata.span());
    assert(res.len() > 0, 'did not spawn');

    let (game_id, player_id) = serde::Serde::<(u32, felt252)>::deserialize(ref res)
        .expect('spawn deserialization failed');


    let mut res = world.entity(
        'Game'.into(),
        game_id.into(),
        0,
        dojo::SerdeLen::<Game>::len()
    );

    assert(res.len() > 0, 'game not found');

    let game = serde::Serde::<Game>::deserialize(ref res).expect('game deserialization failed');
    assert(game.state == STATE_IDLE, 'state mismatch');

    (world.contract_address, game_id, player_id)
}


#[test]
#[available_gas(100000000)]
fn test_create() {
    let (world_address, game_id, _) = create_game();


}

