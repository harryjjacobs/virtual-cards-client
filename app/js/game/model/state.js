import { createEvent } from "../../eventsystem/eventFactory";

export const state = {
	master: "",
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

commands.switchMaster = newMasterId => {
	state.master = newMasterId;
}

commands.registerCards = cards => {
	state.cards = cards;
}

commands.addDeck = deck => {
	state.decks.push(deck);
}

commands.initialiseDeck = (deck, cards) => {
	state.decks.find(d => d.id == deck.id).cards = 
		cards.map(c => c.id);
}

commands.addHand = hand => {
	state.hands.push(hand);
}

commands.moveCard = (cardId, from, to) => {
	// Check if card exists in card list
	if (!state.cards.find(c => c.id == cardId)) {
		console.warn(`Unknown card id ${cardId}`);
	}
	// Find card in 'from'
	state.decks.
}

const findCardById = id => {
	state.hands.filter(obj => )
}