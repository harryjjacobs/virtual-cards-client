export const createCard = (rank, suit) => Object.create({
    id: `${rank}${suit}`,
    rank: rank,
    suit: suit,
});