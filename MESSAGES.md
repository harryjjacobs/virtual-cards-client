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

### Heartbeat
Broadcast by each client every 2 seconds.
If the master becomes inactive, the server will send a
`switch_master` message in order to transfer ownership 
of the master to a different client. Any messages sent
during the 

### Game State
The current full state of the game being played.
The current game must be able to be recreated from nothing
from this message.

type: `game_state`

data:

```
master: clientIdOfMaster
players: [{
        clientId: "",
        name: "",
        score: 0,
        // Any other player specific data
    }],
hands: [{
            id: 0,
            owner: clientId
            faceDown: true,
            cards: [
                "2C",
                "9S"
            ]
        }]
decks: [{
        id: 0,
        can_pickup: true,
        can_place: false,
        faceDown: true,
        cards: [
            "JH",
            "AS",
            "3D"
        ]
    }]
cards: [
    { id: "AS" },
    { id: "1S" },
    { id: "2S" },
    ...
    ]
```

### Player Requests

#### Pick card from hand

