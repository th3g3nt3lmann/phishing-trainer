// Global game instance
let game;

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    game = new PhishingGame();
});

// Global checkAnswer function for button clicks
function checkAnswer(isPhishing) {
    game.checkAnswer(isPhishing);
} 