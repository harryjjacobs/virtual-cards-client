import { createCard } from "../card";

export const cards = [
    ...createSuit('H'),
    ...createSuit('D'),
    ...createSuit('C'),
    ...createSuit('S')];

const createSuit = (suit) => {
    let cards = [];
    for (let i = 0; i < 13; i++) {
        cards.push(createCard(i, suit));
    }
    return cards;
}