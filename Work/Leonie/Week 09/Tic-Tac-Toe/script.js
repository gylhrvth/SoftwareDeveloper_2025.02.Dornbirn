function startPVP() {
    const header = document.querySelector('header');
    header.style.display = 'none'; // Setze das Display auf 'none'
    const main = document.querySelector('main');
    main.style.display = 'flex';

    whoStarts();
    addCellClickListeners();
}

function whoStarts() {
    const player1 = "Player 1 ( X )";
    const player2 = "Player 2 ( O )";


    const randomNumber = Math.floor(Math.random() * 2);
    const currentPlayer = randomNumber === 0 ? player1 : player2;
    const currentPlayerElement = document.getElementById('currentPlayer');
    currentPlayerElement.textContent = `Current Player: ${currentPlayer}`;

}

function addCellClickListeners() {
    const cells = document.querySelectorAll('.cell'); // Selektiere alle Zellen mit der Klasse 'cell'
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const cellId = cell.id; // Hole die ID des gedrückten Divs
            //console.log(`Cell clicked: ${cellId}`);
            // Hier kannst du weitere Logik hinzufügen, z.B. den Spielzug verarbeiten
            // Beispiel: Ändere den Text des Divs in "X" oder "O"
            if (cell.textContent === '') {
                const currentPlayerElement = document.getElementById('currentPlayer');
                const currentPlayer = currentPlayerElement.textContent.includes('X') ? 'X' : 'O';
                cell.textContent = currentPlayer; // Setze den Text des Divs auf den aktuellen Spieler
                cell.style.pointerEvents = 'none'; // Deaktiviere das Klicken auf diese Zelle
                countMoves(); // Zähle die verbleibenden Züge
                // Überprüfe die Gewinnbedingungen
                winningCondition(currentPlayer); // Überprüfe die Gewinnbedingungen
                if (currentPlayer === 'X') {
                    const divX = document.getElementById(cellId);
                    divX.classList.add('x');

                } else {
                    const divO = document.getElementById(cellId);
                    divO.classList.add('o');
                }
                // Wechsle den aktuellen Spieler
                currentPlayerElement.textContent = `Current Player: ${currentPlayer === 'X' ? 'O' : 'X'}`;
            }
        });
    });
}

function winningCondition(currentPlayer) {
    let arr = [];
    //console.log(arr);
    const cells = document.querySelectorAll('.cell'); // Selektiere alle Zellen mit der Klasse 'cell'
    cells.forEach(cell => {
        arr.push(cell.textContent); // Füge den Text jeder Zelle zum Array hinzu
    });

    const winningCombinations = [
        [0, 1, 2], // Erste Reihe
        [3, 4, 5], // Zweite Reihe
        [6, 7, 8], // Dritte Reihe
        [0, 3, 6], // Erste Spalte
        [1, 4, 7], // Zweite Spalte
        [2, 5, 8], // Dritte Spalte
        [0, 4, 8], // Diagonale von links oben nach rechts unten
        [2, 4, 6]  // Diagonale von rechts oben nach links unten
    ];

    winningCombinations.forEach(combination => {
        if (arr[combination[0]] === currentPlayer && arr[combination[1]] === currentPlayer && arr[combination[2]] === currentPlayer) {
            // Wenn eine Gewinnkombination gefunden wurde
            const player1 = "Player 1 ( X )";
            const player2 = "Player 2 ( O )";
            const winner = currentPlayer === 'X' ? player1 : player2;

            const footer = document.querySelector('footer');
            footer.style.display = 'flex'; // Setze das Display auf 'none'
            const title = document.getElementById('title');
            title.textContent = `Herzlichen Glückwunsch!`;
            const winnerElement = document.getElementById('winner');
            winnerElement.textContent = `Gewinner: ${winner}`;
        }
    });
    // Überprüfe, ob das Spielfeld voll ist (Unentschieden)
    const isFull = arr.every(cell => cell !== '');
    if (isFull) {
        const footer = document.querySelector('footer');
        footer.style.display = 'flex'; // Setze das Display auf 'none'
        const title = document.getElementById('title');
        title.textContent = `Unentschieden!`;
        const winnerElement = document.getElementById('winner');
        winnerElement.textContent = `Es gibt keinen Gewinner!`;
    }
}

function countMoves() {
    //Überprüfe wie viele Moves
    const cells = document.querySelectorAll('.cell'); // Selektiere alle Zellen mit der Klasse 'cell'
    let count = 0;
    cells.forEach(cell => {
        if (cell.textContent !== '') {
            count++;
        }
    });
    const movesElement = document.getElementById('move');
    movesElement.textContent = `Moves: ${count} / 9`;
    //console.log(`Moves: ${count} / 9`);
}

function resetGame() {
    const cells = document.querySelectorAll('.cell'); // Selektiere alle Zellen mit der Klasse 'cell'
    cells.forEach(cell => {
        cell.textContent = ''; // Setze den Text jeder Zelle auf einen leeren String
        cell.style.pointerEvents = 'auto'; // Aktiviere das Klicken auf diese Zelle
        cell.classList.remove('x', 'o'); // Entferne die Klassen 'x' und 'o'
    });
    const footer = document.querySelector('footer');
    footer.style.display = 'none'; // Setze das Display auf 'none'
    const movesElement = document.getElementById('move');
    movesElement.textContent = `Moves: 0 / 9`;
}

function playAgain() {
    resetGame();
    whoStarts();
    addCellClickListeners();
}

function exit() {
    resetGame();
    const header = document.querySelector('header');
    header.style.display = 'flex'; // Setze das Display auf 'none'
    const main = document.querySelector('main');
    main.style.display = 'none';
    const footer = document.querySelector('footer');
    footer.style.display = 'none'; // Setze das Display auf 'none'
}