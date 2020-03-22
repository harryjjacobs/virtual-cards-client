# virtual-cards-client
Client for a distributed multiplayer virtual card game.

The aim for this project is to virtualise a deck of cards
amongst players. There are no set rules of play - as in
real life, the players determine the rules. Moves can
be undone via a voting system - consensus must be reached.

Consider looking at the lockstep protocol in future for other
applications of the underlying game: (https://en.wikipedia.org/wiki/Lockstep_protocol)[https://en.wikipedia.org/wiki/Lockstep_protocol]



# Messages

Use socket.io to perform messaging operations.

## Message Types

### State Update
type: `state_update`

data:

Updates to the state made by players

```
{
    type: one of 'U' (updated), 'M' (move), 'A' (added), 'D' (deleted) bro
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
Used to initialise the game. The first player in the room
to send out this message controls the initial state.

TODO: avoid discrepancy in who was the first player - take
a vote amongst clients (no user involvement) to determine
which was the first message - this system will also be used
for other parts of the game. Note - could develop this
further into turn based play rather than just the
free-for-all it is at the moment.

The state must be a purely JSON object.

type: `state_init`

data:

```
players: [{
        id: "a",
        networkId: "xx-xx-xx",
        name: "billybob",
        score: 0,
        // Any other player specific data
    }],
hands: [{
            id: 0,
            owner: "a",
            faceDown: true,
            cards: [
                { id: "2C" },
                { id: "9S" }
            ]
        }]
decks: [{
        id: "zxcvbnm",
        can_pickup: true,
        can_place: false,
        faceDown: true,
        cards: [
            { id: "AS" },
            { id: "AS" },
            { id: "3D" }
        ]
    }]
```