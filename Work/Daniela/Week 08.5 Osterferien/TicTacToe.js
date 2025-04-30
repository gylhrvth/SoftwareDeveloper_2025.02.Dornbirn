document.addEventListener("DOMContentLoaded", () => {
    // global var
    let player1Score = 0;
    let player2Score = 0;
    let currentSet = 1;
    let currentRound = 1;
    let player1Emoji = "";
    let player2Emoji = "";
    let rounds = 1;
    let sets = 1;
    let currentPlayer = "";

    // Settings-display
    const roundsSelect = document.getElementById("rounds-select");
    const roundsAdjustment = document.getElementById("rounds-adjustment");
    //round
    roundsSelect.addEventListener("change", () => {
        roundsAdjustment.textContent = `rounds: ${roundsSelect.value}`;
    });
    //sets
    const setsSelect = document.getElementById("sets-select");
    const setsAdjustment = document.getElementById("sets-adjustment");

    setsSelect.addEventListener("change", () => {
        setsAdjustment.textContent = `sets: ${setsSelect.value}`;
    });

    const player1Select = document.getElementById("player1-select");
    const player1Preview = document.getElementById("player1-preview");

    player1Select.addEventListener("change", () => {
        player1Preview.textContent = `Player_1 choose: ${player1Select.value}`;
    });

    const player2Select = document.getElementById("player2-select");
    const player2Preview = document.getElementById("player2-preview");

    player2Select.addEventListener("change", () => {
        player2Preview.textContent = `Player_2 choose: ${player2Select.value}`;
    });

    const saveSettingsButton = document.querySelector(".save-settings-button");

    saveSettingsButton.addEventListener("click", () => {
        // Werte aktualisieren
        rounds = parseInt(roundsSelect.value);
        sets = parseInt(setsSelect.value);
        player1Emoji = player1Select.value;
        player2Emoji = player2Select.value;
        currentPlayer = player1Emoji;
        player1Score = 0;
        player2Score = 0;
        currentSet = 1;
        currentRound = 1;

        const main = document.querySelector("main");
        main.innerHTML = "";

        const info = document.createElement("div");
        info.innerHTML = `
            <h2>Let's Play!</h2>
            <p>${player1Emoji} vs. ${player2Emoji}</p>
            <p>Game Settings: <br> Rounds: ${rounds} | Sets: ${sets}</p>
            <p>Score: <br> ${player1Emoji} - ${player1Score} | ${player2Emoji} - ${player2Score}</p>
        `;
        main.appendChild(info);

        const turnIndicator = document.createElement("div");
        turnIndicator.id = "turn-indicator";
        turnIndicator.textContent = `Aktuell dran: ${currentPlayer}`;
        main.appendChild(turnIndicator);

        startGame();
    });

    function startGame() {
        const main = document.querySelector("main");

        const board = document.createElement("div");
        board.classList.add("game-board");
        board.style.marginBottom = "7em";
        main.appendChild(board);

        let gameOver = false;

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            cell.addEventListener("click", () => {
                if (cell.textContent !== "" || gameOver) return;

                cell.textContent = currentPlayer;

                if (checkWinner(board.children, currentPlayer)) {
                    document.getElementById("turn-indicator").textContent = `🎉 ${currentPlayer} hat gewonnen!`;
                    gameOver = true;

                    setTimeout(() => {
                        startNextRound(currentPlayer);
                    }, 2000);
                    return;
                }

                // Unentschieden prüfen
                if ([...board.children].every(cell => cell.textContent !== "")) {
                    document.getElementById("turn-indicator").textContent = `😐 Unentschieden!`;
                    gameOver = true;

                    setTimeout(() => {
                        startNextRound("draw");
                    }, 2000);
                    return;
                }

                currentPlayer = currentPlayer === player1Emoji ? player2Emoji : player1Emoji;
                document.getElementById("turn-indicator").textContent = `Aktuell dran: ${currentPlayer}`;
            });

            board.appendChild(cell);
        }
    }
    function checkWinner(cells, emoji) {
        //winn-logic
        const winCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
    
        return winCombos.some(combo =>
            combo.every(index => cells[index].textContent === emoji)
        );
    }
    //start next round 
    function startNextRound(winnerEmoji) {
        if (winnerEmoji === player1Emoji) {
            player1Score++;
        } else if (winnerEmoji === player2Emoji) {
            player2Score++;
        }

        if (currentRound < rounds) {
            currentRound++;
            // start new game
            startGame();
        } else if (currentSet < sets) {
            currentSet++;
            currentRound = 1;

            // start new game
            startGame();
        } else {
            endGame();
        }
    }

    function endGame() {
        let winner = "Unentschieden";
        if (player1Score > player2Score) winner = player1Emoji;
        else if (player2Score > player1Score) winner = player2Emoji;

        alert(`Spiel beendet! Der Gewinner ist: ${winner}`);
    }
});
