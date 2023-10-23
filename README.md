![](https://raw.githubusercontent.com/oostvoort/dojo-rps/main/assets/img_logo.png)
# Dojo Rock Paper Scissors
An open-sourced rock paper scissors game that is built using [Dojo](https://github.com/dojoengine/dojo).
The way it works is as follows:
1. Player 1 picks between Rock, Paper, or Scissors
2. Player 2 picks between Rock, Paper, or Scissors
3. Automatically, the game reveals Player 1's choice
4. Also automatically, the game reveals Player 2's choice
5. The game then reveals the winner and logs it in the side
6. The game resets

Some things to note though, if Player 2 does not choose in 10 seconds, the game automatically resets.

## Live Website

## Local Development
https://dojorps.dev.aw.oostvoort.work/
https://katana.dojorps.dev.aw.oostvoort.work/
https://torii.dojorps.dev.aw.oostvoort.work/

## Playing online
Dojo Rock Paper Scissors can be accessed via this [website](https://dojorps.dev.aw.oostvoort.work/). To play
as Player 1, use this [link](https://dojorps.dev.aw.oostvoort.work/?account=1). Conversely, to play
as Player 2, use this [link](https://dojorps.dev.aw.oostvoort.work/?account=2)

## Local Development

### Prerequisites

#### Install [NodeJS](https://nodejs.org/en/download)
````shell
sudo apt update
sudo apt install nodejs
````

#### Install [Rust](https://www.rust-lang.org/tools/install)
````shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
````

#### Install [Dojo](https://book.dojoengine.org/getting-started/quick-start.html)
````shell
curl -L https://install.dojoengine.org | bash
dojoup
````

#### Install [Scarb](https://docs.swmansion.com/scarb/)
````shell
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh
````

### Recommended
#### Install [Cairo Language Server for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=starkware.cairo1)
````shell
sudo npm install --global @vscode/vsce
npm install
vsce package
code --install-extension cairo1*.vsix
````

#### Install [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)
````shell
npm install --global yarn
````

### Setting up

#### Setting up the client

##### Step 1: Install dependencies
Using Yarn
````shell
cd web
yarn install
````

##### Step 2: Copy the environment variables needed for local development
````shell
cp ./web/.env.example ./web/.env
````

#### Deploying in Localhost

##### Step 1: Start up Katana
This command runs up a local RPC node using the [Katana](https://book.dojoengine.org/toolchain/katana/overview.html) command.
````shell
katana
````

##### Step 2: Deploy the contracts
This command will build the contracts (compile the cairo code into sierra using [sozo](https://book.dojoengine.org/toolchain/sozo/overview.html))
````shell
cd contracts
scarb run deploy
````

##### Step 3: Start up Torii
This command will start up the world indexer, [Torii](https://book.dojoengine.org/toolchain/torii/overview.html)
````shell
cd contracts
torii --world 0x7aa3ed953a585361754b7f990a4fd37d3b2c98b630a007410ac9337dad1ac84
````

##### Step 4: Start up the web server
````shell
cd web
yarn dev
````

#### Deploying in Cloud (AWS-Fargate)

##### Step 1: Install Terraform-cli and awscli
Install AWS cli
````shell
curl "https://d1vvhvl2y92vvt.cloudfront.net/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws --version
````
Install Terraform cli
````shell
wget https://releases.hashicorp.com/terraform/1.0.8/terraform_1.0.8_linux_amd64.zip
unzip terraform_1.0.8_linux_amd64.zip
sudo mv terraform /usr/local/bin/
terraform -v
````
##### Step 2: Add you AWS credentials
Just make sure you have enough role or permission to create S3 Bucket, VPC other networking components, and lastly ECS permissions
````shell
aws configure
    AWS Access Key ID:
    AWS Secret Access Key:
````

##### Step 3: Run Terraform
We have our own centralized terraform repository, for easier deployment just use default variabiables but feel free to edit them
````shell
cd terraform
terraform init
terraform apply --auto-approve 
````

##### Step 4: Destroy the AWS services
Once you are done with the application, make sure to destroy all the AWS services
````shell
terraform destroy --auto-approve 
````








###### Note
To switch between Player 1 and 2, use the account query like so:
````console
# for player 1
http://localhost:5173/?account=1
# for player 2
http://localhost:5173/?account=2
````