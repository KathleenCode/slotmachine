//1. Deposit some money.
const prompt = require("prompt-sync")();

//Declare variables, slots in machine
const ROWS = 3;
const COLS = 3;

//how many of each symbols we have
const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

// SYMBOLS_COUNT["A"] -> gives a value of 2

//multiplier by of each symbol
const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

const deposit = () => {
  while(true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if(isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
        console.log("Invalid deposit amount, try again.")
    } else {
        return numberDepositAmount;
    }
  }
};

// let balance = deposit();
// console.log(depositAmount);


//2. Determine number of lines to bet on.
const getNumberofLines = () => {
    while(true) {
        const lines = prompt("Enter a number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);

        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again.")
        } else {
            return numberOfLines;
        }
     }
    }

// const numberOfLines = getNumberofLines();
// console.log(numberOfLines);

//3. Collect a bet amount.
const getBet = (balance, lines) => {
    while(true) {
        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet);

        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet, try again.")
        } else {
            return numberBet;
        }
     }
}

// const bet = getBet(balance, numberOfLines);
// console.log(bet);

//4. Spin yhe slot machine.
const spin = () => {
    const symbols = [];

    for ( const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        // console.log(symbol, count);
        for(let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    // console.log(symbols);
    const reels = [];
    
    for(let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

// const reels = spin();
// console.log(reels);

//transpose like matrix for the user
const tranpose = (reels) => {
    const rows = [];

    for(let i = 0; i < ROWS; i++) {
        rows.push([]);

        for( let j = 0; j < COLS; j++ ) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

// const rows = tranpose(reels);
// console.log(rows);

//print it out for the user
const printRows = (rows) => {
    for ( const row of rows ) {
        let rowString = "";

        for( const [i, symbol] of row.entries()) {
            rowString += symbol;

            if(i != row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}

// printRows(rows);

//5. Check if the user won.
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for( let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for( const symbol of symbols ) {
            if(symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if(allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
         return winnings;
    }
};

// const winnings = getWinnings( rows, bet, numberOfLines );
// console.log("You won, $", + winnings.toString());

//6. Give the user their winnings.
const game = () => {
    let balance = deposit();

    while(true) {
        //tell user what their balance is
        console.log("You have a balance of $" + balance);

        const numberOfLines = getNumberofLines();

        const bet = getBet(balance, numberOfLines);
        //bet per line
        balance -= bet * numberOfLines;

        const reels = spin();

        const rows = tranpose(reels);

        printRows(rows);

        const winnings = getWinnings( rows, bet, numberOfLines );
        //add winnings to balance
        balance += winnings;
        console.log("You won, $" + winnings.toString());

        if(balance <= 0) {
            console.log("You ran out of money");
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n) ?");

        if(playAgain != "y") break;
    }
};

game();

//7. Play again.
