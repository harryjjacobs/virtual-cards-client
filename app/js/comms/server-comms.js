import io from 'socket.io-client';
import { createEvent } from '../eventsystem/eventFactory';

export const comms = new ServerComms();

const ServerComms = function() {
    const url = 'http://localhost:8080';

    let socket = io();

    socket.on('connect', () => {
        onConnected.raise(socket.id);
    });

    socket.on('disconnect', () => {
        onDisconnected.raise();
    });

    this.createRoom = (callback) => {
        if (!socket.connected) {
            console.warn('Cannot create room - socket not connected');
            return;
        }
        socket.on('room.created', roomCode => {
            if (typeof callback == "function") {
                callback(roomCode);
            }
        });
        socket.emit('room.create');
    };

    this.joinRoom = (roomCode, username, callback) => {
        if (!socket.connected) {
            console.warn('Cannot join room - socket not connected');
            return;
        }
        socket.on('room.joined', username, masterId => {
            this.masterId = masterId;
            if (typeof callback == "function") {
                callback();
            }
        });
        socket.emit('room.join', roomCode);
    };

    this.on = (event, callback) => {
        socket.on(event, callback);
    };

    this.broadcast = (messageName, data, callback) => {
        socket.emit(messageName, data, callback);
    };

    this.onConnected = createEvent();
    this.onDisconnected = createEvent();

    // Try to connect when the page loads
    socket.connect(url);

    return this;
};