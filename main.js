const defaultAttributeScores = [15, 14, 13, 12, 10, 8];

class Player {
    constructor(characterName = 'Naruto') {
        this.name = characterName;
        this.attributes = {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        };

        let shuffledResult = shuffleArray(defaultAttributeScores);
        for (const [key, value] of Object.entries(this.attributes)) {
            let attributeValue = shuffledResult.pop();
            this.attributes[key] = attributeValue;
        }
    }

    rollAttributes() {
        for (const key in this.attributes) {
            let results = diceRoller(4, 6);
            // The built-in sort function compares elements as strings. You
            // can override the default behaviour by providing a compare
            // function as a parameter
            results.sort(function(a, b){return a - b});
            // Remove the first (lowest) element
            results.shift();
            let sum = sumArrayElements(results);
            this.attributes[key] = sum;
        }
    }

    printPlayer() {
        console.log(`NAME: ${this.name}`);
        for (const [key, value] of Object.entries(this.attributes)){
            console.log(`${key.slice(0, 3).toUpperCase()}: ${value}`);
        }
    }
}

// Fisher-Yates algorithm for randomly sorting an array
// from: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
// adapted to JS and reconfigured to return a new (non-mutated) array
function shuffleArray(targetArray) {
    // Arrays are pass by reference, Array.from creates a new array from the
    // provided parameter
    let shuffled = Array.from(targetArray);
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    return shuffled;
}

function diceRoller(times, sides) {
    let results = [];
    for (let i = 0; i < times; i++) {
        // Math.random returns double x such that 0 <= x < 1.
        results.push(Math.floor(Math.random() * sides + 1));
    }
    return results;
}

function sumArrayElements(array) {
    return array.reduce((total, currentNumber) => total + currentNumber);
}
const player1 = new Player();
player1.printPlayer();
const player2 = new Player("Son Goku");
player2.rollAttributes();
player2.printPlayer();
