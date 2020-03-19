export let createDeck = id => Object.create({
    id: id,
    canPickup: true,
    canPlace: false,
    facedown: true,
});