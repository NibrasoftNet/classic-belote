const { dealCards } = require('../utils/cards');

// Deal cards to players
const players = dealCards();

// Display each player's cards
console.log('North (Player 1):', players.north.map(card => `${card.value}${card.suit}`).join(', '));
console.log('East (Player 2):', players.east.map(card => `${card.value}${card.suit}`).join(', '));
console.log('South (Player 3):', players.south.map(card => `${card.value}${card.suit}`).join(', '));
console.log('West (Player 4):', players.west.map(card => `${card.value}${card.suit}`).join(', '));

// Verify number of cards
console.log('\nVerification:');
console.log('North has', players.north.length, 'cards');
console.log('East has', players.east.length, 'cards');
console.log('South has', players.south.length, 'cards');
console.log('West has', players.west.length, 'cards');
