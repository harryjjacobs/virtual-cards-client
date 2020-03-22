# Notes to self
Every now and then the master needs to publish the full game
state to the server. The server keeps it and uses it when
the master disconnects and a new master is selected. Server
needs to keep a list of message requests sent to the master
after the last full state publish from the master so that
when the full state is sent to the new master, the things
that have happened since the latest full state update can be
restored into the full state. Need to be in special messages
(maybe call them master_restore messages or something).

The state must be a purely JSON object.

# Messages

## Base message type

```
type: MESSAGE_TYPE,
time: timeWhenSent, // This gets changed to the server time?
sender: clientIdString,
data: {
    // message specific payload
}
```

## Message Types

### State Update
Updates to the state made by players

{
    type: one of 'U' (updated), 'M' (move), 'A' (added), 'D' (deleted) bro
    time: timestamp,
    stateHash: the hash of the full state after the operation is performed,
    ... additional operation specific parameters
}

#### Additional Parameters for M
{
    src: the id of the source object to move,
    dst: the id of the destination object for this property,
    key: key in dst to move to
}

#### Additional Parameters for A
{
    value: the property or value to add,
    dst: the id of the destination object for this value,
    key: key in dst to add to
}

### State Initialiser
The current full state of the game being played.
The current game must be able to be recreated from nothing
from this message. Every object in the state must have a
unique id.

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

### Player Requests

#### Pick card from deck

