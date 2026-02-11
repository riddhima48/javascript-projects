const quotes = [
    "Believe in yourself!",
    "Consistency beats motivation.",
    "Dream big. Start small.",
    "Code. Debug. Repeat.",
    "Stay hungry, stay foolish."
];

function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById("quote").innerText = quotes[randomIndex];
}
