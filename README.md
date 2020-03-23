# virtual-cards-client
Client for a multiplayer virtual card game.

The aim for this project is to virtualise a deck of cards
amongst players. There are no set rules of play - as in
real life, the players determine the rules. Moves can
be undone via a voting system - consensus must be reached.

One of the clients will be a master. The master contains the full
state, each client contains only their private state.

# Messages

Use socket.io to perform messaging operations.

## Message Types

### State Update
type: `state_update`

data:

Updates to the state made by players

```
{
    type: one of 'U' (update), 'M' (move), 'A' (add), 'D' (delete) bro
    time: timestamp,
    stateHash: the hash of the full state after the operation is performed,
    ... additional operation specific parameters
}
```

#### Additional Parameters for M
```
{
    src: the id of the source object to move,
    dst: the id of the destination object for this property,
    key: key in dst to move to
}
```

#### Additional Parameters for A
```
{
    value: the property or value to add,
    dst: the id of the destination object for this value,
    key: key in dst to add to
}
```

### State Initialiser
Used to initialise the game. The master (player that created
the room) will send this message after all players have joined.
It is the signal to begin the game.

The state must be a purely JSON object.

type: `state_init`

data:

```
players: [{
        id: "1",
        networkId: "xx-xx-xx",
        name: "billybob",
        score: 0,
        // Any other player specific data
    },
    {
        id: "2",
        networkId: "xx-xx-xx",
        name: "ken",
        score: 0,
        // Any other player specific data
    }],
hands: [{
            id: 0,
            name: "hand 1",
            owner: "1",
            faceDown: true,
            cards: [],
            privateFields: [
                "cards",
            ]
        }
        {
            id: 0,
            name: "hand 1",
            owner: "2",
            faceDown: true,
            cards: [],
            privateFields: [
                "cards",
            ]
        }],
decks: [{
        id: "zxcvbnm",
        can_pickup: true,
        can_place: false,
        faceDown: true,
        privateFields: {
            "cards"
        },
        cards: [
            { id: "AS" },
            { id: "AS" },
            { id: "3D" }
        ]
    }]
```
