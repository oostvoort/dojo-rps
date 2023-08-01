# Dojo Simple RPS
- Entity
  - Game
  - Player1 (id is addr)
  - Player2 (id is addr)
- Component
  - Game
    - player1
    - player2
    - commit1
    - commit2
    - reveal1
    - started_timestamp
    - state
      - idle (no activity yet)
      - 1commit
      - 2commit
      - 1reveal
  - Player
- System
  - create
    - return game id
  - reset (player, game)
    - if game.state = (2commit or 1reveal)
      - if time - start_timestamp > maxtime
        - game.state = idle
        - commit1,commit2, reveal1 = empty
    - else error
  - commit (player, game, hashed_commit)
    - if game.state = idle
      - game.player1 = player
      - game.commit1 = hashed_commit
      - game.state = 1commit
    - else if game.state = 1commit
      - game.player2 = player
      - game.commit2 = hashed_commit
      - game.state = 2commit
    - else if game.started_timestamp is old
      - ?
  - reveal (player, game, commit, salt)
    - if game.state = commit2
      - verify commit+salt = game.commit[player]
      - game.reveal[player] = commit
      - game.state = reveal1
    - else if game.state = reveal1
      - verify commit+salt = game.commit[player]
      - determineWinner(reveal1, reveal2)
      - gamedecided event
    - else error


# Dojo Multiplayer RPS (RockPaperScissors)


- How it works
  - We have Tournaments, which contains a collection of Players
  - Every ~20s the Tournament runs a new round
  - Players have a balance of a token. 
  - Every player can always play: stake=1 is always possible even if balance=0
  - player sets a max stake (not more than balance)
  - every round players are matched based on size of stakes, sorting high-low stake, then order of entry. 
    - (?!) This means if the Tournament has an uneven nr of players, the last entered player has to wait 
  - Gameplay:
    - Game.state = commit
    - player submits hashed choice (1)
    - player submits hashed choice (2)
    - Game.state = reveal
    - player reveals: submits salt with choice (1)
    - player reveals: submits salt with choice (2)
    - Game.state = complete
  - first player to trigger startRound when it's time will then kickoff the processing of all Games and ready for the next
  - When processing a Game
    - if one of the players did not reveal, they lose automatically and get 1 token extra burned. They are also marked "inactive"
    - Player that completed the game (even if lost) is marked Active
    - winner receives stake of loser
  - When processing the Tournament round
    - deduct 1 token from each inactive Player
  - tokenomics
    - we mint 1 token per player per round that has 0 balance (they can play for free with minimal stake)
    - we burn 1 token per round on inactive player
    - leaderboard is based on max amount of tokens ever reached
    - this incentivises to keep playing to reach a high score
  - Problem: Sybil, "losebots" spun up by a malicious player




- Entities (??)
  - Player (id is account address)
  - Tournament (entityId )
  - Game
- Components
  - Tournament
    - players: Player[]
    - games: Game[]
    - highscores: Score[]
  - Score
    - player: Player
    - balance: u32
  - Game
    - player1: Player
    - player2: Player
    - player1Commit: string
    - player2Commit: string
    - stake: u32
  - Player
    - maxStake: u32
    - inactive: bool
- Systems
  - enter(tournament, player)
  - startRound
    - if its not time yet, don't do anything
    - burn credits for inactive players (that did not revealChoice)
    - settle all Games (deduct/add stakes)
    - update Tournament.leaderboard with player.balance
    - determine new Games
  - commitChoice(tournament, player, stake, hashedChoice)
    - Theoretically the contract knows the Game the player is in..
  - revealChoice(tournament, player, hashedChoice, salt)





# Dojo Web Starter: Official Guide

The official Dojo Starter guide, the quickest and most streamlined way to get your Dojo Autonomous World up and running. This guide will assist you with the initial setup, from cloning the repository to deploying your world.

The Dojo Starter contains the minimum required code to bootstrap your Dojo Autonomous World. This starter package is included in the `dojoup` binary. For more detailed instructions, please refer to the official Dojo Book [here](https://book.dojoengine.org/getting-started/installation.html).

## Prerequisites

-   Rust - install [here](https://www.rust-lang.org/tools/install)
-   Cairo language server - install [here](https://book.dojoengine.org/development/setup.html#3-setup-cairo-vscode-extension)

## Step-by-Step Guide

Follow the steps below to setup and run your first Autonomous World.

### Step 1: Install `dojoup`

Start by installing `dojoup`. This cli tool is a critical component when building with Dojo. It manages dependencies and helps in building your project. Run the following command in your terminal:

```shell
curl -L https://install.dojoengine.org | bash
dojoup

```

The command downloads the `dojoup` installation script and executes it.

### Step 2: Clone the Repository

The next step is to clone the repository to your local machine. Open your terminal and type the following command:

```shell
git clone https://github.com/coostendorp/dojo-web-starter && cd dojo-web-starter
```

This command will create a local copy of the Dojo Web Starter repository and enter the project directory.


### Step 3: Build the Example World

With `dojoup` installed, you can now build your example world using the following command:

```shell
make build
```

This command compiles your project and prepares it for execution.

### Step 4: Start Katana RPC

[Katana RPC](https://book.dojoengine.org/framework/katana/overview.html) is the communication layer for your Dojo World. It allows different components of your world to communicate with each other. To start Katana RPC, use the following command:

```shell
katana --allow-zero-max-fee
```

### Step 5: Migrate (Deploy) the World

Finally, deploy your world using the `sozo migrate` command. This command, deploys your world to Katana!

```shell
cd contracts
scarb run deploy
```

### Step 6: Get the React frontend ready

```shell
make prep_web
cd web
yarn
```


### Step 7: Run the frontend locally

````shell
cd web
yarn dev
````
