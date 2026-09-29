const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; 
let isGameActive = true;

// Клік по клітинці
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = parseInt(cell.getAttribute('data-index'), 10);

        if (gameState[index] !== "" || !isGameActive) {
            return; 
        }

        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        checkResult();
    });
});

function checkResult() {
    let roundWon = false;

    // Перевіряємо всі 8 ліній вручну за індексами (0-8) без використання вкладених масивів
    
    // 1. Горизонталі
    if (gameState[0] !== "" && gameState[0] === gameState[1] && gameState[1] === gameState[2]) roundWon = true;
    if (gameState[3] !== "" && gameState[3] === gameState[4] && gameState[4] === gameState[5]) roundWon = true;
    if (gameState[6] !== "" && gameState[6] === gameState[7] && gameState[7] === gameState[8]) roundWon = true;
    
    // 2. Вертикалі
    if (gameState[0] !== "" && gameState[0] === gameState[3] && gameState[3] === gameState[6]) roundWon = true;
    if (gameState[1] !== "" && gameState[1] === gameState[4] && gameState[4] === gameState[7]) roundWon = true;
    if (gameState[2] !== "" && gameState[2] === gameState[5] && gameState[5] === gameState[8]) roundWon = true;
    
    // 3. Діагоналі
    if (gameState[0] !== "" && gameState[0] === gameState[4] && gameState[4] === gameState[8]) roundWon = true;
    if (gameState[2] !== "" && gameState[2] === gameState[4] && gameState[4] === gameState[6]) roundWon = true;

    // Якщо хтось виграв
    if (roundWon) {
        statusText.textContent = `Гравець ${currentPlayer} переміг!`;
        isGameActive = false;
        return;
    }

    // Перевірка на нічию
    if (!gameState.includes("")) {
        statusText.textContent = "Нічия!";
        isGameActive = false;
        return;
    }

    // Зміна гравця (чергування X та O)
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    statusText.textContent = `Зараз хід: ${currentPlayer}`;
}

// Кнопка перезапуску
restartBtn.addEventListener('click', () => {
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    statusText.textContent = `Зараз хід: X`;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('X', 'O');
    });
});
