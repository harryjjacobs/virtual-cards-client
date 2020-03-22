import { createEvent } from "../../../eventsystem/event-factory";

export const updateHistory = { };

export const state = {
	room: {
		code: ""
	},
	players: [],
	hands: [],
	decks: [],
	cards: []
};

export const events = {
	onCardCreated: createEvent(),
	onCardMoved: createEvent(),
	onCardDestroyed: createEvent(),

	onDeckCreated: createEvent(),
	onDeckChanged: createEvent(),
	onDeckDestroyed: createEvent(),

	onHandCreated: createEvent(),
	onHandChanged: createEvent(),
	onHandDestroyed: createEvent(),

	onPlayerJoined: createEvent(),
	onPlayerDeparted: createEvent(),
	onPlayerIdChanged: createEvent(),
}

export const commands = { };

commands.initialise = initialState => {
	state = initialState;
};

commands.update = stateUpdate => {
	
};