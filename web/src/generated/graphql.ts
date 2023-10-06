import { GraphQLClient } from 'graphql-request';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Cursor: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  felt252: { input: any; output: any; }
  u8: { input: any; output: any; }
  u32: { input: any; output: any; }
  u64: { input: any; output: any; }
};

export type Component = {
  __typename?: 'Component';
  classHash?: Maybe<Scalars['felt252']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  transactionHash?: Maybe<Scalars['felt252']['output']>;
};

export type ComponentConnection = {
  __typename?: 'ComponentConnection';
  edges?: Maybe<Array<Maybe<ComponentEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type ComponentEdge = {
  __typename?: 'ComponentEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Component>;
};

export type ComponentUnion = Game | Player;

export enum Direction {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Entity = {
  __typename?: 'Entity';
  componentNames?: Maybe<Scalars['String']['output']>;
  components?: Maybe<Array<Maybe<ComponentUnion>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type EntityConnection = {
  __typename?: 'EntityConnection';
  edges?: Maybe<Array<Maybe<EntityEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type EntityEdge = {
  __typename?: 'EntityEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Entity>;
};

export type Event = {
  __typename?: 'Event';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Scalars['String']['output']>;
  systemCall: SystemCall;
  systemCallId?: Maybe<Scalars['Int']['output']>;
};

export type EventConnection = {
  __typename?: 'EventConnection';
  edges?: Maybe<Array<Maybe<EventEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type EventEdge = {
  __typename?: 'EventEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Event>;
};

export type Game = {
  __typename?: 'Game';
  entity?: Maybe<Entity>;
  game_id?: Maybe<Scalars['u32']['output']>;
  player1?: Maybe<Scalars['felt252']['output']>;
  player1_commit?: Maybe<Scalars['u8']['output']>;
  player1_hash?: Maybe<Scalars['felt252']['output']>;
  player2?: Maybe<Scalars['felt252']['output']>;
  player2_commit?: Maybe<Scalars['u8']['output']>;
  player2_hash?: Maybe<Scalars['felt252']['output']>;
  started_timestamp?: Maybe<Scalars['u64']['output']>;
  state?: Maybe<Scalars['u8']['output']>;
  winner?: Maybe<Scalars['u8']['output']>;
};

export type GameConnection = {
  __typename?: 'GameConnection';
  edges?: Maybe<Array<Maybe<GameEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type GameEdge = {
  __typename?: 'GameEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Game>;
};

export type GameOrder = {
  direction: Direction;
  field: GameOrderOrderField;
};

export enum GameOrderOrderField {
  GameId = 'GAME_ID',
  Player1 = 'PLAYER1',
  Player1Commit = 'PLAYER1_COMMIT',
  Player1Hash = 'PLAYER1_HASH',
  Player2 = 'PLAYER2',
  Player2Commit = 'PLAYER2_COMMIT',
  Player2Hash = 'PLAYER2_HASH',
  StartedTimestamp = 'STARTED_TIMESTAMP',
  State = 'STATE',
  Winner = 'WINNER'
}

export type GameWhereInput = {
  game_id?: InputMaybe<Scalars['Int']['input']>;
  game_idGT?: InputMaybe<Scalars['Int']['input']>;
  game_idGTE?: InputMaybe<Scalars['Int']['input']>;
  game_idLT?: InputMaybe<Scalars['Int']['input']>;
  game_idLTE?: InputMaybe<Scalars['Int']['input']>;
  game_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  player1?: InputMaybe<Scalars['String']['input']>;
  player1GT?: InputMaybe<Scalars['String']['input']>;
  player1GTE?: InputMaybe<Scalars['String']['input']>;
  player1LT?: InputMaybe<Scalars['String']['input']>;
  player1LTE?: InputMaybe<Scalars['String']['input']>;
  player1NEQ?: InputMaybe<Scalars['String']['input']>;
  player1_commit?: InputMaybe<Scalars['Int']['input']>;
  player1_commitGT?: InputMaybe<Scalars['Int']['input']>;
  player1_commitGTE?: InputMaybe<Scalars['Int']['input']>;
  player1_commitLT?: InputMaybe<Scalars['Int']['input']>;
  player1_commitLTE?: InputMaybe<Scalars['Int']['input']>;
  player1_commitNEQ?: InputMaybe<Scalars['Int']['input']>;
  player1_hash?: InputMaybe<Scalars['String']['input']>;
  player1_hashGT?: InputMaybe<Scalars['String']['input']>;
  player1_hashGTE?: InputMaybe<Scalars['String']['input']>;
  player1_hashLT?: InputMaybe<Scalars['String']['input']>;
  player1_hashLTE?: InputMaybe<Scalars['String']['input']>;
  player1_hashNEQ?: InputMaybe<Scalars['String']['input']>;
  player2?: InputMaybe<Scalars['String']['input']>;
  player2GT?: InputMaybe<Scalars['String']['input']>;
  player2GTE?: InputMaybe<Scalars['String']['input']>;
  player2LT?: InputMaybe<Scalars['String']['input']>;
  player2LTE?: InputMaybe<Scalars['String']['input']>;
  player2NEQ?: InputMaybe<Scalars['String']['input']>;
  player2_commit?: InputMaybe<Scalars['Int']['input']>;
  player2_commitGT?: InputMaybe<Scalars['Int']['input']>;
  player2_commitGTE?: InputMaybe<Scalars['Int']['input']>;
  player2_commitLT?: InputMaybe<Scalars['Int']['input']>;
  player2_commitLTE?: InputMaybe<Scalars['Int']['input']>;
  player2_commitNEQ?: InputMaybe<Scalars['Int']['input']>;
  player2_hash?: InputMaybe<Scalars['String']['input']>;
  player2_hashGT?: InputMaybe<Scalars['String']['input']>;
  player2_hashGTE?: InputMaybe<Scalars['String']['input']>;
  player2_hashLT?: InputMaybe<Scalars['String']['input']>;
  player2_hashLTE?: InputMaybe<Scalars['String']['input']>;
  player2_hashNEQ?: InputMaybe<Scalars['String']['input']>;
  started_timestamp?: InputMaybe<Scalars['Int']['input']>;
  started_timestampGT?: InputMaybe<Scalars['Int']['input']>;
  started_timestampGTE?: InputMaybe<Scalars['Int']['input']>;
  started_timestampLT?: InputMaybe<Scalars['Int']['input']>;
  started_timestampLTE?: InputMaybe<Scalars['Int']['input']>;
  started_timestampNEQ?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<Scalars['Int']['input']>;
  stateGT?: InputMaybe<Scalars['Int']['input']>;
  stateGTE?: InputMaybe<Scalars['Int']['input']>;
  stateLT?: InputMaybe<Scalars['Int']['input']>;
  stateLTE?: InputMaybe<Scalars['Int']['input']>;
  stateNEQ?: InputMaybe<Scalars['Int']['input']>;
  winner?: InputMaybe<Scalars['Int']['input']>;
  winnerGT?: InputMaybe<Scalars['Int']['input']>;
  winnerGTE?: InputMaybe<Scalars['Int']['input']>;
  winnerLT?: InputMaybe<Scalars['Int']['input']>;
  winnerLTE?: InputMaybe<Scalars['Int']['input']>;
  winnerNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type Player = {
  __typename?: 'Player';
  entity?: Maybe<Entity>;
  id?: Maybe<Scalars['felt252']['output']>;
  wins?: Maybe<Scalars['u32']['output']>;
};

export type PlayerConnection = {
  __typename?: 'PlayerConnection';
  edges?: Maybe<Array<Maybe<PlayerEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type PlayerEdge = {
  __typename?: 'PlayerEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Player>;
};

export type PlayerOrder = {
  direction: Direction;
  field: PlayerOrderOrderField;
};

export enum PlayerOrderOrderField {
  Id = 'ID',
  Wins = 'WINS'
}

export type PlayerWhereInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  idGT?: InputMaybe<Scalars['String']['input']>;
  idGTE?: InputMaybe<Scalars['String']['input']>;
  idLT?: InputMaybe<Scalars['String']['input']>;
  idLTE?: InputMaybe<Scalars['String']['input']>;
  idNEQ?: InputMaybe<Scalars['String']['input']>;
  wins?: InputMaybe<Scalars['Int']['input']>;
  winsGT?: InputMaybe<Scalars['Int']['input']>;
  winsGTE?: InputMaybe<Scalars['Int']['input']>;
  winsLT?: InputMaybe<Scalars['Int']['input']>;
  winsLTE?: InputMaybe<Scalars['Int']['input']>;
  winsNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  component: Component;
  components?: Maybe<ComponentConnection>;
  entities?: Maybe<EntityConnection>;
  entity: Entity;
  event: Event;
  events?: Maybe<EventConnection>;
  gameComponents?: Maybe<GameConnection>;
  playerComponents?: Maybe<PlayerConnection>;
  system: System;
  systemCall: SystemCall;
  systemCalls?: Maybe<SystemCallConnection>;
  systems?: Maybe<SystemConnection>;
};


export type QueryComponentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEntitiesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryEntityArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEventArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGameComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<GameOrder>;
  where?: InputMaybe<GameWhereInput>;
};


export type QueryPlayerComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<PlayerOrder>;
  where?: InputMaybe<PlayerWhereInput>;
};


export type QuerySystemArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySystemCallArgs = {
  id: Scalars['Int']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  componentRegistered: Component;
  entityUpdated: Entity;
};

export type System = {
  __typename?: 'System';
  classHash?: Maybe<Scalars['felt252']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  systemCalls: Array<SystemCall>;
  transactionHash?: Maybe<Scalars['felt252']['output']>;
};

export type SystemCall = {
  __typename?: 'SystemCall';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  system: System;
  systemId?: Maybe<Scalars['ID']['output']>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};

export type SystemCallConnection = {
  __typename?: 'SystemCallConnection';
  edges?: Maybe<Array<Maybe<SystemCallEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type SystemCallEdge = {
  __typename?: 'SystemCallEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<SystemCall>;
};

export type SystemConnection = {
  __typename?: 'SystemConnection';
  edges?: Maybe<Array<Maybe<SystemEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type SystemEdge = {
  __typename?: 'SystemEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<System>;
};

export type GetEntitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEntitiesQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, id?: string | null, components?: Array<{ __typename: 'Game', game_id?: any | null, player1?: any | null, player1_commit?: any | null, player1_hash?: any | null, player2?: any | null, player2_commit?: any | null, player2_hash?: any | null, started_timestamp?: any | null, state?: any | null, winner?: any | null } | { __typename: 'Player', id?: any | null, wins?: any | null } | null> | null } | null } | null> | null } | null };


export const GetEntitiesDocument = gql`
    query getEntities {
  entities(keys: ["%"]) {
    edges {
      node {
        keys
        id
        components {
          __typename
          ... on Game {
            game_id
            player1
            player1_commit
            player1_hash
            player2
            player2_commit
            player2_hash
            started_timestamp
            state
            winner
          }
          ... on Player {
            id
            wins
          }
        }
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const GetEntitiesDocumentString = print(GetEntitiesDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    getEntities(variables?: GetEntitiesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetEntitiesQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetEntitiesQuery>(GetEntitiesDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getEntities', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;