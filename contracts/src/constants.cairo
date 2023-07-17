const STATE_IDLE: u8 = 1;
const STATE_COMMIT_1: u8 = 2;
const STATE_COMMIT_2: u8 = 3;
const STATE_REVEAL_1: u8 = 4;

const ROCK: u8 = 0;
const PAPER: u8 = 1;
const SCISSORS: u8 = 2;

// The game can be reset by anyone when the time since the first commit exceeds this value
const GAME_MAX_DURATION: u64 = 20000;