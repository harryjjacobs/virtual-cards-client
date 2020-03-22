import { comms } from "../../comms/server-comms";
import { stateUpdater } from "./state-updater";

// Listens for incoming messages and updates the local game state

// Transmits requests to the server

export function ClientController() {
    // Wait for all players to join
    // Wait for user to start the game

    // Initialise state by creating cards, decks and hands

    const States = Object.freeze({
        LOBBY: 0,
        WAITING: 1,
        TURN: 2
    });

    let state = States.LOBBY;

    this.joinRoom = (roomCode, username) => comms.joinRoom(roomCode, username);

    const msgHandlers = {
        room: {
            joined: message => {
                if (state == States.LOBBY) {
                    state = States.WAITING;
                }
                this.onJoinedRoom();
            }
        },
        game: {
            onStateUpdateBroadcast: data => {
                // message should contain the full path of
                // the object/value that has moved and its
                // destination. message should also contain
                // hash of the total game state.
                // If hashes don't match call a vote to reset
                // them so that they're back in sync and ignore
                // the state delta action that they provided
                stateUpdater.handleUpdateMessage(data);
            },
            onPlayerHashDescrepancy: data => {
                // When a hash of the public state does not
                // match, this message is sent. Figure out a
                // way to kick a player that requires a 
                // consensus from *most* of the other players.
                // For example - create a hash from private
                // information that only they know?? idk
            },
            onPlayerCalledVote: data => {
                // Have a voting system. One player can call
                // a vote to undo a move. Others have to
                // confirm this by voting.
            }
        },
        player: {
            turn: {
                begin: message => this.onTurnBegin(),
                end: message => this.onTurnEnd(),
            }
        }
    }

    // Register routes in the comms module for specific messages
    // coming in
    const registerMessageHandlers = () => {
        comms.on('game.responses.player.joined', msgHandlers.room.joined);
        comms.on('game.player.turn.begin', msgHandlers.player.turn.begin);
    }
}