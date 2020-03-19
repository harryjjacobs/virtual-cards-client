export function MasterController() {
    // Wait for all players to join
    // Wait for user to start the game

    // Initialise state by creating cards, decks and hands

    const States = Object.freeze({
        MENU: 0,
        LOBBY: 1,
        INITIALISING: 2,
    });

    let state = States.MENU;

    // Register routes in the comms module for specific messages
    // coming int
    const messageHandlers = {
        server: {
            roomCreated: message => {
                if (state == States.MENU) {
                    // Enter lobby
                    state = States.LOBBY;
                }
            },
            playerJoinRequest: message => {
                if (state == States.LOBBY) {
                    // TODO: add player to list if they 
                    // are valid, otherwise send reject
                    // message
                }
            },
        },
        players: {
            onRequestReceived: message => {
        
            }
        }
        
    }

    const registerMessageHandlers = () => {

    }
}